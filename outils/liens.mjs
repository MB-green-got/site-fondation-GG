/*
  Contrôle des liens du site construit.

  Les liens internes sont vérifiés contre les fichiers réellement produits,
  ancres comprises. Les liens externes sont interrogés, avec la réserve que
  certains sites répondent 403 ou 999 à une requête automatisée sans être
  cassés pour autant.

  Usage, node outils/liens.mjs [--externes]
*/
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const externes = process.argv.includes('--externes');

function pages(dir = DIST, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) pages(p, out);
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}

const liste = pages();
const erreurs = [];
const aTester = new Map();
let internes = 0;

/* Les ancres disponibles, page par page. */
const ancres = new Map();
for (const f of liste) {
  const nom = '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  const html = readFileSync(f, 'utf8');
  ancres.set(nom.replace(/\/$/, '') || '/', new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

function existe(chemin) {
  const c = chemin.replace(/\/$/, '');
  if (c === '') return true;
  return existsSync(join(DIST, c, 'index.html')) || existsSync(join(DIST, c)) || existsSync(join(DIST, c + '.html'));
}

for (const f of liste) {
  const source = '/' + relative(DIST, f).replace(/index\.html$/, '').replace(/\\/g, '/');
  const html = readFileSync(f, 'utf8');
  for (const m of html.matchAll(/href="([^"]+)"/g)) {
    const href = m[1];
    if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (/^https?:\/\//.test(href)) {
      if (href.startsWith('https://fondation.green-got.com')) continue;
      if (!aTester.has(href)) aTester.set(href, source);
      continue;
    }
    if (href.startsWith('#')) {
      internes++;
      const cible = source.replace(/\/$/, '') || '/';
      if (!ancres.get(cible)?.has(href.slice(1))) erreurs.push(`${source} pointe vers l'ancre ${href}, absente de la page.`);
      continue;
    }
    if (!href.startsWith('/')) continue;
    internes++;
    const [chemin, ancre] = href.split('#');
    if (!existe(chemin)) { erreurs.push(`${source} pointe vers ${href}, qui n'existe pas.`); continue; }
    if (ancre) {
      const cible = chemin.replace(/\/$/, '') || '/';
      if (!ancres.get(cible)?.has(ancre)) erreurs.push(`${source} pointe vers ${href}, l'ancre est absente de la page cible.`);
    }
  }
}

console.log(`Liens internes vérifiés, ${internes}.`);
if (erreurs.length) {
  console.error('\nLiens internes cassés.');
  for (const e of erreurs) console.error('  ×', e);
} else {
  console.log('Aucun lien interne cassé.');
}

if (externes) {
  console.log(`\nLiens externes, ${aTester.size}.`);
  const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
  for (const [url, source] of aTester) {
    let code = 'err';
    try {
      const r = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(25000) });
      code = r.status;
    } catch { code = 'timeout'; }
    const note = [403, 999, 202].includes(code) ? '  blocage anti-robot, à vérifier à la main' : code === 200 ? '' : '  À REGARDER';
    console.log(`  ${String(code).padEnd(8)} ${url}${note}`);
  }
}

if (erreurs.length) process.exit(1);
