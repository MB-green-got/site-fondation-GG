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
