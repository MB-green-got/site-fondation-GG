# Plan de chantier du site de la Fondation Green-Got

Phase 2, écrite le 18 septembre 2026, à la suite de l'audit du 17 septembre.
Ce document **propose**, il ne tranche pas. Chaque point marqué **Décision** attend ta réponse.
Aucun fichier du site n'a été modifié à ce stade.

---

## 1. La décision qui commande tout le reste

L'audit a montré que le site public et ce dépôt sont deux sites différents. Il faut choisir la base.

### Proposition A, on part de la maquette du dépôt

On reprend la maquette, on la découpe en vraies pages, on la passe en rendu statique, on y rapatrie les contenus du site Lovable qui n'existent pas dans la maquette, puis on bascule le domaine.

Ce qu'on garde. Huit fiches d'action nommées et sourcées, quatre évènements, le manifeste en deux convictions, la carte, les mentions légales et la politique de confidentialité, une charte typographique déjà tenue, un travail d'accessibilité déjà fait, zéro appel à un tiers sur la branche `passe-responsive`.

Ce qu'il faut rapatrier depuis le site Lovable, sous peine de le perdre. Les deux documentaires, « Les Rivières Mortes » et « Éternels, vivre avec les PFAS », la vidéo YouTube intégrée, les trois pages de combat pesticides, pollution plastique et PFAS, la page Nous soutenir, la page Contacter et les six questions de la foire aux questions.

Ce qu'on jette. Le code React, le traceur Lovable, l'image de partage hébergée chez un tiers.

### Proposition B, on part du site Lovable

On reconstruit l'application React en rendu serveur, on y réinjecte le contenu de la maquette.

Ce que ça coûte. Le contenu de la maquette est plus riche que celui du site en ligne, il faudrait le ressaisir dans des composants React. On hérite d'un fichier JavaScript de 511 Ko, d'une dépendance à un outil propriétaire et d'un traceur non choisi. Le travail d'accessibilité et de contraste serait à refaire.

### Mon avis

**Proposition A.** Le contenu de la maquette est déjà le bon, sourcé et daté dans le corps du texte. Le travail restant est technique, donc rapide et vérifiable. La proposition B demanderait de refaire l'éditorial, qui est la partie longue et la plus risquée.

> **Décision 1.** Proposition A ou proposition B.

> **Décision 2.** Si A, on part de `main` ou de `passe-responsive`. Mon avis, `passe-responsive`, elle corrige le responsive, héberge les polices donc supprime la fuite d'adresse IP vers Google, et remonte six contrastes sous le seuil. Elle n'est pas fusionnée, je la fusionnerais dans `main` en premier lot.

---

## 2. Arborescence cible

Onze types de page, quatre listes et leurs fiches.

```
Accueil
├── La Fondation
│     qui nous sommes, gouvernance, hébergement par la Fondation de France,
│     comité, financement par le mécénat de Green-Got
├── Faits et chiffres
│     source canonique, en questions et réponses, balisée FAQPage
├── Nos combats                      (à confirmer, voir décision 4)
│     ├── Pesticides et sols
│     ├── Pollution plastique et chimique
│     └── PFAS                       (à confirmer, voir décision 5)
├── Projets
│     └── une page par projet financé, huit à ce jour
├── Évènements
│     └── une page par rendez-vous, quatre à ce jour
├── Publications
│     └── une page par article ou documentaire, daté et signé
├── Associations, candidater
├── Contact
├── Mentions légales
└── Politique de confidentialité
```

Deux remarques sur des écarts avec ta consigne.

**Nos combats n'est pas dans ton arborescence cible**, or cette page existe sur les deux sites, elle porte le raisonnement chiffré et sourcé, et c'est le seul endroit qui explique pourquoi la Fondation finance ce qu'elle finance. Je propose de la garder. Je ne supprime rien sans ton accord.

**Associations, candidater n'est pas non plus dans ta consigne**, elle existe dans la maquette et porte les critères de candidature et le lien vers le formulaire. Je propose de la garder.

> **Décision 3.** On garde Nos combats et Associations, ou on les fond ailleurs.

> **Décision 4.** Le mot. Ta consigne dit Projets, la maquette dit « les actions » et son vocabulaire est tenu partout, « les actions qu'on finance ». Soit l'adresse est `/projets` et le texte continue de dire actions, ce qui est incohérent, soit on bascule tout le vocabulaire sur projets, soit l'adresse devient `/actions`. Mon avis, on bascule tout sur **projets**, c'est le mot que les moteurs et les annuaires de fondations emploient.

