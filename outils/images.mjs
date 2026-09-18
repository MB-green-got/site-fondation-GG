/*
  Conversion des photos aux formats modernes.

  Les seize photos sont posées en fond CSS, pas en balise img, on ne peut donc
  pas utiliser picture. On écrit une variante AVIF et une variante WebP à côté
  de chaque JPEG, et la feuille de style les propose par image-set, le
  navigateur prend le premier format qu'il sait lire et retombe sur le JPEG
  sinon.

  Aucune image n'est agrandie. Les fichiers d'origine sont trop petits pour
  leur usage, c'est signalé dans le journal, seuls de nouveaux fichiers
  peuvent le corriger.

  Usage, node outils/images.mjs
*/
import sharp from 'sharp';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const DOSSIER = 'assets/img';
let avant = 0;
let apres = 0;

for (const nom of readdirSync(DOSSIER).sort()) {
  if (!nom.endsWith('.jpg')) continue;
  const source = join(DOSSIER, nom);
  const base = nom.replace(/\.jpg$/, '');
  const poidsJpeg = statSync(source).size;
  avant += poidsJpeg;

  await sharp(source).webp({ quality: 78, effort: 6 }).toFile(join(DOSSIER, `${base}.webp`));
  await sharp(source).avif({ quality: 55, effort: 6 }).toFile(join(DOSSIER, `${base}.avif`));

  const w = statSync(join(DOSSIER, `${base}.webp`)).size;
  const a = statSync(join(DOSSIER, `${base}.avif`)).size;
  apres += Math.min(w, a);
  const gain = Math.round((1 - Math.min(w, a) / poidsJpeg) * 100);
  console.log(
    `  ${base.padEnd(12)} jpeg ${String(Math.round(poidsJpeg / 1024)).padStart(4)} Ko` +
    `  webp ${String(Math.round(w / 1024)).padStart(4)} Ko` +
    `  avif ${String(Math.round(a / 1024)).padStart(4)} Ko` +
    `  soit ${gain} % de moins`
  );
}

console.log(`\nTotal, ${Math.round(avant / 1024)} Ko en JPEG contre ${Math.round(apres / 1024)} Ko au meilleur format.`);
