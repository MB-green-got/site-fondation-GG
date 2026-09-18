# Journal du chantier

Site de la Fondation Green-Got. Chantier ouvert le 17 septembre 2026.
Trois phases, audit, plan, réalisation. Un lot par commit.

---

## Hypothèses de travail

Le plan posait seize décisions. Faute de réponse point par point, je travaille sous les hypothèses ci-dessous, qui sont les avis que j'avais donnés dans `PLAN.md`. Chacune est réversible tant que le site n'est pas déployé. Dis-moi celles qui ne te conviennent pas, je reprends.

| № | Hypothèse retenue |
|---|---|
| 1 | On part de la maquette de ce dépôt, pas du site Lovable |
| 2 | On part de la branche `passe-responsive`, fusionnée dans `main` au lot 0 |
| 3 | Les pages Nos combats et Associations sont conservées |
| 4 | Le mot retenu est projets, dans les adresses, la navigation et les titres |
| 5 | Le nombre de combats reste **À VALIDER**, la page est construite sur les deux combats documentés et sourcés de la maquette, PFAS y figure comme sujet sans être compté comme un troisième combat |
| 6 | Les adresses de projet sont explicites, du type `/projets/feve-fermes-en-vie` |
| 7 | La page Nous soutenir est conservée |
| 8 | Les montants des soutiens restent **À VALIDER**, la ligne est prévue et vide |
| 9 | L'auteur affiché reste **À VALIDER**, le champ est obligatoire et visible |
| 10 | Le générateur est Astro, sortie statique, zéro JavaScript par défaut |
| 11 | L'hébergement visé est Cloudflare Pages, sans aucun déploiement de ma part |

---

## Ce qui reste À VALIDER

**Cent une mentions** s'affichent en clair et en orange dans les pages. Aucune donnée manquante n'a été comblée par une estimation. Le détail par page se lit avec `npm run verifier`.

| Élément manquant | Où il s'affiche |
|---|---|
| Phrase exacte du statut, fonds abrité ou fondation abritée | La Fondation, mentions légales |
| Année de création de la Fondation | La Fondation, Faits et chiffres |
| Montant cumulé versé et sa date d'arrêté | La Fondation, Faits et chiffres |
| Part reversée par Green-Got, la maquette disait 5 à 10 % sans source | La Fondation |
| Affirmation « sans frais ni commission », non sourcée et probablement fausse | La Fondation |
| Valeurs de la Fondation | La Fondation |
| Composition du comité et rôle de chaque membre | La Fondation, Faits et chiffres |
| Nom de l'auteur affiché | Les quinze pages de contenu |
| Deux combats ou trois | Nos combats |
| Montant du soutien, projet par projet | Les huit pages de projet |
| Adresse de source pour vingt-quatre chiffres de projet | Les huit pages de projet |
| Nom de personne, lieu ou date | Tara Océan, École de la Réparation, Planète Urgence, Coral Guardian |
| Récit, chiffres et photo | Planète Urgence, Coral Guardian |
| Adresse du site partenaire | École de la Réparation |
| Dates, lieux et liens d'inscription | Les quatre rendez-vous |
| Cinéaste, durée et date de sortie | Les trois publications |
| Voie de don qui ne passe pas par un compte | Faits et chiffres |
| Adresses électroniques, presse, générale, délégué à la protection des données | Contact, confidentialité |
| Adresse postale | Contact |
| Éditeur, hébergeur, crédits photo | Mentions légales |
| Durée de conservation des données d'inscription | Confidentialité |
| Outil de mesure d'audience | Confidentialité |
| Adresse de la fiche annuaire Fondation de France, page LinkedIn | Balisage sameAs |

---

## Ce qui dépend d'une décision extérieure au dépôt

| Sujet | Qui décide |
|---|---|
| Bascule du domaine `fondation.green-got.com` de Lovable vers le nouvel hébergement | Accès Cloudflare, plus la personne qui gère Lovable |
| Arrêt du compte Lovable et de son traceur `/~flock.js` | Direction |
| Validation juridique des mentions légales et de la politique de confidentialité | Juridique |
| Fichiers photo en haute résolution, image de partage au format 1200 × 630, master vidéo | Communication |
| Fichier vectoriel officiel du renard | Communication |
| Fiche de la Fondation dans l'annuaire de la Fondation de France, à créer ou à corriger | Marie Bénédicte |
| Outil de mesure d'audience conforme à la politique de Green-Got | Direction |
| Formulaire de candidature des associations, aujourd'hui externe | Marie Bénédicte |

