# Note opératoire pour la mise en ligne

Ce document décrit ce qu'il reste à faire pour remplacer le site actuel par celui de ce dépôt. **Je n'ai rien déployé et rien poussé.** Ces opérations demandent des accès que je n'ai pas et des décisions qui ne sont pas les miennes.

---

## Avant toute chose

| À faire | Pourquoi |
|---|---|
| Relire les 51 mentions À VALIDER affichées dans les pages | Elles sont visibles en orange, elles ne peuvent pas passer inaperçues. Le détail figure dans `CHANGELOG.md` |
| Faire valider les mentions légales et la politique de confidentialité par le juridique | Les deux pages portent des champs à compléter |
| Confirmer la qualification juridique auprès de la Fondation de France | Le site écrit « fondation abritée ». Un fonds abrité n'est pas la même chose et la phrase est recopiée sur trente-sept emplacements |
| Trancher le montant cumulé affiché | Le site annonce plus de 2,5 millions, le registre en donne 1 668 582, et la page Soutiens passés publie le détail dont la somme est vérifiable. Voir la réserve dans `CHANGELOG.md` |
| Faire confirmer les chiffres de Wings of the Ocean par l'association | 15,1 tonnes sur la fiche, un peu plus de 3 tonnes selon une source secondaire |
| Décider du sort des quatre rendez-vous envisagés | Ils sont marqués comme non confirmés et hors balisage, mais ils restent affichés |
| Faire mettre à jour la FAQ de Green-Got | Elle annonce encore près de 2 millions d'euros, elle dit donc moins que le site |

## Construire le site

```
npm install
npm run partage                    # compose les cartes de partage, 1200 sur 630
npm run images                     # écrit les variantes AVIF et WebP des photos
npm run verifier                   # construit le site et contrôle les règles éditoriales
node outils/jsonld.mjs             # cohérence interne du balisage
node outils/validateur-schema.mjs  # passage au vrai validateur schema.org
node outils/liens.mjs --externes   # liens internes et externes
node outils/serveur.mjs 8080 &     # sert dist comme le fera l'hébergement
npm run responsive http://localhost:8080 / /projets ...
npm run lighthouse http://localhost:8080/
```

Le site construit se trouve dans `dist`. C'est ce dossier qu'il faut publier, rien d'autre.

`outils/serveur.mjs` applique le fichier `_redirects`, sert les pages sans barre oblique finale et renvoie un vrai 404. Il permet de vérifier ici ce que l'hébergement devra faire, avant même de déployer.

---

## Héberger

L'hébergement visé est Cloudflare Pages, parce que le domaine est déjà derrière Cloudflare et parce que le fichier `_redirects` y est lu nativement. Toute autre plateforme conviendrait, à condition qu'elle sache trois choses.

Servir `dist/projets/feve-fermes-en-vie/index.html` à l'adresse `/projets/feve-fermes-en-vie`, sans redirection vers une adresse avec barre oblique finale.

Servir `dist/404.html` avec un vrai code HTTP 404. Le site actuel répond 200 sur n'importe quelle adresse, ce qui fabrique des pages fantômes dans l'index des moteurs.

Lire le fichier `_redirects` et appliquer les huit redirections permanentes qu'il contient.

Réglages à créer sur Cloudflare Pages. Commande de construction `npm run build`, dossier de sortie `dist`, version de Node 22 ou plus.

---

## Basculer le domaine

C'est l'étape qui demande des accès que je n'ai pas.

| Étape | Qui |
|---|---|
| Vérifier le nouveau site sur son adresse provisoire, du type `xxx.pages.dev` | Toi |
| Faire pointer `fondation.green-got.com` vers le nouvel hébergement dans Cloudflare | La personne qui gère le compte Cloudflare |
| Vérifier que les huit redirections répondent bien 301 | Toi |
| Arrêter le projet Lovable et son traceur `/~flock.js` | La personne qui gère Lovable |
| Déclarer `https://fondation.green-got.com/sitemap.xml` dans la Search Console | Toi |
| Retirer `index.html` et le dossier `assets/video` du dépôt si la maquette n'a plus d'usage | À décider ensemble |

Une chose est déjà faite et n'a pas besoin d'être touchée. La redirection de `green-got.com/fondations` vers ce site est déjà permanente, en 301 et en un seul saut. Je l'ai vérifiée le 17 septembre 2026. `green-got.com/fondation` au singulier également.

---

## Après la bascule, à vérifier le jour même

```
curl -sI https://fondation.green-got.com/projets/feve-fermes-en-vie   # doit répondre 200
curl -sI https://fondation.green-got.com/histoire                     # doit répondre 301
curl -sI https://fondation.green-got.com/adresse-qui-nexiste-pas      # doit répondre 404
curl -s  https://fondation.green-got.com/robots.txt
curl -s  https://fondation.green-got.com/sitemap.xml
curl -s  https://fondation.green-got.com/llms.txt
curl -sI https://fondation.green-got.com/nous-soutenir                 # doit répondre 200
curl -s  https://fondation.green-got.com/projets/feve-fermes-en-vie | wc -c
```

La dernière commande doit renvoyer environ treize mille octets. Si elle en renvoie deux mille, c'est que l'ancien site répond encore.

---

## Ce qui reste hors du dépôt

Photographies en haute résolution, les seize fichiers actuels sont deux à trois fois trop petits pour leur usage. Photos de Planète Urgence et de Coral Guardian, qui n'en ont aucune. Master vidéo en haute définition, l'actuel fait 854 × 480 pour 6,4 Mo. Les vingt-cinq cartes de partage sont composées et à la bonne taille, si la communication préfère des visuels photographiques il faudra des fichiers d'au moins 1200 sur 630. Fichier vectoriel officiel du renard. Adresse de la fiche de la Fondation dans l'annuaire de la Fondation de France, celle que j'ai testée répond 404. Adresse de la page LinkedIn de la Fondation. Outil de mesure d'audience conforme à la politique de Green-Got, aucun n'est prévu.
