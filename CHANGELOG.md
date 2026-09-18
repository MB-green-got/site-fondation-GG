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

Ces éléments s'affichent en clair et en orange dans les pages concernées. Aucun n'est comblé par une estimation.

| Élément | Où il manque |
|---|---|
| Phrase exacte du statut, fondation abritée ou fonds abrité | Fiche d'identité, donc toutes les pages |
| Année de création de la Fondation | La Fondation, Faits et chiffres, balisage `foundingDate` |
| Montant cumulé versé et sa date d'arrêté | Faits et chiffres |
| Montant du soutien, projet par projet | Les huit pages de projet |
| Composition du comité, noms et rôles confirmés | La Fondation |
| Valeurs de la Fondation | La Fondation |
| Nom de l'auteur affiché sur les pages de contenu | Toutes les pages de contenu |
| Adresse de la fiche dans l'annuaire Fondation de France | Balisage `sameAs` |
| Adresse de la page LinkedIn de la Fondation | Balisage `sameAs` |
| Deux combats ou trois | Nos combats, navigation, balisage |
| Photos de Planète Urgence et Coral Guardian | Deux pages de projet |
| Nom de personne, lieu et date pour six des huit projets | Les pages de projet concernées |

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