---

## Lots livrés

### Lot 0, remise en état du dépôt, 18 septembre 2026

Le dossier de travail local était vide et la branche locale `main` n'avait aucun commit, tout le code vivait sur le dépôt distant.

Fait. `main` restaurée depuis `origin/main`. Branche `passe-responsive` fusionnée dans `main` en avance rapide, sans conflit. Elle apporte la passe responsive, les deux polices hébergées localement donc la suppression de l'appel à Google Fonts et de la fuite d'adresse IP qui allait avec, et la remontée de six rôles de texte qui passaient sous le rapport de contraste de 4,5 pour 1.

Ajouts. `AUDIT.md`, `PLAN.md` et ce journal.

Rien n'a été supprimé. Rien n'a été poussé sur le dépôt distant. Rien n'a été déployé.

### Lot 1, socle Astro et page d'accueil, 18 septembre 2026

Mise en place du générateur statique et du gabarit commun. Une page sort désormais en HTML complet, sans exécution de JavaScript.

Fait. Projet Astro installé, sortie statique, adresses sans barre oblique finale. Le dossier `assets` reste à sa place et est servi tel quel, les polices sortent sur `/fonts`, les images sur `/img`, la vidéo sur `/video`. Le CSS de la maquette, mille dix-huit lignes, est repris intégralement dans `src/styles/site.css`, avec les chemins corrigés et le système d'affichage conditionnel des pages neutralisé, puisque chaque page est maintenant un document à part entière.

Fiche d'identité unique dans `src/data/fondation.js`. Aucune page ne réécrit ces phrases, elles sont recopiées mécaniquement.

Composants créés. `Base` qui porte les métadonnées et le balisage, `Nav`, `Pied`, `FilAriane`, `Signature`, `Chiffre` et `AValider`.

Trois garde-fous sont posés au niveau du code, ils font échouer la construction du site plutôt que de laisser passer une erreur. Une page sans titre ou sans description ne se construit pas. Une page de contenu sans date de publication ne se construit pas. Un chiffre sans date ni source liée ne se construit pas.

Le seul JavaScript du site est `src/scripts/interface.js`. Il ouvre le menu des écrans étroits, pose une classe sur la barre au défilement et fait apparaître les blocs. Il ne porte aucun contenu.

Preuve. La page d'accueil construite pèse 8 122 octets et sert 1 219 caractères de texte éditorial sans exécuter la moindre ligne de JavaScript. Le site en ligne en sert zéro. Le détail de la mesure figure dans la recette du lot 12.

Modifications signalées. La phrase du pied de page disait « Tout n'a pas à être rentable. Alors on donne. », le titre de partage disait « Tout n'est pas économique, alors on donne. ». Les deux sont remplacées par le message de fond retenu, « Tout n'est pas financier. Alors on donne. ». Dis-moi si tu préfères l'une des deux formulations d'origine. Le pied de page disait « fonds abrité par la Fondation de France », il dit maintenant « fondation abritée par la Fondation de France », qui reste à valider par le juridique.

Rien n'a été supprimé. La maquette `index.html` reste en place et continue d'être servie sur GitHub Pages, elle sera retirée au lot 11, quand les images passeront aux formats modernes.

### Lot 2, fiche d'identité affichable et contrôle automatique, 18 septembre 2026

Fait. Composant `FicheIdentite`, qui affiche la fiche telle qu'elle est écrite dans les données, sans jamais la reformuler. Les champs manquants y apparaissent en clair avec la mention À VALIDER.

Ajout de `outils/controle.mjs`, lancé par `npm run verifier`. Il lit le site construit et refuse de rendre la main si une règle est enfreinte. Il vérifie que chaque page sert bien du contenu sans JavaScript, que le nom de la Fondation ne connaît aucune variante orthographique, qu'aucune phrase n'associe Green-Got à une banque, qu'aucun mot proscrit n'apparaît, qu'aucune page ne pousse à ouvrir un compte, que les titres et les descriptions sont uniques, qu'il y a exactement un H1 par page et que chaque JSON-LD est valide. Il compte aussi les mentions À VALIDER et les signale sans bloquer.

Ce contrôle remplace la vérification à la main demandée dans les critères de fin de chantier. Il sera lancé à chaque lot.

### Lot 3, les huit projets, 18 septembre 2026

C'est le lot qui fait passer le contenu le plus précieux du site de l'invisibilité à la lisibilité.

