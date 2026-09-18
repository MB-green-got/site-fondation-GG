/*
  Contrôle du site construit. Il lit le contenu de dist et refuse de rendre
  la main si une règle du chantier est enfreinte.

  Il vérifie six choses.
  1. Chaque page sert bien du contenu éditorial sans JavaScript.
  2. Le nom et le statut de la Fondation sont écrits partout de la même façon.
  3. Aucune occurrence du mot banque n'associe Green-Got à une banque.
  4. Aucun mot proscrit n'apparaît.
  5. Aucun appel à ouvrir un compte Green-Got.
  6. Chaque page a un titre et une description uniques, un seul H1, et un JSON-LD valide.

  Usage, node outils/controle.mjs
*/
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const erreurs = [];
const alertes = [];

function pages(dir = DIST, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) pages(p, out);
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}

function texte(html) {
  const body = html.slice(html.indexOf('<body'));
  return body
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/*
  Le mot banque associé à Green-Got.

  On découpe le texte en phrases et on ne retient que celles qui parlent à la
  fois de Green-Got et d'une banque. Une phrase qui nie l'association, du type
  « Green-Got n'est pas une banque », est correcte et ne doit pas être signalée,
  sinon la page qui pose la question explicitement serait refusée.
*/
const BANQUE_TOUJOURS_INTERDITE = [
  /votre banque/i,
  /\bla banque\b[^.]{0,40}\bvotre carte\b/i,
  /banque\s+Green[-‑]Got/i,
];

const NEGATION = /\b(n'est (pas|ni)|ne sont pas|pas une banque|ni une banque|non\b|jamais)/i;

function phrasesDouteuses(txt) {
  const trouvees = [];
  for (const phrase of txt.split(/(?<=[.!?])\s+/)) {
    if (!/Green[-‑]Got/i.test(phrase)) continue;
    if (!/\bbanques?\b|\bbancaires?\b/i.test(phrase)) continue;
    /* Une question n'affirme rien, « La Fondation Green-Got est-elle une banque ? » est légitime. */
    if (phrase.trim().endsWith('?')) continue;
    /* Le système bancaire et les banques tierces sont le positionnement de la maison. */
    if (/système bancaire|les banques|des banques|crédit bancaire|secteur bancaire|financements bancaires/i.test(phrase)) continue;
    if (NEGATION.test(phrase)) continue;
    trouvees.push(phrase.trim());
  }
  return trouvees;
}

const MOTS_PROSCRITS = [
  /éco[-\s]?responsable/i,
  /petit geste/i,
  /empreinte carbone/i,
  /geste pour la planète/i,
];

const COMPTE = [/ouvrir un compte/i, /ouvrez un compte/i, /ouvre un compte/i];

const NOM_ATTENDU = 'Fondation Green-Got';
const VARIANTES_NOM = [/Fondation Green Got/i, /Fondation GreenGot/i, /Fondation green-got/];

const titres = new Map();
const descriptions = new Map();

const liste = pages();
if (liste.length === 0) erreurs.push('Aucune page construite. Lance la construction du site avant le contrôle.');

for (const f of liste) {
  const nom = '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  const html = readFileSync(f, 'utf8');
  const txt = texte(html);

  /* 1. Contenu servi */
  if (txt.length < 400) {
    erreurs.push(`${nom} ne sert que ${txt.length} caractères de texte sans JavaScript.`);
  }

  /* 2. Nom et statut */
  for (const v of VARIANTES_NOM) {
    if (v.test(txt)) erreurs.push(`${nom} contient une variante orthographique du nom, le nom exact est « ${NOM_ATTENDU} ».`);
  }

  /* 3. Le mot banque associé à Green-Got */
  for (const r of BANQUE_TOUJOURS_INTERDITE) {
    const m = txt.match(r);
    if (m) erreurs.push(`${nom} associe Green-Got à une banque, « ${m[0]} ». Green-Got est un établissement de paiement et un service financier.`);
  }
  for (const phrase of phrasesDouteuses(txt)) {
    erreurs.push(`${nom} associe Green-Got à une banque, « ${phrase.slice(0, 120)} ». Green-Got est un établissement de paiement et un service financier.`);
  }

  /* 4. Mots proscrits */
  for (const r of MOTS_PROSCRITS) {
    const m = txt.match(r);
    if (m) erreurs.push(`${nom} contient un mot proscrit, « ${m[0]} ».`);
  }

  /* 5. Ouverture de compte */
  for (const r of COMPTE) {
    const m = txt.match(r);
    if (m) erreurs.push(`${nom} pousse à ouvrir un compte Green-Got, « ${m[0]} ».`);
  }

  /* 6. Titre, description, H1, JSON-LD */
  const t = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const d = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!t) erreurs.push(`${nom} n'a pas de titre.`);
  else if (titres.has(t)) erreurs.push(`${nom} a le même titre que ${titres.get(t)}.`);
  else titres.set(t, nom);
  if (!d) erreurs.push(`${nom} n'a pas de description.`);
  else if (descriptions.has(d)) erreurs.push(`${nom} a la même description que ${descriptions.get(d)}.`);
  else descriptions.set(d, nom);

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) erreurs.push(`${nom} a ${h1} balises H1, il en faut exactement une.`);

  for (const bloc of html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || []) {
    const brut = bloc.replace(/^<script[^>]*>/, '').replace(/<\/script>$/, '');
    try { JSON.parse(brut); } catch (e) { erreurs.push(`${nom} a un JSON-LD invalide, ${e.message}`); }
  }
  if (!/application\/ld\+json/.test(html)) alertes.push(`${nom} n'a aucune donnée structurée.`);

  /*
    7. Date et auteur visibles.
    La page introuvable n'est pas une page de contenu, elle en est dispensée.
  */
  if (nom !== '/404.html' && !/class="signature"/.test(html)) {
    erreurs.push(`${nom} n'affiche ni date de publication ni auteur. Toute page de contenu doit les porter en clair.`);
  }

  /* Mentions À VALIDER, comptées et signalées, ce n'est pas une erreur */
  const nb = (txt.match(/À VALIDER/g) || []).length;
  if (nb) alertes.push(`${nom} porte ${nb} mention${nb > 1 ? 's' : ''} À VALIDER.`);
}

