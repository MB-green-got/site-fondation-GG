# Audit technique du site de la Fondation Green-Got

Audit réalisé le 17 septembre 2026 par Claude, à la demande de Marie Bénédicte.
Phase 1 du chantier. Aucun fichier du site n'a été modifié.

---

## 1. Le point le plus important, à trancher avant toute chose

Le site publié sur fondation.green-got.com et le code présent dans ce dépôt sont **deux sites différents**, qui n'ont ni le même contenu, ni les mêmes pages, ni la même technologie.

| | Site en ligne | Ce dépôt |
|---|---|---|
| Adresse | https://fondation.green-got.com | https://mb-green-got.github.io/site-fondation-GG/ |
| Technologie | Application React compilée par Vite, produite avec l'outil Lovable | Un seul fichier `index.html` de 320 Ko, écrit à la main |
| Hébergement | Lovable derrière Cloudflare | GitHub Pages, branche `main` |
| Pages | Accueil, Histoire, Nos combats et trois fiches, Productions, Nous soutenir, Contacter | Accueil, Nos combats, Les actions et huit fiches, Évènements, La Fondation, Associations, deux pages légales |
| Contenu lisible sans JavaScript | Aucun | La majeure partie, sauf les fiches action |

Le dépôt contient une maquette beaucoup plus riche et beaucoup mieux sourcée que le site en ligne, avec huit fiches d'action nommées, des chiffres datés et des liens vers les sources primaires. Cette maquette n'a jamais remplacé le site public.

Le dossier de travail local est vide, il ne contient que le dossier `.git`. La branche locale `main` n'a aucun commit. Tout le code vit sur le dépôt distant, sur deux branches. La branche `passe-responsive` porte un commit de plus que `main`, elle corrige le responsive, héberge les polices et règle des problèmes de contraste. Elle n'est pas fusionnée et n'est pas publiée.

**Ce que j'ai besoin de savoir de ta part.** Sur quelle base on travaille. Soit on part de la maquette du dépôt, qui a le meilleur contenu et qu'il faut alors déployer à la place du site Lovable, soit on part du site Lovable, qu'il faut alors reconstruire en rendu serveur. Mon avis, on part de la maquette du dépôt, son contenu est déjà le bon et le travail restant est technique plutôt qu'éditorial.

---

## 2. Framework, version, mode de rendu

### Site en ligne

| Élément | Constat |
|---|---|
| Framework | React avec React Router, compilé par Vite |
| Fichier servi | Un HTML de 1 887 octets, un CSS, un JavaScript de 511 Ko |
| Mode de rendu | Entièrement côté navigateur, le HTML servi ne contient aucun texte |
| Hébergeur | Lovable, identifié par le script `/~flock.js`, l'image sociale stockée chez `gpt-engineer-file-uploads` et la balise `twitter:site` réglée sur `@Lovable` |
| Réseau de diffusion | Cloudflare |
| Analytique | Un traceur maison est chargé, `/~flock.js` avec un relais vers `/~api/analytics` |

### Ce dépôt

| Élément | Constat |
|---|---|
| Framework | Aucun, HTML, CSS et JavaScript écrits à la main dans un seul fichier |
| Mode de rendu | Statique, mais la navigation passe par un routeur par ancre, du type `#/actions/feve` |
| Hébergeur | GitHub Pages, un fichier `.nojekyll` est présent |
| Dépendances tierces | Aucune sur la branche `passe-responsive`, les deux polices y sont hébergées localement. Sur `main`, Instrument Sans est encore appelée chez Google Fonts, ce qui transmet l'adresse IP du visiteur à Google |
| Poids | `index.html` 320 Ko, une vidéo de 6,4 Mo, seize photos en JPEG |

---

## 3. Preuve par requête HTTP sans JavaScript

### Page d'accueil du site en ligne

Commande.

```
curl -sSL https://fondation.green-got.com/
```