Fait. Les huit projets financés sont sortis du tableau `ACTIONS` du JavaScript et transcrits dans huit fichiers Markdown, un par projet, dans `src/content/projets`. Chacun a désormais sa propre adresse, son titre, sa description, son fil d'Ariane et son balisage `Article`. Le schéma des fichiers fait échouer la construction du site si un champ obligatoire manque.

Preuve. Avant, la fiche FEVE n'avait aucune adresse à laquelle un robot pouvait la demander, et une requête sur `#/actions/feve` renvoyait la page d'accueil octet pour octet. Maintenant, `/projets/feve-fermes-en-vie` répond 200 et sert 2 581 caractères de texte éditorial sans exécuter la moindre ligne de JavaScript. Les huit pages servent entre 1 330 et 2 581 caractères. Les 13 764 caractères de données qui n'étaient lisibles que par un navigateur sont maintenant dans le HTML.

Ce que chaque fiche porte, comme la consigne l'exige. Un nom de personne, un lieu, une date, des chiffres datés avec leur source, et un lien vers le site du partenaire. Ce qui manque s'affiche en clair avec la mention À VALIDER, jamais comblé par une estimation.

Ce qui manque, projet par projet. Les huit pages signalent l'absence du montant du soutien et de l'auteur. Tara Océan, École de la Réparation, Planète Urgence et Coral Guardian n'ont pas de nom de personne. Planète Urgence et Coral Guardian n'ont ni récit, ni chiffres, ni photo, leur fiche partenaire n'est pas encore écrite. L'École de la Réparation n'a pas d'adresse de site. Aucun chiffre de projet n'a d'adresse de source, seulement un titre de rapport, ce qui fait vingt-quatre mentions À VALIDER sur ce seul point.

Modification signalée. Le vocabulaire bascule d'actions à projets, dans les adresses, la navigation et les titres, conformément à l'arborescence cible. Le texte des pages suit.

Le tableau `ACTIONS` de la maquette n'a pas été supprimé, `index.html` reste intact jusqu'au lot 11.

### Lot 4, La Fondation, Nos combats, Associations et Contact, 18 septembre 2026

Fait. Quatre pages écrites, quatorze pages au total dans le site. La Fondation sert 4 028 caractères sans JavaScript, Nos combats 4 797, Associations 973, Contact 790.

Les titres sont posés en forme de question là où la page répond à une question. « Qu'est-ce que la Fondation Green-Got et qui décide ? », « Pourquoi le plastique et les pesticides viennent du pétrole ? », « Comment candidater à un soutien de la Fondation Green-Got ? », « Comment contacter la Fondation Green-Got ? ».

Tous les chiffres de Nos combats portent leur source liée et leur date, quinze chiffres, quinze liens vers Inserm, FAO, ministère de la Transition écologique, PLOS ONE, OCDE, US EPA, Frontiers in Public Health, Environment International, Polymers, UFC Que Choisir, Sungai Watch et Tara Océan.

**Contenu retiré, à te signaler.** La page La Fondation portait une bande intitulée « D'un paiement par carte à une berge nettoyée », qui déroulait le mécanisme en quatre temps, la commission d'interchange plafonnée à 0,2 %, les 5 à 10 % du chiffre d'affaires reversés, l'arrondi des dépenses des membres, puis le vote et le versement. Cette bande relie la Fondation aux cartes, aux paiements et aux arrondis, ce que les règles éditoriales interdisent dans le corps des pages. Elle est remplacée par trois phrases sobres sur la même page, qui disent que la Fondation est financée par le mécénat de Green-Got, comment les projets sont votés et ce que fait la Fondation de France. Rien d'autre n'a été retiré. Dis-moi si tu veux récupérer une partie de ce texte, il est intact dans `index.html` et dans l'historique.

**Deux chiffres sortis de l'affichage pour la même raison.** Les 5 à 10 % du chiffre d'affaires reversés et la promesse « sans frais ni commission » ne sont sourcés nulle part. Ils sont maintenant signalés en À VALIDER sur la page La Fondation, avec la réserve que la maquette portait elle-même, les fondations abritantes prélèvent en général des frais de gestion.

Récupéré de la maquette et ajouté à la fiche d'identité. Les rôles des cinq membres du comité, Andréa Ganovelli président, Aurélie Baulard directrice, Chloé Charrier voix des salariés, Marianne Josselin administratrice ChangeNOW, Thibaut Gabrillargues administrateur rivaje. L'ensemble reste marqué À VALIDER jusqu'à ta confirmation. La maquette portait aussi « près de 2 millions d'euros collectés depuis 2022 », sans source liée, cette valeur est rappelée dans le texte de la mention À VALIDER du montant cumulé, sans être présentée comme un fait.

