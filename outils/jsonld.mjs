/*
  Contrôle des données structurées de toutes les pages construites.

  Il vérifie ce que le validateur schema.org vérifie de manière automatique,
  que le JSON est valide, que chaque objet a un type connu, que les types
  attendus sont présents sur les bonnes pages, que les références internes
  pointent vers un identifiant réellement défini, et qu'aucune date n'est mal
  formée. Il ne remplace pas le passage au validateur en ligne, il évite d'y
  aller pour rien.
*/
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const erreurs = [];
const compte = {};

function pages(dir = DIST, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) pages(p, out);
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}

const TYPES_CONNUS = new Set([
  'Organization', 'WebSite', 'BreadcrumbList', 'ListItem', 'CollectionPage',
  'ItemList', 'Article', 'FAQPage', 'Question', 'Answer', 'Event', 'Place',
  'PostalAddress', 'Person', 'AboutPage', 'ContactPage', 'HowTo', 'HowToStep',
  'VideoObject',
]);

/* Ce qu'on attend, par forme d'adresse. */
const ATTENDU = [
  [/^\/$/, ['Organization', 'WebSite']],
  [/^\/faits-et-chiffres\/$/, ['FAQPage']],
  [/^\/projets\/[^/]+\/$/, ['Article', 'BreadcrumbList']],
  [/^\/evenements\/[^/]+\/$/, ['Article', 'BreadcrumbList']],
  [/^\/publications\/[^/]+\/$/, ['BreadcrumbList']],
  [/^\/la-fondation\/$/, ['AboutPage', 'Person', 'BreadcrumbList']],
  [/^\/contact\/$/, ['ContactPage', 'BreadcrumbList']],
  [/^\/associations\/$/, ['HowTo', 'BreadcrumbList']],
];

const DATE = /^\d{4}-\d{2}-\d{2}(T.*)?$/;
const CHAMPS_DATE = ['datePublished', 'dateModified', 'startDate', 'endDate', 'foundingDate'];

function parcourir(n, visite) {
  if (Array.isArray(n)) return n.forEach((x) => parcourir(x, visite));
  if (n && typeof n === 'object') {
    visite(n);
    for (const v of Object.values(n)) parcourir(v, visite);
  }
}

const liste = pages();
for (const f of liste) {
  const nom = '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  const html = readFileSync(f, 'utf8');
  const blocs = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || [];

  if (blocs.length === 0) { erreurs.push(`${nom} n'a aucune donnée structurée.`); continue; }

  const types = new Set();
  const definis = new Set();
  const references = [];

  for (const bloc of blocs) {
    const brut = bloc.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
    let data;
    try { data = JSON.parse(brut); }
    catch (e) { erreurs.push(`${nom}, JSON-LD illisible, ${e.message}`); continue; }

    if (data['@context'] !== 'https://schema.org') {
      erreurs.push(`${nom}, le contexte n'est pas https://schema.org.`);
    }

    parcourir(data, (n) => {
      if (n['@type']) {
        const t = Array.isArray(n['@type']) ? n['@type'] : [n['@type']];
        for (const x of t) {
          types.add(x);
          compte[x] = (compte[x] ?? 0) + 1;
          if (!TYPES_CONNUS.has(x)) erreurs.push(`${nom}, type inattendu « ${x} ».`);
        }
        if (n['@id']) definis.add(n['@id']);
      } else if (n['@id'] && Object.keys(n).length === 1) {
        references.push(n['@id']);
      }
      for (const c of CHAMPS_DATE) {
        if (n[c] && !DATE.test(n[c])) erreurs.push(`${nom}, ${c} mal formée, « ${n[c]} ».`);
      }
    });
  }

  /* Une référence par @id doit pointer vers un objet défini sur la page. */
  for (const r of references) {
    if (!definis.has(r)) erreurs.push(`${nom} référence « ${r} », qui n'est défini sur aucune de ses fiches.`);
  }

  for (const [motif, requis] of ATTENDU) {
    if (!motif.test(nom)) continue;
    for (const t of requis) {
      if (!types.has(t)) erreurs.push(`${nom} devrait porter un balisage ${t}, il n'en a pas.`);
    }
  }
}

console.log(`Pages contrôlées, ${liste.length}.\n`);
console.log('Types posés sur l\'ensemble du site.');
for (const [t, n] of Object.entries(compte).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${String(n).padStart(4)}  ${t}`);
}
if (erreurs.length) {
  console.error('\nErreurs.');
  for (const e of erreurs) console.error('  ×', e);
  process.exit(1);
}
console.log('\nAucune erreur dans les données structurées.');