> **Décision 5.** Deux combats ou trois. Le site en ligne dit trois, pesticides, pollution plastique, PFAS. La maquette dit deux, pesticides et sols, pollution plastique et chimique, tout en rangeant les projets en trois piliers, Terre, Mer, Recherche et éducation. Il faut une réponse unique, elle conditionne les pages, la navigation et le balisage.

---

## 3. Structure des adresses

En français, courtes, sans accent, sans majuscule, sans barre oblique finale, stables.

| Page | Adresse proposée |
|---|---|
| Accueil | `/` |
| La Fondation | `/la-fondation` |
| Faits et chiffres | `/faits-et-chiffres` |
| Nos combats | `/nos-combats` |
| Un combat | `/nos-combats/pesticides` |
| Projets, index | `/projets` |
| Un projet | `/projets/feve` |
| Évènements, index | `/evenements` |
| Un évènement | `/evenements/depollution-seine-17-septembre-2026` |
| Publications, index | `/publications` |
| Une publication | `/publications/2026-09-17-titre-de-l-article` |
| Associations | `/associations` |
| Contact | `/contact` |
| Mentions légales | `/mentions-legales` |
| Confidentialité | `/confidentialite` |

Les huit adresses de projet, reprises des identifiants existants et développées pour être lisibles.

```
/projets/feve
/projets/planete-urgence
/projets/sungai-watch
/projets/wings-of-the-ocean
/projets/tara-ocean
/projets/coral-guardian
/projets/the-shift-project
/projets/ecole-de-la-reparation
```

> **Décision 6.** Adresses de projet courtes, du type `/projets/feve`, ou explicites, du type `/projets/feve-fermes-en-vie`. Mon avis, explicites, elles se lisent mieux quand un modèle les cite.

---

## 4. Redirections permanentes à poser

Toute adresse qui existe aujourd'hui et qui change doit recevoir une 301.

### Depuis le site Lovable

| Adresse actuelle | Destination | Remarque |
|---|---|---|
| `/histoire` | `/la-fondation` | Cette adresse est liée depuis la maquette elle-même |
| `/nos-combats` | `/nos-combats` | Inchangée |
| `/nos-combats/pesticides` | `/nos-combats/pesticides` | Inchangée |
| `/nos-combats/pollution-plastique` | `/nos-combats/pollution-plastique` | Inchangée |
| `/nos-combats/pfas` | `/nos-combats/pfas` ou `/nos-combats` | Dépend de la décision 5 |
| `/productions` | `/publications` | |
| `/nous-soutenir` | À arbitrer | Voir décision 7 |
| `/contacter` | `/contact` | |

### Depuis la maquette publiée sur GitHub Pages

Les adresses par ancre, du type `#/actions/feve`, ne peuvent pas recevoir de redirection serveur, car ce qui suit le dièse n'est jamais envoyé au serveur. Il faut un petit script de réacheminement posé sur la page d'accueil, qui lit l'ancre et renvoie vers la nouvelle adresse. Ce script est le seul JavaScript indispensable du site, il ne sert que d'aiguillage et ne porte aucun contenu.

> **Décision 7.** Que devient la page Nous soutenir. Elle appelle au don. Ta règle interdit de pousser à l'ouverture d'un compte Green-Got, elle n'interdit pas l'appel au don à la Fondation, qui est sa raison d'être. Trois options. On la garde telle quelle sous `/nous-soutenir`. On la fond dans `/la-fondation`. On la supprime et on redirige vers `/la-fondation`. Mon avis, on la garde, un lecteur qui veut donner doit trouver comment.

### Note à ton attention sur le domaine principal

Ta consigne indiquait que `green-got.com/fondations` redirige en 302 et doit passer en 301. **J'ai vérifié le 17 septembre 2026, elle est déjà en 301**, en un seul saut, et `green-got.com/fondation` au singulier également. Il n'y a rien à faire. La preuve est dans l'audit. Ce point sort donc du chantier.

Reste un point qui, lui, se règle en dehors de ce dépôt. **La bascule du domaine `fondation.green-got.com`**, aujourd'hui pointé sur Lovable derrière Cloudflare, vers le nouvel hébergement. Elle demande un accès au compte Cloudflare et une coordination avec la personne qui gère Lovable. Je ne la ferai pas, je préparerai le site et je te dirai quoi demander.

---

## 5. Modèle de données des projets

