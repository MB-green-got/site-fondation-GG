/*
  Captures d'écran aux trois largeurs, pour regarder le site plutôt que de
  seulement le mesurer.
  Usage, node outils/captures.mjs <base> <dossier> <chemin...>
*/
import puppeteer from 'puppeteer-core';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const [base, dossier, ...chemins] = process.argv.slice(2);
const nav = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] });
for (const largeur of [360, 768, 1440]) {
  for (const chemin of chemins) {
    const page = await nav.newPage();
    await page.setViewport({ width: largeur, height: 1000, deviceScaleFactor: 1 });
    await page.goto(base + chemin, { waitUntil: 'networkidle0' });
    const nom = (chemin.replace(/\//g, '_') || '_accueil') + `_${largeur}.png`;
    await page.screenshot({ path: `${dossier}/${nom}`, fullPage: true });
    await page.close();
  }
}
await nav.close();
console.log('captures faites');
