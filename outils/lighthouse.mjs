/*
  Mesure Lighthouse en profil mobile, sur le site construit et servi en local.
  Usage, node outils/lighthouse.mjs <url> [url...]
*/
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const urls = process.argv.slice(2);
const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new', '--no-sandbox'] });

console.log('  Page                              Perf.  Access.  Bonnes pratiques  SEO');
for (const url of urls) {
  const r = await lighthouse(url, { port: chrome.port, output: 'json', logLevel: 'error' },
    undefined);
  const c = r.lhr.categories;
  const n = (x) => String(Math.round(x * 100)).padStart(3);
  const chemin = new URL(url).pathname;
  console.log(`  ${chemin.padEnd(32)} ${n(c.performance.score)}   ${n(c.accessibility.score)}      ${n(c['best-practices'].score)}         ${n(c.seo.score)}`);
}
await chrome.kill();
