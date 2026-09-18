/*
  La carte des projets, construite au moment de la compilation.

  Dans la maquette, cette carte était dessinée par le navigateur, à partir de
  deux fonds de carte en JSON et d'un millier de lignes de JavaScript. Elle
  n'existait donc pas pour un robot, et pas non plus pour un visiteur dont le
  script n'avait pas chargé. Les mêmes calculs sont faits ici une fois pour
  toutes, et le HTML servi contient un vrai dessin.

  Les projections et les arrondis sont ceux de la maquette, au chiffre près,
  pour que le dessin soit identique.
*/
import monde from '../data/geo/monde.json';
import france from '../data/geo/france.json';

const COS = Math.cos((46.2 * Math.PI) / 180);
const kF = 520 / ((9.7 + 5.3) * COS);
const kI = 6.5;

export const projF = (lon, lat) => [20 + (lon + 5.3) * COS * kF, 17 + (51.2 - lat) * kF];
export const projI = (lon, lat) => [14 + (lon - 100) * kI, 436 + (2.7 - lat) * kI];

/* Les trois piliers, leur forme et leur couleur. */
export const PILIERS = {
  Terre: { forme: 'd', couleur: '#CDFB6E' },
  Mer: { forme: 'c', couleur: '#C2E9FF' },
  'Recherche et éducation': { forme: 's', couleur: '#FFAD5C' },
};

function anneaux(g, sortie) {
  if (!g) return;
  if (g.type === 'Polygon') for (const a of g.coordinates) sortie.push(a);
  else if (g.type === 'MultiPolygon') for (const p of g.coordinates) for (const a of p) sortie.push(a);
}

/*
  Simplification de Douglas-Peucker, appliquée après projection, donc en
  pixels. Le tracé complet de la France pèse 66 Ko, ce qui fait tomber la
  note de performance de la page à 85. À cette échelle, un écart d'un demi
  pixel ne se voit pas, et le tracé simplifié tient en quelques kilo-octets.
*/
function distanceAuSegment(p, a, b) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  if (dx === 0 && dy === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
}

function simplifier(points, tolerance) {
  if (points.length < 3) return points;
  let pire = 0;
  let index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const d = distanceAuSegment(points[i], points[0], points[points.length - 1]);
    if (d > pire) { pire = d; index = i; }
  }
  if (pire <= tolerance) return [points[0], points[points.length - 1]];
  return [
    ...simplifier(points.slice(0, index + 1), tolerance).slice(0, -1),
    ...simplifier(points.slice(index), tolerance),
  ];
}

/* Un anneau entièrement hors du cadre visible ne sert à rien, on le jette. */
function dansLeCadre(points, cadre) {
  if (!cadre) return true;
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const [x, y] of points) {
    if (x < x0) x0 = x;
    if (y < y0) y0 = y;
    if (x > x1) x1 = x;
    if (y > y1) y1 = y;
  }
  return x1 >= cadre[0] && x0 <= cadre[2] && y1 >= cadre[1] && y0 <= cadre[3];
}

function versChemin(rs, proj, latMin, tolerance = 0.5, cadre = null) {
  let d = '';
  for (const r of rs) {
    const projetes = [];
    let lx = 1e9;
    let ly = 1e9;
    for (const point of r) {
      if (latMin !== undefined && point[1] < latMin) continue;
      const pr = proj(point[0], point[1]);
      const x = Math.round(pr[0] * 10) / 10;
      const y = Math.round(pr[1] * 10) / 10;
      if (Math.abs(x - lx) < 0.3 && Math.abs(y - ly) < 0.3) continue;
      projetes.push([x, y]);
      lx = x;
      ly = y;
    }
    if (projetes.length <= 2) continue;
    if (!dansLeCadre(projetes, cadre)) continue;
    const gardes = simplifier(projetes, tolerance);
    if (gardes.length <= 2) continue;
    /* Une décimale suffit, le dessin fait 560 unités de large. */
    d += gardes.map(([x, y], i) => (i === 0 ? 'M' : 'L') + x + ' ' + y).join('') + 'Z';
  }
  return d;
}

function chemin(collection, proj, latMin, tolerance, cadre) {
  const rs = [];
  for (const f of collection.features) anneaux(f.geometry, rs);
  return versChemin(rs, proj, latMin, tolerance, cadre);
}

export const cheminFrance = () => chemin(france, projF, undefined, 0.5, null);

/*
  L'encart Indonésie est découpé par un rectangle de 222 sur 86 pixels, tout
  ce qui est en dehors est invisible et n'a donc rien à faire dans le HTML.
  Le dessin y est six fois plus petit, une tolérance plus large ne s'y voit pas.
*/
export const cheminMonde = () => chemin(monde, projI, undefined, 0.9, [14, 436, 236, 522]);

/* Le marqueur d'un projet, forme, halo et libellé. */
export function marqueur(projet, proj, petit) {
  const { forme, couleur } = PILIERS[projet.pilier];
  const [x, y] = proj(projet.coordonnees.lon, projet.coordonnees.lat);
  /*
    Le côté du libellé. On ne force que si la fiche le demande, sinon le
    libellé part vers l'intérieur de la carte, pour ne pas sortir du cadre.
    Le champ vaut null quand la fiche ne dit rien, il faut donc tester null
    et pas seulement undefined, sinon tous les libellés partent à gauche et
    ceux de la côte ouest sont coupés.
  */
  const aDroite = projet.labelADroite ?? x < (petit ? 120 : 400);
  return {
    x,
    y,
    couleur,
    forme,
    rayonHalo: petit ? 11 : 17,
    aDroite,
    labelX: aDroite ? x + 13 : x - 13,
    labelY: y + 4,
    nom: projet.nom.split(', ')[0],
    /* Un losange pour la terre, un carré pour la recherche, un disque pour la mer. */
    points: forme === 'd' ? `${x},${y - 9} ${x + 9},${y} ${x},${y + 9} ${x - 9},${y}` : null,
    rect: forme === 's' ? { x: x - 7, y: y - 7, c: 14 } : null,
    rayon: petit ? 5.4 : 7.4,
  };
}
