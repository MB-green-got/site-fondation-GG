# Journal du chantier

Site de la Fondation Green-Got. Chantier ouvert le 17 septembre 2026.
Trois phases, audit, plan, réalisation. Un lot par commit.

---

## Décisions arrêtées

Le plan posait seize décisions. Elles ont été prises avec Marie Bénédicte les 18 et 21 septembre 2026. Ce tableau fait foi, c'est lui qu'il faut lire avant de modifier le site.

| Sujet | Décision |
|---|---|
| Base de départ | La maquette de ce dépôt, branche `passe-responsive` fusionnée dans `main` |
| Générateur et hébergement | Astro en sortie statique, Cloudflare Pages visé |
| Statut juridique | « fondation abritée par la Fondation de France », recopié partout |
| Nombre de combats | Deux, les PFAS traités à l'intérieur du second |
| Vocabulaire | Projets, dans les adresses, la navigation et les titres |
| Auteur affiché | « L'équipe de la Fondation Green-Got » |
| Année de création | 2026. Green-Got finance ces projets depuis 2022 |
| Montant cumulé affiché | Plus de 2,5 millions d'euros versés depuis 2022, voir la réserve ci-dessous |
| Montants par projet | Tout ce qui a été versé, subventions et arrondis confondus |
| Comité | Cinq membres confirmés, avec leurs rôles |
| Valeurs | Ligne retirée, le site ne proclame pas de valeurs |
| Accueil | Enrichi, trois bandes sous le plein cadre, sans la liste des projets |
| Page Nous soutenir | Conservée à son adresse |
| Page Soutiens passés | Créée, quinze associations, avec leurs montants et leurs années |
| Contact | `impact@green-got.com` |
| Rendez-vous envisagés | Quatre ajoutés, marqués comme non confirmés, hors balisage `Event` |

### Trois réserves que ces décisions laissent ouvertes

**Le montant cumulé.** Le site annonce plus de 2,5 millions d'euros. Les deux sources transmises, le registre Notion et les tableaux de suivi, donnent 1 668 582 € versés à ce jour et 1 868 582 € en fin d'année si le plan 2026 est tenu. L'écart est d'au moins 631 418 €. Il a été signalé deux fois, chiffres à l'appui, et la décision de maintenir 2,5 millions a été confirmée. Trois conséquences. La source liée, la FAQ de Green-Got, annonce encore près de 2 millions, elle dit donc moins que le site. La page Soutiens passés publie le détail par association, dont la somme, 1 668 582 €, est vérifiable par quiconque additionne. Et la règle éditoriale du chantier demande qu'aucun chiffre ne soit avancé sans source qui le porte.

**Les chiffres de Wings of the Ocean.** Ce n'est pas un lien qui manque, c'est peut-être un chiffre faux. La fiche annonce 15,1 tonnes collectées en 2024, une source secondaire évoque un peu plus de 3 tonnes sur 103 ramassages. L'association ne publie aucun rapport, ses compteurs d'impact affichent zéro. À confirmer auprès d'elle.

**Les quatre rendez-vous envisagés.** Ils sont clairement marqués, rangés dans une seconde liste sous le titre « Ce qu'on aimerait mettre en place », et aucun n'entre dans le balisage `Event`, ce que le contrôle vérifie à chaque construction. Rien n'y est présenté comme un fait. Reste qu'un site qui affiche des rendez-vous non décidés affiche des rendez-vous non décidés.

---

## Ce qui reste À VALIDER

**Cinquante et une mentions**, affichées en clair et en orange dans les pages. Aucune donnée manquante n'est comblée par une estimation. La liste exacte se régénère avec `npm run verifier`.

| Élément manquant | Où il s'affiche |
|---|---|
| Forme sociale, capital, RCS, siège de Green-Got, directeur de la publication | Mentions légales |
| Qualification juridique à confirmer par le juridique | Mentions légales |
| Hébergeur retenu | Mentions légales |
| Crédits photographiques, image par image | Mentions légales |
| Durée de conservation des données d'inscription | Confidentialité |
| Adresse du délégué à la protection des données | Confidentialité |
| Outil de mesure d'audience | Confidentialité |
| Adresse postale | Contact |
| Part reversée par Green-Got, et la mention « sans frais ni commission » non sourcée | La Fondation |
| Mise à jour de la FAQ de Green-Got sur le montant | La Fondation, Faits et chiffres |
| Voie de don qui ne passe pas par un compte | Faits et chiffres, Nous soutenir |
| Source des trois chiffres de Wings of the Ocean | Sa fiche |
| Nom de personne et date de départ | Tara Océan, École de la Réparation, Planète Urgence, Coral Guardian |
| Récit, chiffres et photo | Planète Urgence, Coral Guardian |
| Date de trois chiffres | Nos combats, The Shift Project |
| Lien d'inscription, dates et lieux | Les quatre rendez-vous réels |
| Cinéaste, durée, date de sortie, où voir le film | Les trois publications |
| Articles, aucun n'est publié | Publications |
| Adresse de la fiche annuaire Fondation de France, page LinkedIn | Balisage `sameAs` |

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

