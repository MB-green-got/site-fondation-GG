/*
  Fiche d'identité de la Fondation Green-Got.

  Source unique. Aucune page ne réécrit ces phrases à la main, elles sont
  recopiées mécaniquement, ce qui rend l'incohérence impossible. Une phrase
  qui change ici change partout.

  Tout champ dont la valeur est A_VALIDER s'affiche en clair et en orange
  dans la page, il n'est jamais comblé par une estimation.
*/

export const A_VALIDER = Symbol.for('a-valider');

/* Marqueur lisible dans les gabarits. */
export const aValider = (quoi) => ({ aValider: true, quoi });

export const fondation = {
  /* Orthographe à ne jamais faire varier. */
  nom: 'Fondation Green-Got',

  /*
    A VALIDER. Trois formulations coexistent aujourd'hui, « abritée à la
    Fondation de France » sur le site en ligne, « fonds abrité par la
    Fondation de France » dans la maquette, et celle retenue ci-dessous.
    Un fonds abrité et une fondation abritée ne sont pas la même chose,
    la bonne doit venir du juridique.
  */
  statut: 'fondation abritée par la Fondation de France',
  statutAValider: true,

  objectif: '15 millions d\'euros collectés d\'ici 2030',

  perimetre: [
    'santé environnementale',
    'pesticides',
    'pollution plastique',
    'PFAS',
    'recherche',
  ],

  positionnement: 'La Fondation Green-Got finance les combats que le système bancaire ignore.',

  /* Message de fond du site. */
  accroche: 'Tout n\'est pas financier. Alors on donne.',

  /* Green-Got est un établissement de paiement et un service financier. Jamais une banque. */
  fondateur: {
    nom: 'Green-Got',
    qualite: 'établissement de paiement et service financier',
    /* Phrase autonome, pour les endroits qui la citent seule. */
    qualitePhrase: 'un établissement de paiement et un service financier',
    url: 'https://green-got.com',
  },

  abriteur: {
    nom: 'Fondation de France',
    url: 'https://www.fondationdefrance.org',
  },

  /*
    En attente de tes réponses. Quand la maquette portait déjà une valeur,
    elle est rappelée dans le texte de la mention, sans être présentée comme
    un fait, puisqu'elle n'a pas de source liée.
  */
  montantCumule: aValider(
    'Le montant cumulé versé par la Fondation et sa date d\'arrêté. La maquette portait « près de 2 millions d\'euros collectés depuis 2022 », sans source liée, à confirmer et à sourcer sur le rapport annuel.'
  ),
  anneeCreation: aValider(
    'L\'année de création de la Fondation. La maquette mentionnait une collecte « depuis 2022 », ce qui n\'est pas la même chose qu\'une date de création.'
  ),
  valeurs: aValider('Les valeurs de la Fondation'),

  /*
    Comité tel qu'il figure dans la maquette, à confirmer.
    Les rôles ne sont écrits nulle part dans le dépôt.
  */
  comite: {
    aValider: true,
    quoi: 'La composition du comité et le rôle de chaque membre',
    membres: [
      { nom: 'Andréa Ganovelli', role: 'président', linkedin: 'https://www.linkedin.com/in/andr%C3%A9a-ganovelli/' },
      { nom: 'Aurélie Baulard', role: 'directrice', linkedin: 'https://www.linkedin.com/in/baulardaurelie/' },
      { nom: 'Chloé Charrier', role: 'voix des salariés', linkedin: 'https://www.linkedin.com/in/chlo%C3%A9-charrier-%F0%9F%A6%8A-3549a210b/' },
      { nom: 'Marianne Josselin', role: 'administratrice, ChangeNOW', linkedin: 'https://www.linkedin.com/in/marianne-josselin-785b03a4/' },
      { nom: 'Thibaut Gabrillargues', role: 'administrateur, rivaje', linkedin: 'https://www.linkedin.com/in/thibaut-gabrillargues-09863566/' },
    ],
  },

  /*
    Liens sameAs du balisage Organization. Deux adresses manquent,
    la fiche de l'annuaire de la Fondation de France et la page LinkedIn
    de la Fondation. Elles ne seront pas inventées.
  */
  sameAs: [
    'https://fr.wikipedia.org/wiki/Green-Got',
    'https://www.instagram.com/fondation_green_got/',
    'https://www.youtube.com/@green-got',
  ],
  sameAsManquants: [
    'Fiche de la Fondation dans l\'annuaire de la Fondation de France',
    'Page LinkedIn de la Fondation',
  ],

  /* Auteur affiché sur les pages de contenu. */
  auteurParDefaut: aValider('Le nom de l\'auteur à afficher sur les pages de contenu'),
};

/*
  Navigation principale. Le mot retenu est projets, dans les adresses,
  la navigation et les titres.
*/
export const navigation = [
  { url: '/la-fondation', libelle: 'La Fondation' },
  { url: '/nos-combats', libelle: 'Nos combats' },
  { url: '/projets', libelle: 'Projets' },
  { url: '/evenements', libelle: 'Évènements' },
  { url: '/faits-et-chiffres', libelle: 'Faits et chiffres' },
];

export const navigationSecondaire = { url: '/associations', libelle: 'Vous êtes une association ?' };

export const navigationPied = [
  { url: '/publications', libelle: 'Publications' },
  { url: '/contact', libelle: 'Contact' },
  { url: '/mentions-legales', libelle: 'Mentions légales' },
  { url: '/confidentialite', libelle: 'Confidentialité' },
];

export const reseaux = [
  { url: 'https://www.instagram.com/fondation_green_got/', libelle: 'Instagram' },
  { url: 'https://www.youtube.com/@green-got', libelle: 'YouTube' },
];
