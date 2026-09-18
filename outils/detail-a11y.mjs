import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless=new','--no-sandbox'] });
const r = await lighthouse(process.argv[2], { port: chrome.port, output: 'json', logLevel: 'error', onlyCategories: ['accessibility'] });
for (const ref of r.lhr.categories.accessibility.auditRefs) {
  const a = r.lhr.audits[ref.id];
  if (a.score !== null && a.score < 1) {
    console.log('×', a.id, '—', a.title);
    for (const it of (a.details?.items ?? []).slice(0,4)) {
      console.log('   ', (it.node?.snippet ?? JSON.stringify(it)).slice(0,160));
    }
  }
}
await chrome.kill();