### Lot 18, les montants versés, 18 septembre 2026

Marie Bénédicte a transmis le registre de pilotage financier de la Fondation, page Notion « Financement associatif GG » arrêtée au 22 août 2026, puis deux tableaux de suivi détaillés. Les deux sources concordent au centime près, à 58 centimes près sur la ligne Lazare.

**Ce que disent les sources.**

```
  Subventions directes 2022 à 2025 ......   709 282,00 €
  Arrondis 2023 à 2025 ..................   659 300,39 €
  Sous-total fin 2025 ................... 1 368 582,39 €
  Deux premières tranches 2026 ..........   300 000,00 €
  Total versé à ce jour ................. 1 668 582,39 €
  Si le plan 2026 est tenu jusqu'en décembre, 1 868 582,39 €.
```

**Base retenue pour les fiches projet**, décision de Marie Bénédicte, tout ce qui a été versé à l'association, subventions décidées par le comité et arrondis fléchés par les membres confondus. Les huit fiches affichent donc Sungai Watch 280 000 €, FEVE 191 787 €, Wings of the Ocean 189 076 €, Planète Urgence 157 000 €, École de la Réparation 100 000 €, Coral Guardian 90 000 €, The Shift Project 60 000 € et Fondation Tara Océan 50 000 €, chacun avec sa date d'arrêté et, quand il existe, l'engagement annoncé pour 2026.

J'avais signalé que cette base attribue à la Fondation des sommes qu'elle n'arbitre pas, le registre écrivant lui-même que pour les arrondis « la Fondation n'est qu'un intermédiaire de paiement ». La décision a été prise en connaissance de cause. La page Soutiens passés le rappelle en pied de page, sans employer le mot arrondi dans le corps du texte, conformément aux règles éditoriales.

**Montant cumulé affiché, écart à consigner.** Le site annonce « Plus de 2,5 millions d'euros versés aux associations depuis 2022 ». Les deux sources transmises donnent 1 668 582 € versés à ce jour et 1 868 582 € en fin d'année si le plan est tenu. L'écart est donc de 631 418 € au minimum. J'ai signalé cet écart deux fois, chiffres à l'appui, la décision de maintenir 2,5 millions a été confirmée. Elle est appliquée.

Trois conséquences que ce choix crée et qu'il faut connaître. La source liée au chiffre, la FAQ de Green-Got, annonce encore près de 2 millions, elle dit donc moins que le site. La page Soutiens passés publie le détail par association, dont la somme, 1 668 582 €, est vérifiable par quiconque additionne. Et la règle éditoriale du chantier demande qu'aucun chiffre ne soit présenté comme un fait sans source qui le porte.

**Page Soutiens passés créée.** Le site présentait huit projets, le registre en compte vingt-trois. Les quinze autres associations y figurent avec leur montant et leurs années, de Refuge GroinGroin à QuotaClimat. La page explique l'écart plutôt que de le laisser ouvert, et publie le total vérifiable. Trois d'entre elles avaient reçu des subventions décidées par le comité sans figurer nulle part sur le site, EcoTree, Just Diggit et Climate Partner.

**Une seule source porte désormais les montants.** Ils vivent dans `src/data/soutiens.js` et non dans les fiches, aucune fiche ne peut donc diverger du registre. Le champ montant a été retiré du schéma des fiches.

Les mentions À VALIDER passent de 101 à 64.

### Lot 19, sources trouvées, contact et programmation envisagée, 18 septembre 2026

**Vingt et une sources sur vingt-quatre ont été trouvées et vérifiées**, à la demande de Marie Bénédicte.

| Projet | Source liée |
|---|---|
| FEVE, trois chiffres | Rapport d'activité 2024, PDF sur site.feve.co |
| The Shift Project, trois chiffres | Grande Consultation des Agriculteurs, theshiftproject.org |
| Tara Océan, trois chiffres | Pages Mission Microplastiques et Tara Polar Station |
| Sungai Watch, trois chiffres | sungai.watch |
| École de la Réparation, trois chiffres | lecoledelareparation.fr |

