# Brief pour la passe de design

Ce document sert à ouvrir une conversation neuve consacrée au seul design. Il dit ce qu'est le site, où sont les fichiers, ce qui est décidé et ne se rediscute pas, et ce qui reste à travailler. Le contenu est terminé, il ne s'agit pas d'y toucher.

---

## Ce qu'est ce site

Le site public de la Fondation Green-Got, fondation.green-got.com. Trente-trois pages, générées par Astro en HTML statique. Tout le contenu éditorial est servi sans JavaScript, c'était l'objet du chantier précédent.

Le site n'est pas déployé. Le site actuellement en ligne est une application React fabriquée avec Lovable, qui sert un corps de page vide.

Pour voir le site.

```
npm install
npm run build
node outils/serveur.mjs 8080
```

Puis http://localhost:8080. Ce serveur applique les redirections et sert une vraie page 404, comme le fera l'hébergement.

---

## Ce qui est décidé et ne se rediscute pas

| Point | Décision |
|---|---|
| Identité visuelle | Elle existe et vient de la maquette d'origine. On la structure, on ne la refait pas |
| Vert profond | `#131B00`, fond de tout le site |
| Vert clair | `#CDFB6E`, accent, boutons pleins, marque |
| Bande claire | `#F7FFEA`, une seule bande claire par page au maximum |
| Polices | Terrane Sans pour les titres, Instrument Sans pour le texte courant, hébergées localement, aucun appel à un tiers |
| Logo | Le renard qui court, `assets/img/logo-fondation.svg`, et son tracé en variable CSS `--fox-run` |
| Structure | Site multi pages, grands visuels, beaucoup d'air, navigation simple |

---

## Où sont les fichiers

| Chemin | Contenu |
|---|---|
| `src/styles/site.css` | Toute la feuille de style, mille cent lignes. C'est le fichier à travailler |
| `src/layouts/Base.astro` | Le gabarit commun, en-tête, pied de page, métadonnées, données structurées |
| `src/components/` | Quatorze composants, dont `LigneIndex`, `Chiffre`, `Signature`, `AValider`, `CarteProjets` |
| `src/pages/` | Les pages, une par adresse |
| `src/content/` | Le contenu en Markdown, projets, évènements, publications. **Ne pas y toucher** |
| `src/data/` | La fiche d'identité, les faits et chiffres, les montants versés. **Ne pas y toucher** |
| `assets/img/` | Photos en JPEG, WebP et AVIF, plus vingt-huit cartes de partage |
| `outils/` | Huit outils de contrôle, voir plus bas |

---

## Ce qui a déjà été corrigé côté design

Ces points sont réglés, inutile d'y revenir.

Les listes de définitions n'avaient aucun style hors des fiches projet, elles en ont un. Le héros était une grille à deux colonnes qui laissait un demi-écran vide sur les pages à une colonne, une variante `.phero.simple` existe. Les titres et les paragraphes n'avaient aucune marge, un rythme a été posé. Les chiffres n'étaient pas mis en valeur, la classe `.stat` existe. Les lignes couraient sur cent quarante signes, la classe `.lisible` les contient à soixante-huit. Les boutons secondaires étaient invisibles, `.btn` seul a une bordure transparente, il faut `.btn.btn-o`. L'orange des mentions À VALIDER tombait à 1,80 pour 1 sur la bande claire, une variante `--orange-clair` à 5,19 pour 1 lui est substituée.

---

## Ce qui reste à travailler

**Les photos sont trop petites.** Seize fichiers, deux à trois fois en dessous de leur usage. `hero.jpg` fait 1000 × 676 pour un plein cadre, `card.jpg` 780 × 691 pour un cadre de 800 px, `depol.jpg` 560 × 560. Aucun traitement ne rattrape ça, il faut de nouveaux fichiers. Deux projets n'ont aucune photo, Planète Urgence et Coral Guardian, leurs vignettes affichent un aplat.

**La vidéo de l'accueil** fait 854 × 480 pour 6,4 Mo, trop petite pour un plein écran et lourde pour un forfait compté.

**Le renard** a été vectorisé depuis une image basse résolution, `assets/img/fox.jpg`. Le fichier vectoriel officiel de la marque n'a jamais été fourni.

**Les pages à regarder en priorité.** L'accueil, qui a gagné trois bandes sous le plein cadre et n'a pas été dessiné pour. Soutiens passés, créée tard, qui n'est qu'une longue liste. Nous soutenir, réécrite deux fois, qui empile sept titres de même niveau. Et les fiches de projet, dont la colonne latérale porte maintenant beaucoup plus de matière qu'à l'origine.

**Les mentions À VALIDER.** Il en reste trente, affichées en orange. Elles sont voulues, elles disparaîtront au fil des validations. Mais leur traitement visuel n'a jamais été pensé, il est hérité de la maquette.

---

## Les contrôles à ne pas casser

Le design précédent tenait ces notes, toute modification doit les tenir aussi.

| Contrôle | Commande | Seuil actuel |
|---|---|---|
| Règles éditoriales, titres, H1, dates, images de partage | `npm run verifier` | Aucune erreur |
| Données structurées | `node outils/jsonld.mjs` | Aucune erreur, 33 pages |
| Liens | `node outils/liens.mjs --externes` | 896 liens internes, aucun cassé |
| Débordement horizontal | `npm run responsive http://localhost:8080 / ...` | Aucun, à 360, 768 et 1440 px |
| Notes mobiles | `npm run lighthouse http://localhost:8080/` | Performance 95 à 100, accessibilité 100, bonnes pratiques 100, référencement 100 |
| Captures | `node outils/captures.mjs http://localhost:8080 /tmp/captures /` | Fait défiler avant de capturer, sinon les blocs à révélation manquent |

Deux pièges déjà rencontrés. L'accessibilité tombe dès qu'un contraste passe sous 4,5 pour 1, la bande claire est le terrain le plus dangereux. Et la performance de la page Projets tombe si le tracé de la carte grossit, il est simplifié à un demi-pixel et pèse 36 Ko.

---

## Les règles éditoriales qui touchent au design

Elles valent aussi pour les libellés de boutons et les micro textes.

Ne jamais écrire que Green-Got est une banque. Aucun bouton, aucun bandeau, aucun lien d'ouverture de compte. La Fondation n'est jamais reliée aux cartes, aux paiements ou aux arrondis dans le corps des pages. Pas de deux points ni de tirets dans les textes français, on écrit des phrases. Aucun texte ne compte les projets, la liste compte toute seule.

---

## Où lire la suite

`AUDIT.md` pour l'état de départ, `PLAN.md` pour les choix d'architecture, `CHANGELOG.md` pour tout ce qui a été fait et les décisions arrêtées, `BASCULE.md` pour la mise en ligne. `CLAUDE.md` décrit la maquette d'origine, qui reste dans le dépôt sous le nom `index.html` le temps de la bascule.