Réponse brute, dans son intégralité, 1 887 octets.

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- TODO: Set the document title to the name of your application -->
    <title>Fondation Green-Got — Agir pour un avenir sans pollution</title>
    <meta name="description" content="La Fondation Green-Got finance la recherche et les actions concrètes contre les pesticides, la pollution plastique et les PFAS.">
    <meta name="author" content="Fondation Green-Got" />

    
    
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/sNV431HKGzZFasfybSankiED2TB3/social-images/social-1777043225290-image-2.webp">

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Lovable" />
    <meta name="twitter:image" content="https://storage.googleapis.com/gpt-engineer-file-uploads/sNV431HKGzZFasfybSankiED2TB3/social-images/social-1777043225290-image-2.webp">
    <meta property="og:title" content="Fondation Green-Got — Agir pour un avenir sans pollution">
  <meta name="twitter:title" content="Fondation Green-Got — Agir pour un avenir sans pollution">
  <meta property="og:description" content="La Fondation Green-Got finance la recherche et les actions concrètes contre les pesticides, la pollution plastique et les PFAS.">
  <meta name="twitter:description" content="La Fondation Green-Got finance la recherche et les actions concrètes contre les pesticides, la pollution plastique et les PFAS.">
  <script type="module" crossorigin src="/assets/index-DD7bLSbQ.js"></script>
  <link rel="stylesheet" crossorigin href="/assets/index-CYojdiOg.css">
<script defer src="/~flock.js" data-proxy-url="/~api/analytics"></script></head>

  <body>
    <div id="root"></div>
  </body>
</html>
```

Ton diagnostic est exact et il est même un peu en dessous de la réalité. Le robot reçoit un titre, une description, une image de partage, et un corps de page vide. Il n'y a pas une phrase de contenu éditorial. Trois détails aggravent le constat. La langue déclarée est l'anglais alors que le site est en français, `lang="en"`. Un commentaire de gabarit non retiré traîne dans le code, « TODO, Set the document title to the name of your application ». Le compte Twitter déclaré est celui de l'outil qui a fabriqué le site, `@Lovable`, et non celui de la Fondation.

### Page projet du site en ligne

Commande.

```
curl -sSL https://fondation.green-got.com/nos-combats/pesticides | wc -c
```

Réponse.

```
1887
```

Corps de la réponse.

```html
  <body>
    <div id="root"></div>
  </body>
```

La page projet renvoie exactement les mêmes 1 887 octets que l'accueil, au titre près qui n'est pas ajusté non plus. Toutes les adresses du site servent le même fichier vide.

### Adresse inexistante

```
curl -o /dev/null -w "%{http_code}" https://fondation.green-got.com/cette-page-nexiste-pas-123
```

Réponse.

```
200
```

Une adresse qui n'existe pas répond 200 au lieu de 404. Les moteurs appellent ça une fausse 404 et cela leur fait indexer des pages fantômes.

### La maquette du dépôt, servie localement

J'ai extrait la branche `passe-responsive` et je l'ai servie sur un serveur local pour mesurer ce qu'un robot en recevrait.

```
curl -sS http://localhost:8765/
HTTP 200, 271 815 octets
```

Texte éditorial récupérable sans exécuter le moindre script, 14 176 caractères. À titre de comparaison, le site en ligne en sert zéro. La maquette est donc très largement lisible sans JavaScript, ce qui est une excellente nouvelle pour la suite.

Deux réserves importantes.

Toutes les pages arrivent empilées dans un seul fichier, il n'y a pas une adresse par page. Le robot lit neuf pages d'un coup sans savoir où commence et où finit chacune.

Les huit fiches d'action ne sont pas dans le HTML. Elles sont construites par le JavaScript à partir d'un tableau nommé `ACTIONS`, soit 13 764 caractères de contenu éditorial invisible pour un robot. C'est le contenu le plus précieux du site, les noms, les lieux, les chiffres et les sources, et c'est exactement celui qui ne se lit pas.

Preuve que les fiches n'ont pas d'adresse propre.

```
curl -sS "http://localhost:8765/#/actions/feve" -o feve.html
cmp local-home.html feve.html
```

Les deux fichiers sont identiques, octet pour octet. Ce qui suit le dièse n'est jamais envoyé au serveur, donc aucun robot ne peut demander la fiche FEVE.

---

## 4. Pages existantes et adresses

### Site en ligne, sept adresses

| Adresse | Page |
|---|---|
| `/` | Accueil |
| `/histoire` | Histoire |
| `/nos-combats` | Nos combats |
| `/nos-combats/pesticides` | Combat pesticides |
| `/nos-combats/pollution-plastique` | Combat pollution plastique |
| `/nos-combats/pfas` | Combat PFAS |
| `/productions` | Productions |
| `/nous-soutenir` | Nous soutenir |
| `/contacter` | Contacter |

Aucune page de mentions légales ni de politique de confidentialité n'apparaît dans les routes du site en ligne.

### Dépôt, dix pages et huit fiches, toutes sur une seule adresse

| Route interne | Page | Contenu dans le HTML |
|---|---|---|
| `#/` | Accueil | Oui |
| `#/combats` | Nos combats | Oui |
| `#/actions` | Les actions | Oui |
| `#/actions/feve` | FEVE, Fermes En Vie | Non, construite par script |
| `#/actions/planete` | Planète Urgence | Non, construite par script |
| `#/actions/sungai` | Sungai Watch | Non, construite par script |
| `#/actions/wings` | Wings of the Ocean | Non, construite par script |
| `#/actions/tara` | Fondation Tara Océan | Non, construite par script |
| `#/actions/coral` | Coral Guardian | Non, construite par script |
| `#/actions/shift` | The Shift Project | Non, construite par script |
| `#/actions/ecole` | École de la Réparation | Non, construite par script |
| `#/evenements` | Évènements | Oui |
| `#/fondation` | La Fondation | Oui |
| `#/associations` | Associations, candidater | Oui |
| `#/mentions-legales` | Mentions légales | Oui |
| `#/confidentialite` | Confidentialité | Oui |
| aucune | Page introuvable | Oui |

