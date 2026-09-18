/*
  Contrôle du responsive. Pour chaque page et chaque largeur, on vérifie que
  la page ne déborde pas horizontalement et qu'aucun élément ne dépasse de
  l'écran. Un débordement horizontal est le défaut le plus visible sur
  téléphone, il oblige à faire glisser la page de côté pour lire.

  Usage, node outils/responsive.mjs <base> <chemin...>
*/
import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const LARGEURS = [360, 768, 1440];

const base = process.argv[2];
const chemins = process.argv.slice(3);

const navigateur = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
let problemes = 0;

console.log('  Page                                360 px    768 px   1440 px');
for (const chemin of chemins) {
  const lignes = [];
  for (const largeur of LARGEURS) {
    const page = await navigateur.newPage();
    await page.setViewport({ width: largeur, height: 900, deviceScaleFactor: 2, isMobile: largeur < 700 });
    await page.goto(base + chemin, { waitUntil: 'networkidle0' });
    const r = await page.evaluate(() => {
      const de = document.documentElement;
      const debord = de.scrollWidth - de.clientWidth;
      const fautifs = [];
      for (const el of document.querySelectorAll('body *')) {
        const b = el.getBoundingClientRect();
        if (b.width === 0) continue;
        if (b.right > de.clientWidth + 1 || b.left < -1) {
          fautifs.push(el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''));
        }
      }
      return { debord, fautifs: [...new Set(fautifs)].slice(0, 3) };
    });
    await page.close();
    if (r.debord > 1) { problemes++; lignes.push(`DÉBORDE ${r.debord}px ${r.fautifs.join(' ')}`); }
    else lignes.push('  ok  ');
  }
  console.log(`  ${chemin.padEnd(34)} ${lignes.join('  ')}`);
}
await navigateur.close();
if (problemes) { console.error(`\n${problemes} débordement(s) horizontaux.`); process.exit(1); }
console.log('\nAucun débordement horizontal.');
