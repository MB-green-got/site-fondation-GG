# Site de la Fondation Green‑Got

Maquette fonctionnelle du nouveau site fondation.green-got.com, livrée sous forme d'un seul fichier `index.html` avec ses assets. Tout est déjà écrit, dessiné et testé sur desktop et mobile. Ce dépôt sert de point de départ pour l'intégration dans la stack de Green‑Got.

## Ce qu'il y a

`index.html` contient le CSS, le HTML de toutes les pages et le JS (routeur, carte, rendu des fiches). Les images sont dans `assets/img`, la police Terrane Sans dans `assets/fonts`. Aucun tracker, aucune librairie tierce. Seule dépendance externe, la police de texte Instrument Sans chargée depuis Google Fonts, ce qui transmet l'adresse IP du visiteur à Google, signalé comme tel dans la politique de confidentialité et à arbitrer avant mise en ligne, l'héberger avec Terrane Sans dans `assets/fonts` supprime l'appel. Ouvrir le fichier dans un navigateur suffit pour tout voir.

Le logo de la Fondation est le renard qui court, en vert `#CDFB6E` sur fond sombre. Il existe en trois formes, toutes issues du même tracé vectoriel. `assets/img/logo-fondation.svg` est le fichier autonome à donner aux intégrateurs et à la communication. `assets/img/favicon.svg` le pose sur un carré sombre arrondi pour l'onglet du navigateur. Dans `index.html`, la variable CSS `--fox-run` contient le même tracé en `currentColor`, utilisé comme masque pour la marque du header (`.brand .mark`, suivi du nom « Fondation Green‑Got » en texte) et pour le pied de page (`footer .fox`), ce qui permet de le colorer avec les variables du thème. Les variables `--logo` (logotype Green‑Got) et `--fox` (ancien renard vertical du logotype) restent définies mais ne sont plus affichées, le logotype contenant déjà un renard, les deux côte à côte faisaient doublon. `assets/img/fox.jpg` est la source basse résolution à partir de laquelle le tracé a été vectorisé, à remplacer par le fichier vectoriel officiel de la marque dès réception.

Pages et routes (routeur par hash dans `index.html`)

| Route | Page | Rôle |
|---|---|---|
| `#/` | Accueil | Un seul écran, vidéo plein cadre, accroche, un bouton « Découvrir la Fondation » |
| `#/combats` | Nos combats | Deux combats, pesticides et sols, pollution plastique et chimique, le raisonnement chiffré et sourcé |
| `#/actions` | Les actions | Carte France plus monde, huit fiches |
| `#/actions/<id>` | Fiche action | Une par association, rendue depuis le tableau `ACTIONS` dans le JS |
| `#/evenements` | Évènements | Le rendez‑vous du 17 septembre, la FAQ pratique, les rendez‑vous suivants |
| `#/fondation` | La Fondation | Gouvernance, garanties, cadre juridique |
| `#/associations` | Associations | Critères et candidature |
| `#/mentions-legales`, `#/confidentialite` | Légal | Textes à faire valider par le juridique |

## Règles éditoriales à respecter dans toute modification

Jamais de « : » ni de « - » dans les textes affichés (la typographie utilise des virgules, des points, des « · » ou des « ‑ » insécables pour Green‑Got). Écriture humaine, pas de formulation générique. Chaque chiffre affiché renvoie vers sa source (rapports annuels des associations, liens présents dans le HTML). Aucun chiffre ne doit être ajouté sans source. Le site ne dit jamais « financé par les membres » ni « votre argent », la Fondation finance, Green‑Got la crée.

Positionnement à conserver, celui du site actuel, « La Fondation Green‑Got finance les combats que le système bancaire ignore ».

## Points d'attention pour l'intégration

La vidéo de fond de l'accueil est celle du site actuel, copiée dans `assets/video/accueil.mp4` (854 × 480, 33 s, survol d'un verger). Elle est branchée dans `.fullhero.solo` via `video.fh-video`, la photo `div.fh-poster` avec son lent zoom CSS (`.kb`) reste dessous et prend le relais si la vidéo ne joue pas ou si l'utilisateur a réduit le mouvement. Remplacer le fichier par le master HD dès qu'il est disponible, la résolution actuelle est juste pour un plein écran.

