/*
  Faits et chiffres. La source canonique sur la Fondation Green-Got.

  C'est la page que les moteurs de réponse citeront. Chaque réponse est donc
  courte, factuelle et autonome, elle se comprend sans le reste de la page.

  Une question dont la réponse n'est pas connue garde sa question, affiche
  À VALIDER, et n'entre pas dans le balisage FAQPage. On ne met pas dans les
  données structurées une réponse qu'on n'a pas.

  Les réponses reprises de la FAQ du site en ligne ont été réécrites pour
  respecter les règles éditoriales. Green-Got n'est jamais présenté comme une
  banque, et la Fondation n'est reliée ni aux cartes, ni aux paiements, ni
  aux arrondis.
*/

export const faits = [
  {
    q: 'Qu\'est-ce que la Fondation Green-Got ?',
    r: 'La Fondation Green-Got est une fondation abritée par la Fondation de France. Elle finance la recherche et les projets de terrain contre les pesticides, la pollution plastique et les PFAS, pour la santé environnementale. Elle a été créée par Green-Got, établissement de paiement et service financier.',
  },
  {
    q: 'La Fondation Green-Got est-elle une banque ?',
    r: 'Non. La Fondation Green-Got est une fondation abritée par la Fondation de France, elle ne propose aucun produit financier. Green-Got, qui l\'a créée, n\'est pas une banque non plus, c\'est un établissement de paiement et un service financier.',
  },
  {
    q: 'Quel est le lien entre Green-Got et la Fondation Green-Got ?',
    r: 'La Fondation est le bras philanthropique de Green-Got. Green-Got agit sur l\'origine du problème, l\'argent qui finance la pétrochimie. La Fondation agit à l\'autre bout de la chaîne, là où ces substances finissent, dans les sols, dans les rivières et dans les corps. Ce sont deux entités distinctes, la Fondation est abritée par la Fondation de France.',
  },
  {
    q: 'Qui abrite la Fondation Green-Got ?',
    r: 'La Fondation de France, reconnue d\'utilité publique en 1969. Elle porte le cadre juridique de la Fondation Green-Got, valide et exécute chaque versement, et émet les reçus fiscaux.',
  },
  {
    q: 'Quel est l\'objectif de la Fondation Green-Got ?',
    r: '15 millions d\'euros collectés d\'ici 2030.',
  },
  {
    q: 'Sur quels sujets la Fondation Green-Got intervient-elle ?',
    r: 'Santé environnementale, pesticides, pollution plastique, PFAS et recherche. Les projets financés sont rangés en trois piliers, la terre, la mer, la recherche et l\'éducation.',
  },
  {
    q: 'Quand la Fondation Green-Got a-t-elle été créée ?',
    r: null,
    aValider: 'L\'année de création de la Fondation. La FAQ de Green-Got mentionne une collecte « depuis 2022 », ce qui n\'est pas la même chose qu\'une date de création.',
  },
  {
    q: 'Combien la Fondation Green-Got a-t-elle versé à ce jour ?',
    r: null,
    aValider: 'Le montant cumulé versé et sa date d\'arrêté. La FAQ de Green-Got annonce « près de 2 millions d\'euros collectés depuis 2022 », sans source liée et sans distinguer le collecté du versé.',
  },
  {
    q: 'Qui décide des projets financés par la Fondation Green-Got ?',
    r: 'L\'équipe de la Fondation instruit les dossiers en suivant une grille de critères et présélectionne les projets. Le comité les évalue et les valide, une voix par administrateur, personne n\'est rémunéré. Aucun projet n\'est financé sans ce vote. La Fondation de France valide et exécute ensuite le versement.',
  },
  {
    q: 'Qui siège au comité de la Fondation Green-Got ?',
    r: null,
    aValider: 'La composition du comité et le rôle de chaque membre. Cinq personnes figurent sur la page La Fondation, à confirmer.',
  },
  {
    q: 'Comment la Fondation Green-Got est-elle financée ?',
    r: 'Par le mécénat de Green-Got. Le détail figure sur la page La Fondation.',
    lien: { url: '/la-fondation', libelle: 'La Fondation' },
  },
  {
    q: 'Quels projets la Fondation Green-Got finance-t-elle ?',
    r: 'FEVE Fermes En Vie, Planète Urgence, Sungai Watch, Wings of the Ocean, la Fondation Tara Océan, Coral Guardian, The Shift Project et l\'École de la Réparation. Chaque projet a sa page, avec son porteur, son lieu, ses chiffres et sa source.',
    lien: { url: '/projets', libelle: 'Les projets financés' },
  },
  {
    q: 'Comment candidater à un soutien de la Fondation Green-Got ?',
    r: 'Le dossier décrit le projet, son territoire, son budget et ce que le soutien permettrait de faire. Il se dépose sur candidaturefondation.green-got.com. L\'équipe répond sous un mois.',
    lien: { url: '/associations', libelle: 'Comment candidater' },
  },
  {
    q: 'Les dons à la Fondation Green-Got sont-ils déductibles des impôts ?',
    r: 'Oui, à hauteur de 66 % du montant versé, dans la limite de 20 % du revenu imposable, au titre de l\'article 200 du code général des impôts. C\'est la Fondation de France, reconnue d\'utilité publique, qui émet les reçus fiscaux. Même lorsque le donateur déduit une partie du don, les associations reçoivent 100 % de la somme.',
  },
  {
    q: 'Comment soutenir la Fondation Green-Got ?',
    r: null,
    aValider: 'La manière dont le site doit décrire le soutien à la Fondation. La FAQ du site en ligne répond par la carte Green-Got et l\'arrondi des dépenses, ce que les règles éditoriales interdisent dans le corps des pages. Il manque une voie de don qui ne passe pas par l\'ouverture d\'un compte.',
  },
  {
    q: 'Où se rencontrer avec la Fondation Green-Got ?',
    r: 'La Fondation organise des rendez-vous sur le terrain, dépollutions, visites de fermes et rencontres avec les chercheurs financés. Le programme dit le lieu, l\'horaire et qui peut venir.',
    lien: { url: '/evenements', libelle: 'Les prochains rendez-vous' },
  },
];