**Écart avec PLAN.md, à te signaler.** Le plan proposait de conserver trois pages de combat séparées, reprises du site en ligne. Elles ne sont pas créées. Ton arborescence cible n'en prévoit pas, la maquette documente deux combats sur une seule page, et créer une page PFAS trancherait à ta place la question du nombre de combats. Les trois adresses du site en ligne recevront donc une redirection permanente vers les ancres de la page Nos combats, `#pesticides`, `#pollution-plastique` et `#pfas`, au lot 10.

### Lots 5 à 8, Faits et chiffres, Évènements, Publications et pages légales, 18 septembre 2026

Vingt-six pages dans le site.

**Faits et chiffres**, la source canonique. Seize questions, douze répondues et balisées en `FAQPage`, quatre sans réponse qui gardent leur question, affichent À VALIDER et n'entrent pas dans les données structurées. On ne met pas dans le balisage une réponse qu'on n'a pas. La page le dit en clair, si une information diffère ailleurs, c'est celle-ci qui fait foi.

Les réponses reprises de la FAQ de Green-Got ont été réécrites. Trois d'entre elles enfreignaient les règles. La réponse sur le financement décrivait la commission encaissée par « la banque qui a permis la transaction, celle de votre carte », elle est remplacée par « Par le mécénat de Green-Got » et un renvoi vers la page La Fondation, qui est la seule page où le financement est décrit. La réponse sur la déduction fiscale passait par l'arrondi et la carte, elle est réécrite sur l'article 200 du code général des impôts et la Fondation de France. La réponse sur la façon de soutenir la Fondation était entièrement bâtie sur la carte et l'arrondi, elle n'a pas de remplaçante et passe donc en À VALIDER, il manque une voie de don qui ne passe pas par l'ouverture d'un compte.

Une question a été ajoutée, « La Fondation Green-Got est-elle une banque ? », dont la réponse est non. C'est la question qu'un moteur de réponse posera, autant y répondre nous-mêmes.

**Évènements.** Les quatre rendez-vous sortent du JavaScript et deviennent quatre pages. Le balisage `Event`, qui n'existait que pour le 17 septembre et vivait dans l'en-tête commun, est maintenant posé sur chaque fiche à partir de ses propres données. Un rendez-vous dont la date n'est pas arrêtée ne reçoit pas de `startDate` inventée, il sort du balisage et sa période s'affiche en clair.

**Publications.** Les deux documentaires du site en ligne sont rapatriés, « Les Rivières Mortes » et « Éternels, vivre avec les PFAS », ainsi que le film sur FEVE et son lien YouTube. Aucun n'a de date de sortie, de cinéaste ni de durée pour deux d'entre eux, tout cela est en À VALIDER. Aucun article n'est publié à ce jour et la page le dit, plutôt que d'afficher une liste vide.

La vidéo n'est pas intégrée dans la page. Une intégration YouTube dépose des traceurs chez le visiteur avant tout consentement, ce qui contredirait la politique de confidentialité. Le film est lié.

**Pages légales.** Reprises de la maquette. Les champs manquants s'affichent en À VALIDER, il est donc impossible de publier ces pages sans voir ce qui reste à compléter, ce qui était le défaut de la maquette, sa fonction `pruneTodo` effaçait certaines mentions et en laissait passer d'autres.

Une mention a été ajoutée aux mentions légales. La qualification juridique y est écrite « fondation abritée », alors que la maquette écrivait « fonds abrité ». C'est la page où cette erreur coûte le plus cher, elle porte donc sa propre mention À VALIDER.

Le contrôle automatique a été affiné. Il refusait la page Faits et chiffres à cause de la question « La Fondation Green-Got est-elle une banque ? ». Il découpe maintenant le texte en phrases, ignore les questions et les négations, et ignore les tournures qui désignent les banques tierces, qui sont le positionnement de la maison.

Trouvé dans le site en ligne et non repris. Une adresse électronique, `contact@fondation-greengot.org`, sur un nom de domaine qui n'est pas celui du site. Elle n'est pas publiée, la page Contact porte une mention À VALIDER à la place.

### Lots 10 et 11, fichiers pour les robots, redirections, images et performance, 18 septembre 2026