Les huit associations financées sont donc connues et documentées, je n'aurai pas à te les demander ni à en inventer. Quatre évènements sont également décrits, le 17 septembre 2026 avec Wings of the Ocean, le Festival du Bulbe, une soirée à Paris et une série en villes.

---

## 5. robots.txt, sitemap.xml, llms.txt

| Fichier | Site en ligne | Dépôt |
|---|---|---|
| `robots.txt` | Présent, 200, 160 octets | Absent |
| `sitemap.xml` | Absent, 404 | Absent |
| `llms.txt` | Absent, 404 | Absent |

Contenu intégral du `robots.txt` en ligne.

```
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /
```

La règle générique autorise tout le monde, donc les robots d'IA ne sont pas bloqués. Mais aucun n'est nommé, et surtout aucun commentaire n'indique que cette ouverture est une décision assumée de la direction. Ni GPTBot, ni OAI-SearchBot, ni ClaudeBot, ni PerplexityBot, ni Google-Extended n'apparaissent. Il n'y a pas non plus de ligne `Sitemap`.

L'absence de `sitemap.xml` prive les moteurs de la liste des pages et de leur date de mise à jour. L'absence de `llms.txt` prive les modèles de langage de la carte du site. Ces deux fichiers sont à créer.

---

## 6. Données structurées schema.org

### Site en ligne

Aucune. J'ai cherché `ld+json` et `schema.org` dans le HTML et dans les 511 Ko du fichier JavaScript, zéro occurrence. Ni Organization, ni FAQPage, ni Article, ni BreadcrumbList, ni Event.

C'est un point sérieux. Le site comporte une foire aux questions de six questions, entièrement rédigée, qui n'est balisée nulle part.

### Dépôt

Un seul bloc JSON-LD, dans l'en-tête, avec deux éléments.

Un `Organization` nommé « Fondation Green-Got », avec un `parentOrganization` vers Green-Got, une description et un `areaServed` réglé sur FR. Il lui manque `sameAs`, `logo`, `foundingDate`, `address` et `email`.

Un `Event` complet et de bonne qualité pour le rendez-vous du 17 septembre 2026, avec lieu, horaires, organisateur et intervenant.

Manquent `FAQPage`, `Article`, `BreadcrumbList`, et une `Organization` par association financée. Et comme ce bloc est dans l'en-tête commun, il s'applique à l'ensemble du fichier, il n'y a pas de balisage par page.

Pour les liens `sameAs` demandés, j'ai vérifié ce qui existe.

| Ressource | État |
|---|---|
| Article Wikipédia Green-Got | Existe, https://fr.wikipedia.org/wiki/Green-Got |
| Page LinkedIn de la Fondation | À VALIDER, je n'ai pas trouvé l'adresse, peux-tu me la donner |
| Fiche annuaire Fondation de France | À VALIDER, l'adresse que j'ai testée renvoie une 404, peux-tu me donner l'adresse exacte |
| Instagram de la Fondation | Existe, https://www.instagram.com/fondation_green_got/ |
| Chaîne YouTube Green-Got | Existe, https://www.youtube.com/@green-got |

---

## 7. Balises title et meta description

### Site en ligne

