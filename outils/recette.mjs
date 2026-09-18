/*
  Recette finale. Une requête HTTP par type de page, sans exécuter la moindre
  ligne de JavaScript, et on compte ce que le robot reçoit réellement.
  Usage, node outils/recette.mjs <base>
*/
const base = process.argv[2];
const PAGES = [
  ['Accueil', '/'],
  ['La Fondation', '/la-fondation'],
  ['Faits et chiffres', '/faits-et-chiffres'],
  ['Nos combats', '/nos-combats'],
  ['Index des projets', '/projets'],
  ['Une page projet', '/projets/feve-fermes-en-vie'],
  ['Programme', '/evenements'],
  ['Un évènement', '/evenements/depollution-seine-17-septembre-2026'],
  ['Publications', '/publications'],
  ['Une publication', '/publications/les-rivieres-mortes'],
  ['Associations', '/associations'],
  ['Contact', '/contact'],
  ['Mentions légales', '/mentions-legales'],
  ['Confidentialité', '/confidentialite'],
  ['Page introuvable', '/404.html'],
];

const texte = (h) => {
  const b = h.slice(h.indexOf('<main'), h.indexOf('</main>'));
  return b.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ').replace(/\s+/g, ' ').trim();
};

console.log('  Type de page          Code  Octets  Texte éditorial servi sans JavaScript');
for (const [nom, url] of PAGES) {
  const r = await fetch(base + url, { redirect: 'follow' });
  const h = await r.text();
  console.log(`  ${nom.padEnd(21)} ${r.status}   ${String(h.length).padStart(6)}   ${String(texte(h).length).padStart(5)} caractères`);
}

console.log('\n  Fichier               Code  Octets');
for (const f of ['/robots.txt', '/sitemap.xml', '/llms.txt', '/_redirects']) {
  const r = await fetch(base + f);
  const t = await r.text();
  console.log(`  ${f.padEnd(21)} ${r.status}   ${String(t.length).padStart(6)}`);
}