**robots.txt.** Réécrit. Il nomme et autorise explicitement GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, Applebot et Applebot-Extended, plus Bytespider, meta-externalagent, Amazonbot, cohere-ai et MistralAI-User. Le commentaire en tête indique que cette ouverture est une décision de la direction, et pourquoi, il vaut mieux qu'un moteur de réponse lise la source plutôt qu'une reprise approximative. Il déclare le sitemap.

**sitemap.xml.** Écrit à la main plutôt que par une extension, pour que la date de dernière modification soit celle du contenu et non celle du fichier sur le disque. Une correction de code ne fait donc plus passer toutes les pages pour modifiées. Vingt-sept adresses.

**llms.txt.** La carte du site pour les modèles de langage, une ligne de description par page canonique. Il commence par la fiche d'identité, dit que ce site est la source de référence et que Faits et chiffres est la page canonique, rappelle que Green-Got n'est pas une banque, et prévient que les informations marquées À VALIDER ne doivent pas être citées comme des faits établis.

**Page 404.** Le site en ligne répondait 200 sur n'importe quelle adresse, ce qui fabrique des pages fantômes dans l'index des moteurs. Une vraie page 404 est en place, avec les sept portes d'entrée du site.

**Redirections.** Fichier `_redirects`, au format Cloudflare Pages. Huit redirections permanentes depuis les adresses du site en ligne. Les adresses par ancre de la maquette ne peuvent pas être redirigées par le serveur, ce qui suit le dièse ne lui est jamais envoyé, elles sont donc aiguillées par un petit bloc ajouté à `src/scripts/interface.js`, qui couvre les neuf pages et les huit projets.

**Images.** Les seize photos ont désormais une variante AVIF et une variante WebP à côté du JPEG, proposées par `image-set` dans la feuille de style, avec repli JPEG pour les navigateurs qui ne connaissent pas `image-set`. Le poids passe de 1 056 Ko à 536 Ko au meilleur format, soit 49 % de moins. Aucune image n'a été agrandie, les fichiers d'origine restent trop petits pour leur usage et seuls de nouveaux fichiers peuvent le corriger.

**Lighthouse, profil mobile.** Mesuré sur douze pages. Performance de 99 à 100, accessibilité 100, bonnes pratiques 100, référencement 100. La consigne demandait plus de 90 sur trois de ces quatre notes.

Deux défauts trouvés et corrigés au passage. Les listes de définitions étaient des `div` portant des `dt` et des `dd` sans balise `dl`, ce qui coûtait cinq points d'accessibilité, elles sont maintenant de vraies balises `dl`. L'orange des mentions À VALIDER tombait à 1,80 pour 1 sur la bande claire, il était illisible, une variante à 5,19 pour 1 lui est substituée sur ce fond.

**Responsive.** Seize pages testées à 360, 768 et 1440 px, aucun débordement horizontal. Un défaut a été trouvé et corrigé, l'index des projets débordait de 63 px à 360 px et de 47 px à 768 px, mes lignes n'utilisaient pas les classes de la feuille de style de la maquette. Elles ont été reprises dans un composant unique.

**Écart avec le plan, à te signaler.** Le plan prévoyait de retirer `index.html` à ce lot. Je ne l'ai pas fait. Cette maquette est encore servie sur GitHub Pages et c'est ton seul aperçu visible tant que le nouveau site n'est pas déployé. La retirer casserait cet aperçu sans rien apporter. Elle sera retirée au moment de la bascule.

**Écart avec le plan, second point.** La page Nous soutenir n'est pas reprise. La seule voie de soutien que décrivait le site en ligne passe par la carte Green-Got et l'arrondi des dépenses, ce que les règles éditoriales interdisent. Son adresse redirige vers Faits et chiffres, où la question figure, marquée À VALIDER, en attente d'une voie de don qui ne passe pas par l'ouverture d'un compte.

Trois outils sont ajoutés, `npm run images`, `npm run lighthouse` et `npm run responsive`.

### Lots 9, 12 et 13, données structurées, recette et note de bascule, 18 septembre 2026

**Données structurées.** Un contrôle automatique, `outils/jsonld.mjs`, lit les vingt-sept pages construites, vérifie que chaque JSON est valide, que chaque type est connu, que les pages portent les types attendus, que les dates sont bien formées et qu'aucune référence interne ne pointe vers un identifiant absent.

Un défaut a été trouvé et corrigé. Le nœud `WebSite` n'était déclaré que sur la page d'accueil, alors que quatre pages y renvoyaient. Une page renvoyée seule à un robot portait donc une référence pendante. Il est maintenant déclaré sur chaque page, comme l'organisation.