Un seul titre et une seule description pour les neuf adresses du site, écrits en dur dans le fichier HTML. Le titre est « Fondation Green-Got — Agir pour un avenir sans pollution », il contient un tiret cadratin, ce que tes règles éditoriales interdisent dans les textes français. Aucune adresse canonique n'est déclarée, aucune balise `og:url` non plus.

### Dépôt

Chaque page porte un titre et une description propres, rangés dans des attributs `data-title` et `data-desc`, que le script recopie dans l'en-tête au moment de la navigation. Le travail rédactionnel est fait et il est bon.

| Page | Titre |
|---|---|
| Accueil | Fondation Green-Got |
| Les actions | Les actions financées · Fondation Green-Got |
| Évènements | Évènements · Fondation Green-Got |
| Nos combats | Nos combats · Fondation Green-Got |
| La Fondation | La Fondation · Fondation Green-Got |
| Associations | Associations, candidater · Fondation Green-Got |
| Mentions légales | Mentions légales · Fondation Green-Got |
| Confidentialité | Confidentialité · Fondation Green-Got |
| Page introuvable | Page introuvable · Fondation Green-Got |

Deux limites. Un robot qui ne lit pas le JavaScript ne voit que le titre générique « Fondation Green-Got » et la description de l'accueil, les huit autres sont invisibles. Et les fiches action n'ont ni titre ni description, la page modèle n'en porte aucun.

Aucun titre n'est formulé en question, alors que c'est la forme que les moteurs de réponse privilégient.

---

## 8. Dates de publication, dates de mise à jour, auteurs

Aucune, nulle part, ni sur le site en ligne ni dans le dépôt.

Zéro balise `<time>` dans les deux. Zéro mention d'auteur. Zéro `datePublished` ou `dateModified`. Aucun contenu du site ne porte de date de rédaction ni de signature.

C'est l'un des deux ou trois points qui pèsent le plus sur la manière dont un modèle de langage juge la fiabilité d'une source. Une page non datée et non signée est traitée comme une page dont on ne peut pas vérifier la fraîcheur.

Les chiffres, eux, sont datés dans le corps du texte de la maquette, ce qui est déjà très bien. Par exemple « 2 064 ha convertis à l'agroécologie fin 2024 » ou « 1 078 t de déchets interceptés dans les rivières en 2024 ».

---

## 9. Images

Dans la maquette du dépôt, seize photos JPEG et deux fichiers vectoriels.

| Constat | Détail |
|---|---|
| Balises `<img>` | Zéro. Les seize photos sont posées en fond CSS |
| Attributs `alt` | Aucun en HTML. Des textes de remplacement existent dans le tableau `ACTIONS`, mais ils ne sont utilisés que par le script |
| Chargement différé | Aucun, `loading="lazy"` n'apparaît nulle part |
| Formats modernes | Aucun, ni WebP ni AVIF, uniquement du JPEG |
| Résolution | Insuffisante sur plusieurs images. `hero.jpg` fait 1 000 × 676 pour un plein cadre, `card.jpg` 780 × 691 pour un cadre de 800 px, `depol.jpg` 560 × 560. Sur un écran Retina l'agrandissement va de deux à trois fois |
| Vidéo | `accueil.mp4`, 6,4 Mo en 854 × 480, trop petite pour un plein écran et lourde pour un forfait compté |
| Photos manquantes | Planète Urgence et Coral Guardian n'ont pas de photo validée, un aplat de couleur les remplace |

Une image de partage dédiée manque également. La balise `og:image` de la maquette pointe vers `hero.jpg`, qui est en dessous du format attendu de 1 200 × 630.

---

## 10. Liens

### Liens internes

Trente liens internes dans la maquette, tous valides. J'ai vérifié que chaque route pointée existe bien parmi les pages déclarées et parmi les huit identifiants d'action, et que les cinq ancres utilisées, `manifeste`, `main`, `m1`, `m2` et `m3`, correspondent à un identifiant présent dans le HTML. **Aucun lien interne cassé.**

Une réserve. `#/actions/pilier/<nom>` est géré par le routeur mais n'est pointé par aucun lien, c'est une route morte.

### Liens externes

Trente liens externes testés un par un.

| Code | Nombre | Lecture |
|---|---|---|
| 200 | 22 | Valides |
| 202 | 1 | EUR-Lex, valide |
| 403 | 4 | OCDE deux fois, MDPI, ScienceDirect. Ce sont des blocages anti-robot, pas des liens morts, à confirmer à la main dans un navigateur |
| 999 | 3 | Trois profils LinkedIn. Code propre à LinkedIn qui refuse les requêtes automatisées, à confirmer à la main |

