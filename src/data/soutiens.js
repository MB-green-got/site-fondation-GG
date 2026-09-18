/*
  Les soutiens versés aux associations.

  Source, les tableaux de suivi financier de la Fondation transmis par
  Marie Bénédicte le 18 septembre 2026, recoupés avec le registre Notion
  « Financement associatif GG » arrêté au 22 août 2026. Les deux sources
  concordent au centime près, à 58 centimes près sur une ligne.

  Base retenue, tout ce qui a été versé à l'association, subventions
  décidées par le comité et arrondis fléchés par les membres confondus.
  Décision de Marie Bénédicte du 18 septembre 2026.

  Réconciliation, consignée pour mémoire.
    Subventions directes 2022 à 2025 ......  709 282,00 €
    Arrondis 2023 à 2025 ..................  659 300,39 €
    Sous-total fin 2025 ................... 1 368 582,39 €
    Deux premières tranches 2026 ..........  300 000,00 €
    Total versé à ce jour ................. 1 668 582,39 €
    Si le plan 2026 est tenu jusqu'en décembre, 1 868 582,39 €.
*/

/* Date d'arrêté des montants affichés. */
export const ARRETE_AU = '2026-09-18';

/*
  Les huit projets présentés sur le site. Montant total versé à ce jour.
  `plan2026` donne l'engagement annoncé pour l'année entière, quand il existe.
*/
export const soutiensCourants = {
  'sungai-watch': { montant: 280000, de: 2024, plan2026: 100000, enCours: true },
  'feve-fermes-en-vie': { montant: 191787, de: 2023, plan2026: 100000, enCours: true },
  'wings-of-the-ocean': { montant: 189076.28, de: 2022, plan2026: 50000, enCours: true },
  'planete-urgence': { montant: 157000, de: 2023, plan2026: null, enCours: false },
  'ecole-de-la-reparation': { montant: 100000, de: 2025, plan2026: 50000, enCours: true },
  'coral-guardian': { montant: 90000, de: 2023, plan2026: null, enCours: false },
  'the-shift-project': { montant: 60000, de: 2025, plan2026: 100000, enCours: true },
  'tara-ocean': { montant: 50000, de: 2026, plan2026: 100000, enCours: true },
};

/*
  Les associations soutenues qui n'ont pas de page sur le site. Elles
  expliquent l'écart entre les huit projets présentés et les vingt-trois
  du registre, et c'est la raison d'être de la page Soutiens passés.
*/
export const soutiensPasses = [
  { nom: 'Refuge GroinGroin', montant: 91796.43, de: 2023, a: 2025 },
  { nom: 'StopEacop', montant: 82129.18, de: 2023, a: 2025 },
  { nom: 'Cœur de Forêt', montant: 61007.34, de: 2024, a: 2025 },
  { nom: 'Just Diggit', montant: 55000, de: 2023, a: 2025 },
  { nom: 'Centre Athénas', montant: 53707.27, de: 2024, a: 2025 },
  { nom: 'Lazare', montant: 32969.32, de: 2023, a: 2024 },
  { nom: 'Climate Partner', montant: 31665, de: 2022, a: 2023 },
  { nom: 'Team for the Planet', montant: 29280.7, de: 2023, a: 2024 },
  { nom: 'Sorority', montant: 27081.21, de: 2023, a: 2024 },
  { nom: 'La Cloche', montant: 24670.13, de: 2023, a: 2024 },
  { nom: 'EcoTree', montant: 18000, de: 2023, a: 2023 },
  { nom: 'Surfrider', montant: 14213.41, de: 2023, a: 2024 },
  { nom: 'Mollow', montant: 11683.14, de: 2023, a: 2024 },
  { nom: 'ZeroWaste', montant: 9397.34, de: 2023, a: 2024 },
  { nom: 'QuotaClimat', montant: 8118.64, de: 2023, a: 2024 },
];

export const euros = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export const depuis = (de) => (de === 2026 ? 'en 2026' : `depuis ${de}`);
export const periode = (de, a) => (de === a ? `en ${de}` : `de ${de} à ${a}`);
