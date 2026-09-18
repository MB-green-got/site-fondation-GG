/*
  Les cartes de partage, 1200 sur 630.

  L'ancienne carte pointait vers hero.jpg, qui fait 1000 sur 676, soit en
  dessous du format attendu par les réseaux et les cartes de résultat. Les
  photos de projet sont encore plus petites, la plus grande fait 900 sur 1200
  et la plupart tournent autour de 500 sur 600. Les recadrer au bon format
  aurait demandé de les agrandir de deux à trois fois, donc de les dégrader.

  On compose donc une carte par page, sur le vert profond de la maison, avec
  le renard et le titre de la page. Rien n'y est agrandi et rien n'y est
  inventé, les textes viennent des fiches et de la fiche d'identité.

  Usage, node outils/image-partage.mjs
*/
import sharp from 'sharp';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const FOND = '#131B00';
const VERT = '#CDFB6E';
const CLAIR = '#FCFCFC';
const GRIS = '#9AA38A';
const POLICE = 'Helvetica Neue, Helvetica, Arial, sans-serif';

const logo = readFileSync('assets/img/logo-fondation.svg', 'utf8');
const tracé = [...logo.matchAll(/<path[^>]*\sd=['"]([^'"]+)['"]/g)].map((m) => m[1]);
if (tracé.length === 0) throw new Error('Aucun tracé trouvé dans le logo.');
const ECHELLE = 190 / 1000;

const echapper = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/*
  Découpe une phrase en lignes qui tiennent dans la largeur donnée. La mesure
  est approximative, on n'a pas les métriques de la police, mais elle est
  prudente, une ligne trop courte vaut mieux qu'une ligne qui déborde.
*/
function lignes(texte, taille, largeur, maxLignes) {
  const parMot = taille * 0.5;
  const parLigne = Math.floor(largeur / parMot);
  const mots = texte.split(' ');
  const out = [];
  let courante = '';
  for (const mot of mots) {
    const essai = courante ? `${courante} ${mot}` : mot;
    if (essai.length > parLigne && courante) { out.push(courante); courante = mot; }
    else courante = essai;
  }
  if (courante) out.push(courante);
  if (out.length > maxLignes) {
    const gardees = out.slice(0, maxLignes);
    gardees[maxLignes - 1] = gardees[maxLignes - 1].replace(/[,.;]?$/, '…');
    return gardees;
  }
  return out;
}

function carte({ titre, surtitre }) {
  const taille = titre.length > 58 ? 50 : titre.length > 38 ? 58 : 66;
  const ls = lignes(titre, taille, 1024, 3);
  const hauteurBloc = ls.length * (taille + 12);
  const depart = 336 - hauteurBloc / 2 + taille;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${FOND}"/>
  <g transform="translate(88,84) scale(${ECHELLE})">
    ${tracé.map((d) => `<path d="${d}" fill="${VERT}"/>`).join('')}
  </g>
  ${surtitre ? `<text x="88" y="252" fill="${VERT}" font-family="${POLICE}" font-weight="600" font-size="24" letter-spacing="1.6">${echapper(surtitre.toUpperCase())}</text>` : ''}
  ${ls.map((l, i) => `<text x="88" y="${depart + i * (taille + 12)}" fill="${CLAIR}" font-family="${POLICE}" font-weight="700" font-size="${taille}" letter-spacing="-2">${echapper(l)}</text>`).join('\n  ')}
  <rect x="88" y="512" width="1024" height="1" fill="rgba(205,251,110,.22)"/>
  <text x="88" y="556" fill="${VERT}" font-family="${POLICE}" font-weight="600" font-size="25">Fondation Green-Got</text>
  <text x="88" y="590" fill="${GRIS}" font-family="${POLICE}" font-weight="400" font-size="22">Fondation abritée par la Fondation de France</text>
</svg>`;
}

/* Lecture minimale de l'en-tête d'un fichier Markdown. */
function champ(contenu, nom) {
  const m = contenu.match(new RegExp(`^${nom}:\\s*(.+)$`, 'm'));
  if (!m) return null;
  return m[1].trim().replace(/^['"]|['"]$/g, '');
}

const aFaire = [
  { fichier: 'partage', titre: 'On finance ce qui ne rapporte rien. Et qui compte le plus.', surtitre: null },
  { fichier: 'partage-la-fondation', titre: 'Qui nous sommes, et qui décide de ce qu\'on finance.', surtitre: 'La Fondation' },
  { fichier: 'partage-faits-et-chiffres', titre: 'Faits et chiffres sur la Fondation Green-Got.', surtitre: 'Page de référence' },
  { fichier: 'partage-nos-combats', titre: 'Le plastique et les pesticides viennent du pétrole.', surtitre: 'Nos combats' },
  { fichier: 'partage-projets', titre: 'Nous soutenons ceux qui agissent. De Roubaix à Bali.', surtitre: 'Les projets financés' },
  { fichier: 'partage-evenements', titre: 'Aller voir les projets qu\'on finance plutôt que d\'en parler.', surtitre: 'Les rendez-vous' },
  { fichier: 'partage-publications', titre: 'Ce qu\'on donne à voir.', surtitre: 'Publications' },
  { fichier: 'partage-associations', titre: 'Vous menez des projets contre la pollution ? Candidatez.', surtitre: 'Associations' },
  { fichier: 'partage-contact', titre: 'Nous écrire.', surtitre: 'Contact' },
];

/* Une carte par fiche, avec son propre titre. */
for (const [dossier, surtitre, cle] of [
  ['projets', 'Projet financé', 'nom'],
  ['evenements', 'Rendez-vous', 'h1'],
  ['publications', 'Publication', 'titre'],
]) {
  const base = join('src/content', dossier);
  for (const f of readdirSync(base).filter((n) => n.endsWith('.md'))) {
    const contenu = readFileSync(join(base, f), 'utf8');
    aFaire.push({
      fichier: `partage-${dossier}-${f.replace(/\.md$/, '')}`,
      titre: champ(contenu, cle) ?? f,
      surtitre,
    });
  }
}

for (const c of aFaire) {
  await sharp(Buffer.from(carte(c))).jpeg({ quality: 86 }).toFile(`assets/img/${c.fichier}.jpg`);
}

console.log(`${aFaire.length} cartes de partage écrites, 1200 sur 630.`);