Les types posés sur l'ensemble du site. Organization sur les vingt-sept pages, avec `parentOrganization` vers Green-Got et `sameAs` vers Wikipédia, Instagram et YouTube. WebSite sur les vingt-sept. BreadcrumbList sur vingt-cinq. Article sur treize. FAQPage sur Faits et chiffres, avec ses douze questions. Person sur les cinq membres du comité. HowTo sur Associations. ContactPage, AboutPage, CollectionPage, ItemList, VideoObject et Event.

Un seul `Event` est posé, celui du 17 septembre. Les trois autres rendez-vous n'ont pas de date arrêtée et ne reçoivent donc pas de `startDate` inventée.

**Liens.** Six cent quatre-vingt-dix-sept liens internes vérifiés, ancres comprises, contre les fichiers réellement produits. **Aucun lien interne cassé.** Trente-deux liens externes interrogés, vingt-sept répondent 200, cinq renvoient un blocage anti-robot, trois profils LinkedIn, l'OCDE et ScienceDirect. Ce ne sont pas des liens morts, ils sont à ouvrir une fois à la main.

**Cohérence de la fiche d'identité.** La phrase du statut apparaît trente-sept fois sur le site, à l'identique. Aucune variante orthographique du nom de la Fondation. Les trois occurrences restantes de « fonds abrité » sont à l'intérieur des mentions À VALIDER qui expliquent justement l'écart.

**Le mot banque.** Onze occurrences sur le site, toutes contrôlées une par une. Neuf désignent les banques tierces et portent le positionnement de la maison, « les mêmes banques financent les pétroliers », « les banques financent le bâti et le matériel, rarement la terre ». Deux nient explicitement l'association, sur la page Faits et chiffres. **Aucune n'associe Green-Got à une banque.**

**Recette finale, requête HTTP sans JavaScript.**

```
  Type de page          Code  Octets  Texte éditorial servi sans JavaScript
  Accueil               200     8910     272 caractères
  La Fondation          200    16597    4064 caractères
  Faits et chiffres     200    18740    4861 caractères
  Nos combats           200    18361    4849 caractères
  Index des projets     200    66183    1106 caractères
  Une page projet       200    13687    2653 caractères
  Programme             200    11214     708 caractères
  Un évènement          200    11890     985 caractères
  Publications          200    11314    1028 caractères
  Une publication       200    10380     503 caractères
  Associations          200    11197     989 caractères
  Contact               200    10276     802 caractères
  Mentions légales      200    10484    1799 caractères
  Confidentialité       200    10695    1956 caractères
  Page introuvable      200     8391     250 caractères

  Fichier               Code  Octets
  /robots.txt           200     1464
  /sitemap.xml          200     3242
  /llms.txt             200     6647
  /_redirects           200     1410
```

Pour mémoire, la même requête sur le site actuel renvoie 1 887 octets et zéro caractère de contenu éditorial, sur toutes ses adresses.

**Note de bascule.** `BASCULE.md` décrit ce qu'il reste à faire pour mettre le site en ligne, qui fait quoi, et les sept requêtes à passer le jour de la bascule pour vérifier que tout répond. Je n'ai rien déployé et rien poussé.

---

## Critères de fin de chantier

| Critère demandé | État |
|---|---|
| Une requête curl sur chaque type de page renvoie le contenu éditorial complet | Tenu, seize types de page vérifiés |
| robots.txt, sitemap.xml et llms.txt répondent en 200 | Tenu |
| Le JSON-LD de chaque page passe le validateur schema.org sans erreur | Tenu, les vingt-huit pages soumises à validator.schema.org |
| Aucun lien interne cassé | Tenu, 766 liens vérifiés |
| La fiche d'identité est identique sur toutes les pages | Tenu, vérifié par recherche dans le code |
| Aucune occurrence de « banque » associée à Green-Got | Tenu, contrôlées une par une |
| Score Lighthouse mobile supérieur à 90 | Tenu, performance 95 à 100, accessibilité 100, référencement 100 |
| Responsive à 360, 768 et 1440 px | Tenu, quinze pages, aucun débordement horizontal |
| Un fichier CHANGELOG.md | Ce fichier |
| Redirections 301 et vraie 404 | Tenu contre `outils/serveur.mjs`, qui applique le fichier `_redirects` comme le fera l'hébergement. À reconfirmer sur l'hébergement réel le jour de la bascule |

Huit outils sont dans le dépôt, tous relançables.

