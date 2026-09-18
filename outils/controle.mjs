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
import { readdirSync, readFileSync, statSync } from 'node:fs';
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

/* Formulations interdites, elles associeraient Green-Got à une banque. */
const BANQUE_INTERDITE = [
  /votre banque/i,
  /Green[-‑]Got[^.]{0,60}\bbanque\b/i,
  /\bla banque\b[^.]{0,40}\bvotre carte\b/i,
  /banque\s+Green[-‑]Got/i,
];

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
  for (const r of BANQUE_INTERDITE) {
    const m = txt.match(r);
    if (m) erreurs.push(`${nom} associe Green-Got à une banque, « ${m[0]} ». Green-Got est un établissement de paiement et un service financier.`);
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

  /* Mentions À VALIDER, comptées et signalées, ce n'est pas une erreur */
  const nb = (txt.match(/À VALIDER/g) || []).length;
  if (nb) alertes.push(`${nom} porte ${nb} mention${nb > 1 ? 's' : ''} À VALIDER.`);
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