Deux corrections au passage. Le domaine de Sungai Watch est `sungai.watch`, `sungaiwatch.com` n'est qu'une redirection, le lien partenaire pointe désormais vers le bon. Et l'École de la Réparation a bien un site, `lecoledelareparation.fr`, la fiche le disait absent.

**Les trois chiffres de Wings of the Ocean n'ont pas de source publique.** L'association ne publie aucun rapport d'activité, les compteurs d'impact de son site affichent zéro et aucun bilan n'est téléchargeable. Une source secondaire évoque un peu plus de 3 tonnes collectées en 2024 sur 103 ramassages, là où la fiche en annonce 15,1. La mention À VALIDER reste en place et dit précisément cela, c'est à confirmer auprès de l'association.

**Adresse de contact.** `impact@green-got.com`, appliquée sur la page Contact, dans les mentions légales et dans le balisage Organization. L'adresse `contact@fondation-greengot.org` trouvée sur le site en ligne n'a pas été reprise, son nom de domaine n'est pas celui du site.

**Quatre rendez-vous envisagés ont été ajoutés**, à la demande de Marie Bénédicte, pour montrer la direction de la programmation. Comité exécutif ouvert aux membres, bilan 2026 et programmation 2027, collectes de ville en ville, run Green-Got.

J'avais signalé que des rendez-vous inventés sur un site dont l'objet est d'être la source fiable vont contre le but du chantier. Trois garde-fous ont donc été posés pour que rien d'envisagé ne puisse passer pour un fait. Ils vivent dans une seconde liste, sous un titre qui dit « Ce qu'on aimerait mettre en place » et un chapeau qui précise que rien n'y est arrêté. Chaque fiche affiche la mention en orange dès le titre. Et **aucun n'entre dans le balisage `Event`**, vérifié, le seul `Event` du site reste celui du 17 septembre. Le contrôle automatique le confirme à chaque construction.

Le site compte maintenant trente-trois pages. Les mentions À VALIDER passent de 64 à leur niveau actuel, les vingt et une sources trouvées en ayant retiré autant, les quatre rendez-vous envisagés en ayant ajouté.

### Lot 20, quatre spécialistes en recherche, 21 septembre 2026

Quatre recherches menées en parallèle, un juriste sur l'identité de l'éditeur, un chargé de mission sur les fiches incomplètes, un documentaliste sur les publications, un responsable mécénat sur la voie de don. Chaque valeur reprise ci-dessous a sa source publique, et j'ai vérifié moi-même les adresses avant de les écrire.

**Trois erreurs du site corrigées.**

La Grande Consultation des Agriculteurs n'a pas recueilli 8 000 contributions mais près de 7 800, dont 7 711 au volet quantitatif. Le chiffre de 80 % était de surcroît ambigu, la page du Shift Project l'emploie pour deux choses différentes, la fiche retient désormais les 86 % qui portent explicitement sur la viabilité des exploitations. Les trois chiffres sont datés du 17 décembre 2024.

La liste PFASMASTER de l'agence américaine de l'environnement a été retirée. Elle comptait 12 039 substances dans sa version du 10 septembre 2025. Le chiffre est daté et la source bascule sur PFASSTRUCT, la liste en vigueur.

L'École de la Réparation forme sur onze mois et non un an, et son volume horaire officiel est de 1 326 heures et non 1 400, chiffre qui circule dans la presse et que le programme de formation contredit.

**Je m'étais trompé sur Wings of the Ocean.** J'avais écrit que l'association ne publiait aucun rapport et qu'une source secondaire contredisait ses chiffres. Le rapport d'activité 2024 existe, il fait cinquante pages et il est lié depuis leur page Qui sommes-nous. Les trois chiffres sont confirmés mot pour mot, 15,1 tonnes, 1 019 803 mégots, 20 251 personnes sensibilisées lors de 405 actions de sensibilisation, distinctes de 336 ramassages. La source secondaire qui parlait de 3 tonnes était un point d'étape de mi-année couvrant avril à juin 2024. La réserve est levée et les trois chiffres ont leur lien.