/*
  8. L'image de partage doit exister et faire au moins 1200 sur 630, c'est le
  format attendu par les réseaux et les cartes de résultat.
*/
function tailleJpeg(chemin) {
  const b = readFileSync(chemin);
  let i = 2;
  while (i < b.length) {
    if (b[i] !== 0xff) { i++; continue; }
    const m = b[i + 1];
    if ([0xc0, 0xc1, 0xc2, 0xc3].includes(m)) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
}

for (const f of liste) {
  const nom = '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  const html = readFileSync(f, 'utf8');
  const og = html.match(/property="og:image" content="([^"]*)"/)?.[1];
  if (!og) { erreurs.push(`${nom} n'a pas d'image de partage.`); continue; }
  const local = join(DIST, og.replace(/^https?:\/\/[^/]+/, ''));
  if (!existsSync(local)) { erreurs.push(`${nom} déclare une image de partage absente, ${og}.`); continue; }
  const t = local.endsWith('.jpg') ? tailleJpeg(local) : null;
  if (t && (t.w < 1200 || t.h < 630)) {
    erreurs.push(`${nom} a une image de partage de ${t.w} sur ${t.h}, il en faut au moins 1200 sur 630.`);
  }
}

/*
  9. Le sitemap et le llms.txt doivent couvrir exactement les pages construites,
  la page introuvable exceptée. Une page absente du sitemap n'est pas proposée
  aux moteurs, une adresse au sitemap sans page derrière est une promesse en l'air.
*/
{
  const construites = new Set(
    liste
      .map((f) => '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/'))
      .map((u) => u.replace(/\/$/, '') || '/')
      .filter((u) => u !== '/404.html')
  );

  const sitemap = existsSync(join(DIST, 'sitemap.xml')) ? readFileSync(join(DIST, 'sitemap.xml'), 'utf8') : '';
  const listees = new Set(
    [...sitemap.matchAll(/<loc>https:\/\/fondation\.green-got\.com([^<]*)<\/loc>/g)]
      .map((m) => m[1].replace(/\/$/, '') || '/')
  );
  for (const u of construites) if (!listees.has(u)) erreurs.push(`${u} n'est pas au sitemap.`);
  for (const u of listees) if (!construites.has(u)) erreurs.push(`Le sitemap annonce ${u}, qui n'existe pas.`);

  const llms = existsSync(join(DIST, 'llms.txt')) ? readFileSync(join(DIST, 'llms.txt'), 'utf8') : '';
  const citees = new Set(
    [...llms.matchAll(/\(https:\/\/fondation\.green-got\.com([^)]*)\)/g)]
      .map((m) => m[1].replace(/\/$/, '') || '/')
  );
  for (const u of construites) if (!citees.has(u)) erreurs.push(`${u} n'est pas dans llms.txt.`);
}

console.log(`Pages contrôlées, ${liste.length}.`);
if (alertes.length) {
  console.log('\nSignalements, ce ne sont pas des erreurs.');
  for (const a of alertes) console.log('  ·', a);
}
if (erreurs.length) {
  console.error('\nErreurs bloquantes.');
  for (const e of erreurs) console.error('  ×', e);
  process.exit(1);
}
console.log('\nAucune erreur bloquante.');