Un fichier par projet, en Markdown, avec un en-tête de données et un corps rédigé. Marie Bénédicte peut le modifier directement depuis GitHub sans toucher au code.

```yaml
---
slug: feve-fermes-en-vie
nom: FEVE, Fermes En Vie
objet: Foncier et installation agricole sans pesticides
pilier: Terre
statut: en cours                    # en cours, terminé
lieu: France, réseau de fermes
portee: national                    # national, local, international
coordonnees: { lon: null, lat: null }   # pour la carte, null si portée nationale

# les cinq éléments obligatoires de ta consigne
personne:
  nom: Kévin
  role: Maraîcher, ancien chercheur en biologie
  lieu: Saint-Astier, Dordogne
  date: 2023-12-01

montant: À VALIDER                  # montant du soutien, si publiable
montant_date: À VALIDER
date_debut: À VALIDER               # début du soutien de la Fondation
date_fin: null

chiffres:
  - valeur: 2 064 ha
    libelle: convertis à l'agroécologie
    date: 2024-12-31
    source_titre: Rapport d'activité FEVE 2024
    source_url: À VALIDER
  - valeur: 53
    libelle: agriculteurs installés
    date: 2024-12-31
    source_titre: Rapport d'activité FEVE 2024
    source_url: À VALIDER

partenaire:
  nom: FEVE, Fermes En Vie
  url: https://feve.co

image:
  fichier: feve
  alt: Un maraîcher tient des légumes fraîchement récoltés
  credit: À VALIDER

publie_le: 2026-09-18
modifie_le: 2026-09-18
auteur: À VALIDER
---

Corps de la fiche en Markdown, le pourquoi, le verrou, le récit des personnes.
```

Trois principes tenus par ce modèle.

Tout champ inconnu porte la mention **À VALIDER**, qui s'affiche en clair et en orange dans la page. Rien n'est comblé par une estimation. La maquette a déjà ce mécanisme, la classe `.todo`, je le reprends.

Tout chiffre porte obligatoirement une date et une source. Un chiffre sans `source_url` déclenche une erreur au moment de la construction du site, il devient donc impossible de publier un chiffre orphelin par inadvertance.

Les champs `publie_le`, `modifie_le` et `auteur` sont obligatoires sur toute page de contenu. Ils alimentent à la fois la ligne visible en bas de page et le balisage `Article`.

Les évènements et les publications suivent le même principe, avec leurs champs propres.

> **Décision 8.** Les montants des soutiens sont-ils publiables. La maquette a prévu la ligne et la laisse vide en écrivant elle-même « Les montants des soutiens financiers ne sont pas publiés à ce jour ». C'est la donnée que les moteurs de réponse citent le plus volontiers sur une fondation.

> **Décision 9.** Quel nom d'auteur s'affiche. Le tien, « L'équipe de la Fondation Green-Got », ou un auteur différent par page. Mon avis, un nom de personne, c'est ce qui porte le plus de crédit, et ta consigne demande un ton incarné.

---

## 6. Socle technique proposé

### Le choix du générateur

| Option | Ce que ça donne | Réserve |
|---|---|---|
| **A. Astro** | Sort du HTML pur, zéro JavaScript par défaut, contenu en Markdown avec vérification des champs, sitemap et optimisation des images fournis | Il faut installer Node, ce qui est déjà le cas sur ce poste |
| B. Eleventy | Même résultat, plus léger | Pas d'optimisation d'images intégrée, à câbler à la main |
| C. HTML à la main, un fichier par page | Aucune dépendance | La navigation et le pied de page seraient recopiés treize fois, une correction demanderait treize modifications, et le contenu ne serait pas séparé du code |
| D. Next.js | Très répandu | Trop lourd pour un site de treize pages, et ramène React |

**Mon avis, option A, Astro.** Trois raisons. Le HTML sort complet sans JavaScript, ce qui est l'objectif premier du chantier. Le contenu vit dans des fichiers Markdown que tu peux corriger seule depuis GitHub. La vérification des champs obligatoires empêche mécaniquement de publier un chiffre sans source ou une page sans date.

> **Décision 10.** Astro, ou une autre option.

### L'hébergement

| Option | Avantage | Réserve |
|---|---|---|
| **A. Cloudflare Pages** | Le domaine est déjà derrière Cloudflare, vraies 301 par fichier de règles, vraie 404, maîtrise des en-têtes | Demande un accès au compte Cloudflare |
| B. GitHub Pages | Déjà en place et gratuit, la maquette y est publiée | Pas de règles de redirection, les 301 devraient passer par Cloudflare de toute façon |
| C. Vercel ou Netlify | Mêmes possibilités que Cloudflare | Un fournisseur de plus à gérer |