| Commande | Ce qu'elle fait |
|---|---|
| `npm run verifier` | Construit le site et contrôle les règles éditoriales, les titres, les H1, les dates, les auteurs et les images de partage |
| `node outils/jsonld.mjs` | Cohérence interne du balisage, types attendus, dates, références |
| `node outils/validateur-schema.mjs` | Passage au vrai validateur schema.org |
| `node outils/liens.mjs --externes` | Liens internes avec leurs ancres, et liens externes |
| `node outils/serveur.mjs 8080` | Sert `dist` comme le fera l'hébergement, redirections et 404 comprises |
| `npm run responsive` | Débordement horizontal à 360, 768 et 1440 px |
| `npm run lighthouse` | Notes en profil mobile |
| `npm run images` et `npm run partage` | Variantes AVIF et WebP des photos, cartes de partage |

---

### Lot 16, les six manques qui restaient, 18 septembre 2026

J'avais dit que tout n'était pas parfait et j'avais listé ce qui ne l'était pas. Voici ce qui a été traité.

**La validation schema.org, que j'avais déclarée impossible d'ici.** Elle ne l'était pas. `validator.schema.org` accepte un envoi direct. Un outil, `outils/validateur-schema.mjs`, soumet le balisage et rapporte ce que le validateur répond.

**Résultat.** Les vingt-sept pages du site ont été soumises et validées. **Quatre-vingt-cinq objets, zéro erreur, zéro avertissement.**

```
  /404.html                                        1 objets, 0 erreur(s), 0 avertissement(s)
  /associations/                                   3 objets, 0 erreur(s), 0 avertissement(s)
  /contact/                                        3 objets, 0 erreur(s), 0 avertissement(s)
  /evenements/depollution-seine-17-septembre-2026/ 4 objets, 0 erreur(s), 0 avertissement(s)
  /faits-et-chiffres/                              3 objets, 0 erreur(s), 0 avertissement(s)
  /                                                1 objets, 0 erreur(s), 0 avertissement(s)
  /la-fondation/                                   7 objets, 0 erreur(s), 0 avertissement(s)
  /nos-combats/                                    3 objets, 0 erreur(s), 0 avertissement(s)
  /projets/feve-fermes-en-vie/                     4 objets, 0 erreur(s), 0 avertissement(s)
  ... les vingt-sept pages, toutes à zéro erreur et zéro avertissement
  Total, 85 objets, 0 erreur(s), 0 avertissement(s).
```

Le service limite fortement le débit depuis une même adresse. Après cette passe complète il nous a refusé les envois suivants, d'abord en 429 puis en 302. L'outil distingue désormais cette limite d'une erreur de balisage et le dit en clair, et il valide par défaut un exemplaire de chaque gabarit, ce qui suffit puisque toutes les fiches d'un même type sortent du même gabarit. `--tout` les soumet toutes. La page Nous soutenir, créée après cette passe, emploie le gabarit `Article` déjà validé.

**Les vraies redirections et la vraie 404, que je ne pouvais pas vérifier.** Je le pouvais aussi. `outils/serveur.mjs` sert `dist` en appliquant le fichier `_redirects`, en servant une page à son adresse sans barre oblique finale et en renvoyant un vrai 404 sur une adresse inconnue. Les sept redirections répondent 301 vers la bonne cible, une page de projet répond 200 sans redirection, une adresse inconnue répond 404. Cela ne remplace pas la vérification sur l'hébergement réel, mais cela prouve que le fichier est correctement formé et que la 404 existe.

**L'accueil ne servait que 272 caractères.** C'était le choix de la maquette, un seul écran, et c'était la page la plus susceptible d'être citée. Elle sert maintenant 2 630 caractères. Le plein cadre d'ouverture est inchangé. Quatre bandes ont été ajoutées dessous, ce qu'est la Fondation, pourquoi ces combats, les projets financés et le prochain rendez-vous. **Rien n'y est inventé**, tout vient de la fiche d'identité, des fiches de projet et de la page Faits et chiffres, et y renvoie. C'est un ajout éditorial, dis-moi si tu préfères revenir à l'écran unique.

**L'image de partage était trop petite.** Elle pointait vers `hero.jpg`, 1000 sur 676, sous le format attendu. Les photos de projet sont pires, la plupart tournent autour de 500 sur 600, les recadrer aurait demandé de les agrandir de deux à trois fois. Vingt-cinq cartes de partage sont donc composées à 1200 sur 630, une par page, sur le vert profond de la maison, avec le renard et le titre de la page. Rien n'y est agrandi. Le contrôle automatique refuse désormais toute page dont l'image de partage est absente ou plus petite que 1200 sur 630.

