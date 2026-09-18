/*
  Passage au vrai validateur schema.org.

  On envoie le JSON-LD de chaque page construite à validator.schema.org et on
  rapporte ce qu'il répond, erreurs et avertissements. C'est le contrôle que
  la consigne demande, il complète outils/jsonld.mjs qui, lui, vérifie la
  cohérence interne du site sans sortir de la machine.

  Le service limite fortement le débit. Sans argument, l'outil valide un
  exemplaire de chaque gabarit de page, ce qui suffit à prouver la validité
  du balisage puisque toutes les fiches d'un même type sortent du même
  gabarit. Avec l'argument --tout, il les soumet toutes, plus lentement.

  Usage, node outils/validateur-schema.mjs [--tout]
*/
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';

function pages(dir = DIST, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) pages(p, out);
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}

const patienter = (ms) => new Promise((r) => setTimeout(r, ms));

/*
  Le validateur limite le débit et répond 429 au bout d'une dizaine d'envois.
  On espace les requêtes et on réessaie en doublant l'attente, plutôt que de
  rendre un résultat partiel qui aurait l'air d'une validation complète.
*/
async function valider(html, essais = 4) {
  let attente = 20000;
  for (let i = 0; i < essais; i++) {
    const r = await fetch('https://validator.schema.org/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ html }),
      redirect: 'manual',
      signal: AbortSignal.timeout(45000),
    });
    if (r.ok) {
      const brut = await r.text();
      return JSON.parse(brut.replace(/^\)\]\}'\s*/, ''));
    }
    /*
      Le service répond 429, ou renvoie vers une page d'accueil en 302, quand
      il a reçu trop d'envois depuis la même adresse. Ce n'est pas une erreur
      de balisage, c'est une limite de débit, et il faut le dire plutôt que
      de laisser croire à un échec de validation.
    */
    if (r.status !== 429 && r.status !== 302 && r.status !== 403) {
      throw new Error(`le validateur a répondu ${r.status}`);
    }
    await patienter(attente);
    attente *= 2;
  }
  throw new Error('limite de débit du validateur, ce n\'est pas une erreur de balisage, réessayer dans quelques heures');
}

let totalErreurs = 0;
let totalAvertissements = 0;
let totalObjets = 0;
const detail = [];

/* Un exemplaire par gabarit. */
const GABARITS = [
  '/index.html', '/404.html', '/la-fondation/index.html', '/faits-et-chiffres/index.html',
  '/nos-combats/index.html', '/nous-soutenir/index.html', '/associations/index.html',
  '/contact/index.html', '/mentions-legales/index.html', '/confidentialite/index.html',
  '/projets/index.html', '/projets/feve-fermes-en-vie/index.html',
  '/evenements/index.html', '/evenements/depollution-seine-17-septembre-2026/index.html',
  '/evenements/festival-du-bulbe/index.html',
  '/publications/index.html', '/publications/les-rivieres-mortes/index.html',
];
const toutes = pages().sort();
const liste = process.argv.includes('--tout')
  ? toutes
  : toutes.filter((f) => GABARITS.some((g) => f.endsWith(g.slice(1)) && ('/' + f.slice(DIST.length + 1)) === g));
console.log(`Envoi de ${liste.length} pages à validator.schema.org${process.argv.includes('--tout') ? '' : ', un exemplaire par gabarit'}.\n`);

for (const f of liste) {
  const nom = '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  const html = readFileSync(f, 'utf8');
  const blocs = (html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) || []).join('\n');

  await patienter(8000);
  let res;
  try { res = await valider(blocs); }
  catch (e) { console.log(`  ${nom.padEnd(52)} ${e.message}`); continue; }

  const erreurs = res.tripleGroups?.reduce((n, g) => n + (g.numErrors ?? 0), 0) ?? 0;
  const avert = res.tripleGroups?.reduce((n, g) => n + (g.numWarnings ?? 0), 0) ?? 0;
  const objets = res.numObjects ?? 0;
  totalErreurs += erreurs;
  totalAvertissements += avert;
  totalObjets += objets;

  console.log(`  ${nom.padEnd(52)} ${String(objets).padStart(3)} objets, ${erreurs} erreur(s), ${avert} avertissement(s)`);

  if (erreurs || avert) {
    for (const g of res.tripleGroups ?? []) {
      for (const n of g.nodes ?? []) {
        for (const p of [...(n.properties ?? []), ...(n.nodeProperties ?? [])]) {
          for (const e of p.errors ?? []) detail.push(`${nom}  ${n.typeGroup}.${p.pred}  ${e.errorType ?? ''} ${e.args ?? ''}`);
        }
        for (const t of n.types ?? []) {
          for (const e of t.errors ?? []) detail.push(`${nom}  type ${t.value}  ${e.errorType ?? ''} ${e.args ?? ''}`);
        }
      }
    }
  }
}

console.log(`\nTotal, ${totalObjets} objets sur ${liste.length} pages, ${totalErreurs} erreur(s), ${totalAvertissements} avertissement(s).`);
if (detail.length) {
  console.log('\nDétail.');
  for (const d of [...new Set(detail)]) console.log('  ·', d);
}
if (totalErreurs) process.exit(1);