**Mon avis, option A**, puisque Cloudflare est déjà dans la chaîne.

> **Décision 11.** L'hébergement, et qui a les accès.

### Ce que le socle garantit, point par point contre ta consigne

| Exigence | Comment elle est tenue |
|---|---|
| Contenu éditorial dans le HTML servi | Astro sort du HTML statique, je le prouverai par une requête curl collée dans le CHANGELOG |
| robots.txt ouvert aux robots d'IA | Fichier écrit à la main, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot et Google-Extended nommés et autorisés, avec le commentaire indiquant que c'est une décision de la direction |
| sitemap.xml avec lastmod réel | Généré à la construction, la date vient du champ `modifie_le` de chaque fichier |
| llms.txt | Généré à la construction à partir des mêmes fichiers, une ligne de description par page canonique |
| JSON-LD par page | Un composant par type, posé par le gabarit de chaque page, donc impossible à oublier |
| Titres et descriptions uniques | Champs obligatoires, la construction échoue si l'un manque |
| Dates et auteur visibles | Composant de pied de page de contenu, alimenté par les champs obligatoires |
| Un seul H1 par page | Le H1 vient du titre du fichier, les gabarits n'en produisent pas d'autre |
| Images | Astro produit les formats AVIF et WebP, pose les dimensions et le chargement différé. Le texte de remplacement est un champ obligatoire |
| Adresses stables et 301 | Fichier de redirections, une ligne par adresse abandonnée |
| Lighthouse au-dessus de 90 | Mesuré à chaque lot, avant et après |
| Responsive à 360, 768 et 1440 px | Le CSS de la maquette est repris, les captures sont faites aux trois largeurs |

---

## 7. Données structurées, ce qui est posé où

| Page | Balisage |
|---|---|
| Toutes | `BreadcrumbList`, et `WebSite` sur l'accueil |
| Toutes | `Organization` de la Fondation, avec `parentOrganization` vers Green-Got, `sameAs` vers l'annuaire Fondation de France, LinkedIn, Wikipédia, Instagram et YouTube, `foundingDate`, `logo`, `email` |
| Faits et chiffres | `FAQPage` |
| Un projet | `Article` avec `author`, `datePublished` et `dateModified`, plus une `Organization` pour le partenaire financé et un `FundingScheme` ou un `MonetaryGrant` si les montants sont publiables |
| Une publication | `Article`, et `VideoObject` pour les documentaires |
| Un évènement | `Event`, déjà écrit dans la maquette pour le 17 septembre, à généraliser aux quatre |
| La Fondation | `AboutPage`, plus `Person` pour chaque membre du comité |
| Contact | `ContactPage` |

Sur les liens `sameAs`, l'audit a trouvé l'article Wikipédia, `https://fr.wikipedia.org/wiki/Green-Got`, l'Instagram et la chaîne YouTube. Il manque deux adresses.

> **Décision 12.** L'adresse exacte de la fiche de la Fondation dans l'annuaire de la Fondation de France, celle que j'ai testée renvoie une erreur 404.

> **Décision 13.** L'adresse de la page LinkedIn de la Fondation.

---

## 8. Fiche d'identité unique

Un seul fichier de données, lu par toutes les pages. Personne ne réécrit ces phrases à la main, elles sont recopiées mécaniquement, ce qui rend l'incohérence impossible.

```yaml
nom: Fondation Green-Got
statut: fondation abritée par la Fondation de France
objectif: 15 millions d'euros collectés d'ici 2030
perimetre: santé environnementale, pesticides, pollution plastique, PFAS, recherche
positionnement: La Fondation Green-Got finance les combats que le système bancaire ignore.
montant_cumule: À VALIDER
montant_cumule_date: À VALIDER
annee_creation: À VALIDER
comite: À VALIDER
valeurs: À VALIDER
```

Le comité tel qu'il figure aujourd'hui dans la maquette, à confirmer. Andréa Ganovelli, Aurélie Baulard, Chloé Charrier, Marianne Josselin, Thibaut Gabrillargues.

Un contrôle automatique vérifiera à chaque construction qu'aucune page ne réécrit le statut autrement, et qu'aucune variante orthographique du nom ne s'est glissée dans les textes.