**La fiche de l'annuaire de la Fondation de France existe.** J'avais conclu le contraire après avoir cherché par leur moteur et sur six pages de l'annuaire. Elle est à `fondationdefrance.org/fr/annuaire-des-fondations/fondation-green-got`, je l'ai ouverte et lue. Elle entre dans le balisage `sameAs`. Elle confirme aussi deux choses, l'objectif de 15 millions d'euros d'ici 2030, qui a donc désormais une source officielle, et la part reversée par Green-Got, qui est de 5 % du chiffre d'affaires et non de 5 à 10 %.

**Les deux fiches vides sont écrites.** Planète Urgence a maintenant son délégué national en Indonésie, Reonaldus Praembanan, la date de départ du projet Mahakam, trois chiffres sourcés sur le rapport d'activité 2025 et un récit en trois temps. Coral Guardian a son cofondateur Martin Colognoli, la date de 2015 pour le projet indonésien, trois chiffres sourcés sur le rapport d'activité 2024 et un récit. Tara Océan a Jean-François Ghiglione, directeur scientifique de la Mission Microplastiques. L'École de la Réparation a Stéphanie Calvino, sa directrice.

**Les deux documentaires n'existent pas.** Ni « Les Rivières Mortes » ni « Éternels, vivre avec les PFAS » n'ont la moindre trace publique en dehors du site actuel de la Fondation. Ils ne figurent ni dans la base film-documentaire.fr, ni sur AlloCiné, ni dans la presse. Les fiches le disent maintenant, ce sont des films annoncés et non sortis, et la durée de 52 minutes, attestée par le seul site de la Fondation, est retirée. Attention à ne pas confondre le second avec « Tous empoisonnés, le fléau des PFAS », diffusé sur Arte en 2025, qui n'a aucun lien avec la Fondation.

**La voie de don est documentée.** Une fondation abritée n'a pas la personnalité morale, le donataire juridique est la Fondation de France et c'est son statut d'utilité publique qui ouvre l'avantage fiscal. Écrire « don à la Fondation Green-Got » est donc inexact, la page Nous soutenir écrit maintenant « don à la Fondation de France, affecté à la Fondation Green-Got ». Le cadre fiscal est complété, report sur cinq ans, 75 % au titre de l'impôt sur la fortune immobilière dans la limite de 50 000 €, et le régime des entreprises, 60 % puis 40 % au-delà de deux millions.

**La phrase « sans frais ni commission » est retirée.** Elle est fausse. La Fondation de France prélève une contribution aux charges communes, à l'entrée comme à la sortie, ce que son propre rapport financier et un rapport de la Cour des comptes documentent. Les 3 030 € du registre interne sont cohérents avec ce mécanisme. La page l'écrit désormais plutôt que de le nier.

**Les mentions légales portent l'identité vérifiée de l'éditeur.** Domino, société par actions simplifiée exerçant sous le nom commercial Green-Got, SIREN 883 981 763, RCS Nanterre, siège au 20 bis rue Louis-Philippe à Neuilly-sur-Seine. Le statut d'établissement de paiement agréé est confirmé, agrément inscrit au REGAFI le 23 janvier 2026, sans établissement parent. Le site ne dit donc pas seulement que Green-Got n'est pas une banque, il dit ce qu'elle est, avec le registre pour le prouver.

**Trois points que la recherche a soulevés et que je ne peux pas trancher.**

Le capital social de Green-Got a trois valeurs différentes selon les sources, dont celle affichée sur green-got.com qui a deux augmentations de retard. Un extrait Kbis récent est nécessaire.

Le directeur de la publication de green-got.com est désigné comme étant Clément Jaunault, qui n'est ni président ni directeur général au registre. Le directeur de la publication est de droit le représentant légal, en l'occurrence Maud Caillaux. Une délégation écrite est possible mais doit exister.

Green-Got ne publie aucune politique de confidentialité. L'adresse qui porte ce nom sert une politique de cookies. C'est une lacune de conformité au règlement européen qui se reporterait sur le site de la Fondation, d'autant qu'il est question d'y collecter des dons.

**Un point qui touche au problème de départ.** La fiche de l'annuaire de la Fondation de France décrit la Fondation autrement que le site, transition écologique et solidaire, générations futures, climat, biodiversité, santé et solidarité, là où le site dit santé environnementale, pesticides, pollution plastique, PFAS et recherche. Elle explique aussi le financement par la carte et l'arrondi, ce que les règles éditoriales du site interdisent. C'est une cinquième description de la Fondation en ligne, sur la source la plus officielle qui soit. Elle est à faire corriger auprès de la Fondation de France.

Les mentions À VALIDER passent de 50 à 30.