Plusieurs contenus de la page Fondation sont repris de la page « Histoire » du site actuel et de la FAQ Green‑Got. La part du chiffre d'affaires reversée (5 à 10 %), les arrondis et le total collecté (près de 2 millions d'euros depuis 2022) sont sourcés sur `fondation.green-got.com/histoire`, à remplacer par le rapport annuel avant mise en ligne. La gouvernance du comité (collèges, vote, réunion au moins annuelle, bénévolat) est sourcée sur `faq.green-got.com`. Les profils LinkedIn des cinq administrateurs sont ceux publiés sur le site actuel. Le formulaire de candidature est `candidaturefondation.green-got.com`. Les réseaux du pied de page reprennent ceux du site actuel, Instagram `fondation_green_got` et YouTube `@green-got`, à confirmer car deux autres comptes apparaissent dans le code du site actuel (`fondationgreengot`).

`assets/img/forest.jpg` est la photo de forêt du site actuel, récupérée en 900 × 1200. Elle est déclarée en `--img-forest` et rattachée à Planète Urgence, mais l'aplat `noimg` la masque tant que la photo de l'association n'est pas validée.

La page Nos combats reprend du site actuel l'argument « on paie deux fois, en banque puis en santé », réécrit sans « votre argent », le constat de l'Inserm 2021 (présomption forte pour six pathologies, sourcé sur inserm.fr), le paragraphe sur la recherche qui avance trop lentement, et deux chiffres resourcés, le lait maternel (Ragusa et al., Polymers, 2022, 26 échantillons sur 34) et les 12 000 substances PFAS (liste PFASMASTER de l'US EPA). Les chiffres du site actuel qui n'ont pas de source solide n'ont pas été repris (65 000 t de pesticides en France, 60 % des fruits, 8 Mt de plastique par an, 4 millions de tonnes). La page Associations reprend le délai de réponse d'un mois et la durée habituelle d'un an du soutien, la fiche FEVE reprend le portrait de Simon Bestel.

Volontairement laissé de côté du site actuel, les pages `/productions` et `/contacter` qui ne sont pas dans sa navigation. Les deux documentaires qu'elles décrivent (« Les Rivières Mortes », « Éternels ») n'existent pas ailleurs, l'adresse `contact@fondation-greengot.org` est sur un domaine qui ne résout pas, le bandeau « des milliers de personnes soutiennent déjà » est généré par le code, et le formulaire newsletter n'est branché sur rien. Si la Fondation veut une adresse de contact et une newsletter sur le nouveau site, il faut les créer.

Planète Urgence et Coral Guardian n'ont pas encore de photo validée, leurs fiches affichent un aplat coloré (`a.noimg` dans `ACTIONS`). Remplacer par les vraies images dès réception, puis retirer `noimg`.

Les liens d'inscription aux évènements pointent vers des URL à confirmer avec l'équipe évènements. Le fichier `assets/depollution-seine-2026-09-17.ics` et le lien Google Agenda du bouton « Ajouter à mon agenda » portent la date en dur, les deux sont à refaire à chaque nouvel évènement.

La barre du haut porte la marque, les quatre rubriques (Combats, Actions, Évènements, La Fondation) et, à droite, le lien « Vous êtes une association ? ». Sous 1080 px les rubriques passent dans un panneau ouvert par le bouton « En savoir plus », posé sous le bouton au‑dessus de 720 px et bandeau pleine largeur en dessous. Le lien association quitte la barre sous 560 px et est repris dans le panneau (`a.masso`). L'accueil n'a aucune barre (`body[data-route=accueil] .topbar{display:none}`), on entre dans le site par le bouton « Découvrir la Fondation » qui mène à `#/fondation`. Aucun CTA évènement ne figure plus dans la barre, le seul bouton d'inscription est sur la page Évènements.

Le vocabulaire n'est pas encore stabilisé. L'accueil annonce « 3 combats », la page Nos combats en présente deux (pesticides et sols, pollution plastique et chimique), et le tableau `ACTIONS` classe les huit projets en trois piliers (Terre, Mer, Recherche et éducation), qui servent aussi de légende à la carte. À trancher avant mise en ligne, soit l'accueil compte les piliers et le dit, soit il compte les combats et affiche deux.

La carte est un SVG dessiné depuis deux GeoJSON inclus dans la page (`#geo-world`, `#geo-fr`). Elle ne dépend d'aucune librairie.

## Ce qui reste à faire côté production

Découper `index.html` en composants de la stack choisie (le HTML par page est déjà séparé dans des `<article data-page="…">`). Remplacer le routeur par hash par de vraies URL. Le bouton de candidature des associations pointe vers le formulaire existant `candidaturefondation.green-got.com`, à intégrer dans le site si l'équipe le souhaite. Faire valider les mentions légales et la politique de confidentialité. Brancher le suivi analytique conforme à la politique de Green‑Got, aucun n'est installé.
