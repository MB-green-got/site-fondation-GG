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
    Formulation validée par Marie Bénédicte le 18 septembre 2026. Une
    fondation abritée, pas un fonds abrité, les deux ne sont pas la même
    chose juridiquement. Cette phrase est recopiée telle quelle partout.
  */
  statut: 'fondation abritée par la Fondation de France',
  statutAValider: false,

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
  /*
    Arrêté avec Marie Bénédicte le 18 septembre 2026.

    Green-Got finance ces projets depuis 2022. La Fondation, créée en 2026 et
    abritée par la Fondation de France, porte désormais ces financements. Les
    deux dates ne disent donc pas la même chose et le site ne doit jamais
    attribuer à la Fondation un versement antérieur à sa création.
  */
  /*
    Décision de Marie Bénédicte du 18 septembre 2026, maintenue après
    réconciliation. Le registre financier et les tableaux de suivi donnent
    1 668 582 € versés à ce jour, et 1 868 582 € si le plan 2026 est tenu
    jusqu'en décembre. L'écart avec le chiffre affiché est consigné dans
    CHANGELOG.md. La page Soutiens passés publie le détail par association,
    dont la somme est vérifiable.
  */
  montantCumule: {
    valeur: 'Plus de 2,5 millions d\'euros versés aux associations depuis 2022',
    sourceTitre: 'FAQ Green-Got',
    sourceUrl: 'https://faq.green-got.com',
    aValider: 'La mise à jour de la FAQ de Green-Got, qui annonce encore près de 2 millions d\'euros. Le détail publié sur la page Soutiens passés totalise 1 668 582 € versés à ce jour, arrêtés au 18 septembre 2026.',
  },
  anneeCreation: '2026',
  /* Green-Got finance ces projets depuis cette année-là, avant la Fondation. */
  anneeFinancementParGreenGot: '2022',

  /* Composition confirmée par Marie Bénédicte le 18 septembre 2026. */
  comite: {
    aValider: false,
    quoi: null,
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

  /* Adresse de contact, arrêtée le 18 septembre 2026. */
  contact: 'impact@green-got.com',

  /* Auteur affiché sur les pages de contenu, arrêté le 18 septembre 2026. */
  auteurParDefaut: 'L\'équipe de la Fondation Green-Got',
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
  { url: '/nous-soutenir', libelle: 'Nous soutenir' },
  { url: '/publications', libelle: 'Publications' },
  { url: '/contact', libelle: 'Contact' },
  { url: '/mentions-legales', libelle: 'Mentions légales' },
  { url: '/confidentialite', libelle: 'Confidentialité' },
];

export const reseaux = [
  { url: 'https://www.instagram.com/fondation_green_got/', libelle: 'Instagram' },
  { url: 'https://www.youtube.com/@green-got', libelle: 'YouTube' },
];