**Aucun lien externe mort détecté.** Les sources citées sont de bonne qualité, INSERM, FAO, OCDE, ministère de la Transition écologique, PLOS ONE, ScienceDirect, Frontiers in Public Health, EPA, UFC Que Choisir.

Un lien mérite ton attention. La maquette renvoie vers `https://fondation.green-got.com/histoire`, qui est une page du site Lovable actuel. Si la maquette remplace ce site, ce lien casse.

---

## 11. La fiche d'identité de la Fondation, écarts constatés

C'est ici que se joue le problème de cohérence que tu as identifié. Voici les formulations réellement en place.

| Élément de la fiche | Ce que dit ta consigne | Site en ligne | Dépôt |
|---|---|---|---|
| Nom | Fondation Green-Got | Fondation Green-Got, conforme | Fondation Green-Got, conforme |
| Statut | fondation abritée par la Fondation de France | « Créée par Green-Got et abritée à la Fondation de France ». Préposition différente, « abritée à » au lieu de « abritée par » | « fonds abrité par la Fondation de France ». Le mot fondation est remplacé par le mot fonds, et l'accord suit au masculin |
| Objectif chiffré | 15 millions d'euros collectés d'ici 2030 | Absent | Absent |
| Périmètre | santé environnementale, pesticides, pollution plastique, PFAS, recherche | « agit pour la santé environnementale », plus trois combats, pesticides, pollution plastique, PFAS | « pesticides, pollution plastique et PFAS », plus « santé environnementale ». Mais la page Nos combats n'en présente que deux, pesticides et sols, pollution plastique et chimique |
| Montant cumulé | À VALIDER | Absent | Absent, et la maquette le signale elle-même, « Les montants des soutiens financiers ne sont pas publiés à ce jour » |
| Année de création | À VALIDER | Absent | Absent |
| Composition du comité | À VALIDER | Renvoi vers la FAQ Green-Got | Cinq personnes avec leur profil LinkedIn, renvoi vers la FAQ Green-Got |
| Valeurs | À VALIDER | « Indépendance, garantie par la Fondation de France », « Transparence totale sur l'usage des fonds », « 66 % de déduction fiscale pour chaque don » | Absentes sous cette forme |

Trois écarts de fond méritent une décision de ta part.

Le statut n'est écrit de la même façon nulle part. Trois formulations coexistent déjà rien que sur ces deux sites, « abritée à la Fondation de France », « fonds abrité par la Fondation de France » et celle de ta consigne, « fondation abritée par la Fondation de France ». Il faut une seule phrase et elle doit être recopiée telle quelle partout.

Le décompte des combats n'est pas stable. Le site en ligne en annonce trois, pesticides, pollution plastique et PFAS. La maquette en présente deux, pesticides et sols, pollution plastique et chimique, tout en classant les actions en trois piliers, Terre, Mer, Recherche et éducation. Un lecteur qui lit les deux ne sait pas si la Fondation mène deux combats ou trois. Le fichier `CLAUDE.md` du dépôt signale d'ailleurs ce point comme étant à trancher avant mise en ligne.

L'objectif de 15 millions d'euros d'ici 2030 n'apparaît sur aucun des deux sites. C'est pourtant l'élément le plus facilement citable par un moteur de réponse.

---

## 12. Règles éditoriales, écarts constatés

J'ai cherché chaque mot interdit dans les deux sites.