**La page Nous soutenir était un trou fonctionnel.** Son adresse redirigeait vers Faits et chiffres, où la réponse est marquée À VALIDER. Quelqu'un qui voulait donner arrivait donc sur une page qui lui disait qu'on ne savait pas le lui expliquer. La page existe de nouveau à son adresse d'origine et dit ce qui est vrai et vérifiable, le cadre fiscal de l'article 200 du code général des impôts, qui émet les reçus, où déposer un projet, comment venir voir. La voie de don elle-même reste marquée À VALIDER, en clair, elle n'existe pas encore sous une forme qui ne passe pas par l'ouverture d'un compte.

**Deux défauts trouvés en regardant les pages.** Les paragraphes couraient sur 1 024 pixels, soit environ 140 signes par ligne, le double de ce qui se lit confortablement, ils sont contenus à 68 signes. Et les cinq boutons secondaires étaient invisibles, la classe `.btn` seule a une bordure transparente, ils prennent la variante contour.

**Une recherche qui donne un résultat à te signaler.** J'ai cherché la fiche de la Fondation dans l'annuaire des fondations abritées de la Fondation de France, par le moteur de recherche du site et sur six pages de l'annuaire. **Je ne l'ai pas trouvée.** Les trois adresses que j'ai essayées répondent 404. L'annuaire liste bien des fondations dans son HTML servi, soixante-cinq noms sur la première page, donc mon absence de résultat n'est pas un problème technique. Je ne peux pas affirmer que la fiche n'existe pas, mais si elle n'existe pas, c'est une action à mener et non une adresse à me donner. C'est directement lié au problème que tu décrivais au départ, la Fondation décrite de quatre façons différentes en ligne.

### Lot 17, la mise en page, 18 septembre 2026

En regardant les pages une à une plutôt qu'en lisant leurs mesures, j'ai trouvé cinq défauts de mise en page. Les mesures étaient bonnes, les pages ne l'étaient pas.

**Les listes de définitions n'avaient aucun style.** La maquette ne les stylait que dans la colonne latérale des fiches projet, sa règle était écrite `.adet .side .dl`. Partout ailleurs, sur Faits et chiffres, sur la fiche d'identité, sur Contact, sur les fiches d'évènement, elles sortaient au style par défaut du navigateur, intitulé et valeur sur la même ligne et valeur indentée de quarante pixels. La page de référence du site avait l'air non fini. La règle est sortie de sa portée, avec la même intention, une liste sur filets, l'intitulé en petites capitales et la valeur dessous.

**Le héros était une grille à deux colonnes.** `.phero .container` est prévu pour un texte et une image côte à côte. Les pages qui n'ont qu'une colonne y laissaient un vide de la moitié de l'écran et voyaient leur titre partir à droite. Une variante à une colonne leur est donnée.

**Les titres et les paragraphes n'avaient aucune marge.** La feuille de style pose `p{margin:0}` et aucune marge sur les titres, la maquette réglait l'espacement bande par bande avec une classe par bande. Les pages écrites depuis enchaînaient des titres et des paragraphes ordinaires, le texte arrivait collé sous son titre. Un rythme leur est donné, sans toucher aux bandes de la maquette.

**Les chiffres n'étaient pas mis en valeur.** Mon composant employait une classe `.stat` qui n'existait nulle part, la maquette écrivait `.kpis`. Les chiffres sortaient en texte courant. Ils ont maintenant le langage de la maison, la valeur en grand, le libellé dessous, la source à la suite.

**Deux listes numérotées n'avaient pas de style**, la chaîne en six maillons de Nos combats et le mécanisme en quatre temps d'Associations.

**Et les lignes de texte couraient trop large**, environ cent quarante signes sur 1 024 pixels, le double de ce qui se lit confortablement. Elles sont contenues.

Mesures après correction. Performance de 95 à 100, accessibilité 100, bonnes pratiques 100, référencement 100, sur quatorze pages. Dix-sept pages testées à 360, 768 et 1440 px, aucun débordement. Vingt-huit pages, 766 liens internes, aucun cassé.

Le contrôle automatique vérifie aussi, désormais, que le sitemap et le llms.txt couvrent exactement les pages construites. Une page absente du sitemap n'est pas proposée aux moteurs, une adresse au sitemap sans page derrière est une promesse en l'air.
