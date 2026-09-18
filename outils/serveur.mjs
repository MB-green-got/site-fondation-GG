/*
  Serveur local qui se comporte comme l'hébergement visé.

  Il sert dist, applique le fichier _redirects, sert une page à son adresse
  sans barre oblique finale, et renvoie un vrai code 404 sur une adresse
  inconnue. Il permet de vérifier ici ce qui, sinon, ne serait vérifiable
  qu'une fois le site en ligne.

  Usage, node outils/serveur.mjs [port]
*/
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const DIST = 'dist';
const PORT = Number(process.argv[2] || 8080);

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.woff2': 'font/woff2', '.mp4': 'video/mp4', '.ics': 'text/calendar',
};

/* Lecture du fichier _redirects, une règle par ligne, source cible code. */
const regles = existsSync(join(DIST, '_redirects'))
  ? readFileSync(join(DIST, '_redirects'), 'utf8')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'))
      .map((l) => l.split(/\s+/))
      .filter((p) => p.length >= 2)
      .map(([de, vers, code]) => ({ de, vers, code: Number(code || 301) }))
  : [];

const serveur = createServer((req, res) => {
  const chemin = decodeURIComponent(new URL(req.url, 'http://x').pathname);

  const regle = regles.find((r) => r.de === chemin);
  if (regle) {
    res.writeHead(regle.code, { Location: regle.vers });
    return res.end();
  }

  const candidats = [
    join(DIST, chemin),
    join(DIST, chemin, 'index.html'),
    join(DIST, chemin + '.html'),
  ];
  for (const c of candidats) {
    if (existsSync(c) && statSync(c).isFile()) {
      const t = TYPES[extname(c)] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': t });
      return res.end(readFileSync(c));
    }
  }

  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(readFileSync(join(DIST, '404.html')));
});

serveur.listen(PORT, () => {
  console.log(`Serveur sur http://localhost:${PORT}, ${regles.length} redirections chargées.`);
});