| Règle | Site en ligne | Dépôt |
|---|---|---|
| Ne jamais dire que Green-Got est une banque | **Enfreinte.** La FAQ écrit « le commerçant ou la commerçante reverse des frais à la banque qui a permis la transaction, celle de votre carte ». La carte Green-Got est donc présentée comme émise par une banque | **Enfreinte.** La page La Fondation écrit « À chaque paiement par carte, la banque touche une commission » |
| « votre banque » | Absent | Absent |
| Ne pas relier la Fondation aux cartes, paiements ou arrondis | **Enfreinte.** Quatre occurrences du mot arrondi, dont « les dons réalisés via l'arrondi avec la carte Green-Got sont déductibles » | **Enfreinte, plus sobrement.** Le financement est expliqué par la commission d'interchange sur la page La Fondation, avec un lien vers le règlement européen qui la plafonne |
| Aucun bouton d'ouverture de compte | Conforme, aucune occurrence de « ouvrir un compte » | Conforme |
| Lien vers green-got.com discret | Un seul lien vers `green-got.com` | Conforme, un lien en pied de page et un sur la page La Fondation |
| Mots proscrits, éco responsable, durable seul, petit geste, empreinte carbone, geste pour la planète | Je n'en ai trouvé aucun | Je n'en ai trouvé aucun |
| Chiffres sourcés | Partiel, la plupart des chiffres du site en ligne n'ont pas de lien vers leur source | Conforme, chaque chiffre porte un lien vers sa source primaire |
| Pas de deux points ni de tirets dans les textes français | Le titre de page contient un tiret cadratin | Le dépôt applique déjà cette règle, `CLAUDE.md` l'écrit noir sur blanc |

Les autres occurrences du mot banque sont légitimes et servent le positionnement, elles désignent les banques tierces. Par exemple « le crédit bancaire, les filières d'approvisionnement et la logistique se renforcent mutuellement », ou « Les banques finançaient le bâti et le matériel, pas les terres ». Je ne les compte pas comme des infractions.

Le positionnement de la maison est bien tenu dans les deux, « La Fondation Green-Got finance les combats que le système bancaire ignore ».

---

## 13. Écart entre l'existant et l'arborescence cible

| Page cible | Existe en ligne | Existe dans le dépôt | À faire |
|---|---|---|---|
| Accueil | Oui | Oui | Reprendre |
| La Fondation | Oui, sous le nom Histoire | Oui | Reprendre et fusionner |
| Faits et chiffres, en questions et réponses | Contenu présent, six questions, mais pas de page dédiée ni de balisage | Non | À créer |
| Projets, page index | Oui, Nos combats | Oui, Les actions | Reprendre |
| Projets, une page par projet | Non, seulement trois pages de combat | Oui, huit fiches, mais construites par script | À rendre lisibles sans script |
| Évènements | Non | Oui, quatre rendez-vous | Reprendre |
| Publications ou Actualités, articles datés et signés | Oui, Productions, sans dates ni auteurs | Non | À créer |
| Mentions légales | Non | Oui, à faire valider par le juridique | Reprendre |
| Politique de confidentialité | Non | Oui, à faire valider par le juridique | Reprendre |
| Contact | Oui, Contacter | Non | À créer |

Sur les huit fiches projet, voici ce qui manque au regard de ta consigne, qui demande un nom de personne, un lieu, une date, un chiffre daté et sa source, et un lien vers le site du partenaire.

| Projet | Nom de personne | Lieu | Chiffre daté et sourcé | Lien partenaire |
|---|---|---|---|---|
| FEVE, Fermes En Vie | Oui, Kévin, Bastien, Chloé, Simon Bestel | France, réseau de fermes | Oui, fin 2024 | feve.co |
| Planète Urgence | À VALIDER | Delta de la Mahakam, Indonésie | À vérifier | À VALIDER |
| Sungai Watch | À vérifier | Bali, Indonésie | Oui, 2024 | sungaiwatch.com |
| Wings of the Ocean | À vérifier | Littoraux et fleuves | À vérifier | À VALIDER |
| Fondation Tara Océan | À vérifier | Expéditions | À vérifier | fondationtaraocean.org |
| Coral Guardian | À VALIDER | À vérifier | À vérifier | À VALIDER |
| The Shift Project | À vérifier | France | À vérifier | À VALIDER |
| École de la Réparation | À vérifier, vingt élèves cités | Roubaix | Oui, 45 000 cordonniers en 1950 contre 3 500 aujourd'hui | À VALIDER |

Je détaillerai fiche par fiche en phase 2. Aucune donnée manquante ne sera comblée par une estimation, elle portera la mention « À VALIDER » en clair dans la page.

---

## 14. Performance, accessibilité, responsive

Je n'ai pas mesuré de score Lighthouse, l'outil n'est pas installé sur ce poste. Je l'installerai en phase 3 pour mesurer avant et après. Voici ce que l'analyse du code laisse attendre.

Sur le site en ligne, un fichier JavaScript de 511 Ko doit être téléchargé et exécuté avant qu'un seul mot s'affiche. Le score de performance mobile et le score SEO seront mécaniquement bas.

