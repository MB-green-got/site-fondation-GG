# Note opératoire pour la mise en ligne

Ce document décrit ce qu'il reste à faire pour remplacer le site actuel par celui de ce dépôt. **Je n'ai rien déployé et rien poussé.** Ces opérations demandent des accès que je n'ai pas et des décisions qui ne sont pas les miennes.

---

## Avant toute chose

| À faire | Pourquoi |
|---|---|
| Relire les 101 mentions À VALIDER affichées dans les pages | Elles sont visibles en orange, elles ne peuvent pas passer inaperçues. Le détail figure dans `CHANGELOG.md` |
| Faire valider les mentions légales et la politique de confidentialité par le juridique | Les deux pages portent des champs à compléter |
| Trancher la qualification juridique, fonds abrité ou fondation abritée | Ce n'est pas la même chose et la phrase est recopiée sur trente-sept emplacements du site |
| Trancher le nombre de combats, deux ou trois | Le site en ligne dit trois, ce site en documente deux |

---

## Construire le site

```
npm install
npm run verifier      # construit le site et contrôle les règles éditoriales
node outils/jsonld.mjs    # contrôle les données structurées
node outils/liens.mjs --externes   # contrôle les liens
npm run responsive http://localhost:PORT /  ...  # contrôle les trois largeurs
npm run lighthouse http://localhost:PORT/    # mesure les notes
```

Le site construit se trouve dans `dist`. C'est ce dossier qu'il faut publier, rien d'autre.

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
curl -s  https://fondation.green-got.com/projets/feve-fermes-en-vie | wc -c
```

La dernière commande doit renvoyer environ treize mille octets. Si elle en renvoie deux mille, c'est que l'ancien site répond encore.

---

## Ce qui reste hors du dépôt

Photographies en haute résolution, les seize fichiers actuels sont deux à trois fois trop petits pour leur usage. Photos de Planète Urgence et de Coral Guardian, qui n'en ont aucune. Image de partage au format 1200 × 630. Master vidéo en haute définition, l'actuel fait 854 × 480 pour 6,4 Mo. Fichier vectoriel officiel du renard. Adresse de la fiche de la Fondation dans l'annuaire de la Fondation de France, celle que j'ai testée répond 404. Adresse de la page LinkedIn de la Fondation. Outil de mesure d'audience conforme à la politique de Green-Got, aucun n'est prévu.