> **Décision 14.** La phrase exacte du statut, mot pour mot, que je recopierai partout. Ta consigne dit « fondation abritée par la Fondation de France ». Le site en ligne dit « abritée à la Fondation de France ». La maquette dit « fonds abrité par la Fondation de France ». Juridiquement, un fonds abrité et une fondation abritée ne sont pas la même chose, il faut la bonne.

> **Décision 15.** L'année de création, le montant cumulé versé et sa date d'arrêté, les valeurs.

---

## 9. Passe éditoriale, ce qui doit changer dans les textes

L'audit a relevé deux infractions à tes règles, et un point de hiérarchie.

**Le mot banque appliqué à Green-Got.** Le site en ligne écrit « des frais à la banque qui a permis la transaction, celle de votre carte ». Cette phrase disparaît. Green-Got est un établissement de paiement et un service financier.

**La Fondation reliée à la carte et aux arrondis.** Le site en ligne explique la déduction fiscale par « les dons réalisés via l'arrondi avec la carte Green-Got ». La maquette titre le mécanisme « D'un paiement par carte à une berge nettoyée » et détaille la commission d'interchange. Je propose de remplacer tout cela par une mention sobre sur la seule page La Fondation, du type « La Fondation est financée par le mécénat de Green-Got », sans mise en scène du mécanisme, et de retirer la chaîne carte, commission, berge de partout ailleurs.

**Hiérarchie des titres.** La page La Fondation enchaîne un H1, puis deux H3, puis deux H2. Les H3 passent en H2.

**Tirets et deux points.** Le titre du site en ligne, « Fondation Green-Got — Agir pour un avenir sans pollution », contient un tiret cadratin. Il est réécrit.

> **Décision 16.** La phrase exacte qui décrit le financement de la Fondation sur la page La Fondation.

---

## 10. Composants à créer

| Composant | Rôle |
|---|---|
| `Base` | Le gabarit commun, en-tête, pied de page, métadonnées, JSON-LD de l'organisation |
| `Nav` | La navigation, reprise de la maquette |
| `Pied` | Le pied de page, avec le lien discret vers green-got.com |
| `FilAriane` | Le fil d'Ariane visible et son `BreadcrumbList` |
| `Signature` | Date de publication, date de mise à jour et auteur, en clair et en `<time>` |
| `Chiffre` | Un chiffre, son libellé, sa date et le lien vers sa source. Refuse de s'afficher sans source |
| `AValider` | La mention À VALIDER, en orange, impossible à ne pas voir |
| `FicheIdentite` | Les phrases de la fiche d'identité, recopiées depuis le fichier de données |
| `CarteProjet` | Une ligne de projet dans l'index |
| `CarteEvenement` | Une ligne d'évènement dans le programme |
| `Carte` | La carte de France et l'encart Indonésie, reprise de la maquette, en image vectorielle servie dans le HTML |
| `Question` | Une question et sa réponse, alimente aussi le `FAQPage` |
| `Image` | Une image, formats modernes, dimensions, chargement différé, texte de remplacement obligatoire |
| `JsonLd` | Pose un bloc de données structurées, un par type |

### Composants à modifier ou à reprendre de la maquette

Le CSS entier, les variables de couleur dont le vert profond `#131B00` et le vert clair `#CDFB6E`, les deux polices hébergées localement, le tracé du renard, les ruptures de mise en page, les révélations au défilement, le lien d'évitement, la fermeture du menu à la touche d'échappement.

### Ce qui disparaît

Le routeur par ancre, remplacé par de vraies adresses. La fonction `renderAction` qui construit les fiches par script, remplacée par des pages. La fonction `pruneTodo`, remplacée par le composant `AValider`. Le traceur Lovable. Le fichier JavaScript de 511 Ko.

---

## 11. Découpage en lots et effort

L'effort est donné en séances de travail, à titre indicatif. Un commit par lot, message court en français, aucun déploiement.