Sur la maquette du dépôt, le HTML est servi d'un bloc, ce qui est rapide, mais il pèse 320 Ko avec tout le CSS et tout le JavaScript en ligne, et il embarque deux fonds de carte géographiques complets. Une vidéo de 6,4 Mo se déclenche sur l'accueil, avec une garde correcte pour les connexions lentes et pour les personnes qui réduisent les animations.

Côté accessibilité, la maquette a déjà fait un vrai travail. Une passe de correction du 9 septembre 2026 a remonté six rôles de texte qui passaient sous le rapport de contraste de 4,5 pour 1, les marqueurs de la carte sont retirés du parcours clavier au profit de l'index, un lien d'évitement est présent, le menu se ferme à la touche d'échappement et le titre reçoit le focus à chaque changement de page. Les points faibles restants sont l'absence totale de textes de remplacement sur les images et l'absence de date et d'auteur.

Le responsive est traité, la branche `passe-responsive` est justement là pour ça, avec des ruptures à 1 180 px et 620 px. Je testerai à 360 px, 768 px et 1 440 px en phase 3.

---

## 15. Redirection depuis le domaine principal

Ta note indique que `green-got.com/fondations` redirige en 302 et doit passer en 301. **J'ai vérifié, elle est déjà en 301.**

```
curl -D - -o /dev/null -L https://green-got.com/fondations

HTTP/2 301 
location: https://fondation.green-got.com
HTTP/2 200 
```

La redirection est permanente et se fait en un seul saut. `green-got.com/fondation` au singulier répond également 301. Ce point est donc réglé et n'a pas besoin d'être porté au plan. Un détail mineur subsiste, la destination est écrite sans barre oblique finale, ce qui est sans conséquence ici.

---

## 16. Synthèse des dix constats qui coûtent le plus

1. Le site public ne sert aucun contenu éditorial à un robot, zéro caractère sur 1 887 octets, et le meilleur contenu de la Fondation dort dans un dépôt qui n'est pas publié.
2. Aucune donnée structurée sur le site public, alors qu'il contient une foire aux questions toute rédigée qui ne demande qu'à être balisée en FAQPage.
3. Aucune page du site public n'a de titre ni de description propres, les neuf adresses partagent les mêmes.
4. Aucune date et aucun auteur nulle part, ce qui est le signal de fiabilité le plus lourd pour un moteur de réponse.
5. Ni sitemap.xml ni llms.txt, et un robots.txt qui n'ouvre explicitement à aucun robot d'IA.
6. Le statut de la Fondation est écrit de trois façons différentes rien que sur ces deux sites.
7. Le nombre de combats n'est pas stable, deux d'un côté, trois de l'autre.
8. L'objectif de 15 millions d'euros d'ici 2030 n'est écrit nulle part.
9. Les deux sites relient la Fondation à la carte et aux commissions de paiement, et le site public écrit que la carte Green-Got est émise par une banque.
10. Une adresse inexistante répond 200 au lieu de 404, ce qui fabrique des pages fantômes dans l'index des moteurs.

---

## 17. Ce que j'ai besoin de toi pour ouvrir la phase 2

| Question | Pourquoi |
|---|---|
| On part de la maquette du dépôt ou du site Lovable | C'est la décision qui commande tout le plan de migration |
| La branche `passe-responsive` est-elle la bonne base | Elle est meilleure que `main` sur le responsive, les contrastes et la vie privée, mais elle n'est pas fusionnée |
| Deux combats ou trois | Le texte des pages et le balisage en dépendent |
| Phrase exacte du statut, mot pour mot | Je la recopierai à l'identique partout |
| Année de création de la Fondation | Pour `foundingDate` et pour la page La Fondation |
| Montant cumulé versé et date d'arrêté | Pour la page Faits et chiffres |
| Adresse de la fiche annuaire Fondation de France | Pour `sameAs`, celle que j'ai testée est en 404 |
| Adresse de la page LinkedIn de la Fondation | Pour `sameAs` |
| Composition du comité, noms et rôles | Cinq personnes figurent dans la maquette, à confirmer |
| Nom de l'auteur à afficher sur les pages | Toi, l'équipe, ou une personne par page |
| Les montants par projet peuvent-ils être publiés | La maquette a prévu la ligne et la laisse vide |
| Le formulaire de candidature reste-t-il externe | Il est aujourd'hui sur `candidaturefondation.green-got.com` |

---

*Fin de la phase 1. Je m'arrête ici et j'attends ta validation avant de produire PLAN.md.*