| Lot | Contenu | Effort | Bloqué par |
|---|---|---|---|
| **0** | Remise en état du dépôt local, fusion de `passe-responsive` dans `main`, mise en place de `CHANGELOG.md` | 1 | Décisions 1 et 2 |
| **1** | Socle Astro, gabarit de base, navigation, pied de page, CSS repris de la maquette. Une page sort en HTML pur, preuve par curl | 2 | Décision 10 |
| **2** | Fichier de fiche d'identité, composants `FicheIdentite`, `Signature`, `Chiffre`, `AValider`, `FilAriane` | 1 | Décisions 9, 14, 15 |
| **3** | Les huit projets en Markdown, l'index et les huit pages. C'est le lot qui rend lisible le contenu aujourd'hui invisible | 3 | Décisions 4, 6, 8 |
| **4** | La Fondation, Nos combats et ses sous-pages, Associations, Contact | 3 | Décisions 3, 5, 16 |
| **5** | Faits et chiffres, page canonique en questions et réponses, à partir des six questions du site en ligne enrichies | 2 | Décision 15 |
| **6** | Évènements, index et quatre fiches | 1 | |
| **7** | Publications, index, les deux documentaires et la vidéo rapatriés depuis le site en ligne | 2 | |
| **8** | Mentions légales et confidentialité, reprises de la maquette | 1 | Validation juridique |
| **9** | JSON-LD sur tous les types de page, passage au validateur schema.org | 2 | Décisions 12 et 13 |
| **10** | robots.txt, sitemap.xml, llms.txt, vraie page 404, fichier de redirections 301, script d'aiguillage des anciennes ancres | 1 | |
| **11** | Images, formats modernes, textes de remplacement, vidéo, mesure Lighthouse et corrections jusqu'à dépasser 90 | 3 | Photos manquantes de Planète Urgence et Coral Guardian |
| **12** | Recette finale, curl sur chaque type de page, contrôle des liens, contrôle de la fiche d'identité, contrôle du mot banque, `CHANGELOG.md` complet | 1 | |
| **13** | Préparation de la bascule du domaine, note opératoire pour Cloudflare, sans exécution | 1 | Décision 11 |

Total indicatif, vingt-quatre séances. Les lots 0 à 3 sont le chemin critique, ils suffisent à faire passer le contenu le plus précieux de l'invisibilité à la lisibilité.

### Ordre proposé

Les lots 0, 1, 2 et 3 d'abord, dans cet ordre, ils sont liés. Ensuite 4, 5, 6, 7 et 8 dans l'ordre que tu veux, ils sont indépendants. Puis 9, 10, 11 et 12, qui demandent que toutes les pages existent. Le lot 13 en dernier.

---

## 12. Ce qui restera hors du dépôt

| Sujet | Qui décide |
|---|---|
| Bascule du domaine `fondation.green-got.com` de Lovable vers le nouvel hébergement | Accès Cloudflare, plus la personne qui gère Lovable |
| Arrêt du compte Lovable et de son traceur | Direction |
| Validation juridique des mentions légales et de la politique de confidentialité | Juridique |
| Photos de Planète Urgence et Coral Guardian, et fichiers en haute résolution | Communication |
| Image de partage dédiée au format 1200 × 630 | Communication |
| Master vidéo en haute définition pour l'accueil, l'actuel fait 854 × 480 pour 6,4 Mo | Communication |
| Fichier vectoriel officiel du renard, le tracé actuel vient d'une image basse résolution | Communication |
| Fiche de la Fondation dans l'annuaire de la Fondation de France, à créer ou à corriger pour qu'elle dise la même chose que le site | Toi |
| Outil de mesure d'audience conforme à la politique de Green-Got, aucun n'est prévu | Direction |
| Formulaire de candidature des associations, aujourd'hui externe sur `candidaturefondation.green-got.com` | Toi |

---

## 13. Les seize décisions, en un coup d'œil

| № | Décision | Mon avis |
|---|---|---|
| 1 | Base de départ | Maquette du dépôt |
| 2 | Branche de départ | `passe-responsive` |
| 3 | Garder Nos combats et Associations | Oui |
| 4 | Projets ou actions | Projets, partout |
| 5 | Deux combats ou trois | En attente, c'est à toi |
| 6 | Adresses de projet courtes ou explicites | Explicites |
| 7 | Sort de la page Nous soutenir | La garder |
| 8 | Montants des soutiens publiables | En attente, c'est à toi |
| 9 | Nom de l'auteur affiché | Un nom de personne |
| 10 | Générateur | Astro |
| 11 | Hébergement | Cloudflare Pages |
| 12 | Adresse de la fiche annuaire Fondation de France | En attente |
| 13 | Adresse LinkedIn de la Fondation | En attente |
| 14 | Phrase exacte du statut | En attente, point juridique |
| 15 | Année de création, montant cumulé, valeurs | En attente |
| 16 | Phrase sur le financement de la Fondation | En attente |

Six décisions me suffisent pour ouvrir le lot 0 et le lot 1, les numéros 1, 2, 10 et 11. Les autres peuvent arriver au fil des lots.

---

*Fin de la phase 2. Je m'arrête ici et j'attends ta validation avant de toucher au code.*
