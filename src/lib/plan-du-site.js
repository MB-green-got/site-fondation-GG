/*
  Le plan du site, source unique du sitemap.xml et du llms.txt.

  La date de dernière modification vient du contenu, pas de la date du
  fichier sur le disque. Une correction de code ne fait donc pas passer
  toutes les pages pour modifiées.
*/
import { getCollection } from 'astro:content';

/* Les pages écrites à la main. Une ligne par page, à tenir à jour. */
const statiques = [
  { url: '/', modifieLe: '2026-09-18', titre: 'Accueil', description: 'La Fondation Green-Got finance ce qui ne rapporte rien, des rivières sans plastique, des terres sans pesticides, des mains qui apprennent à réparer.' },
  { url: '/la-fondation', modifieLe: '2026-09-18', titre: 'La Fondation', description: 'Qui nous sommes, les deux convictions, qui décide des projets financés, le comité, et le rôle de la Fondation de France qui abrite la Fondation Green-Got.' },
  { url: '/faits-et-chiffres', modifieLe: '2026-09-18', titre: 'Faits et chiffres', description: 'La page de référence sur la Fondation Green-Got, en questions et réponses. Statut, objectif, périmètre, gouvernance, déduction fiscale et candidature.' },
  { url: '/nos-combats', modifieLe: '2026-09-18', titre: 'Nos combats', description: 'Pourquoi le plastique et les pesticides viennent du pétrole, la chaîne de l\'épargne à l\'assiette, et les chiffres sourcés des deux combats.' },
  { url: '/projets', modifieLe: '2026-09-18', titre: 'Les projets financés', description: 'Tous les projets financés par la Fondation Green-Got, rangés en trois piliers, la terre, la mer, la recherche et l\'éducation.' },
  { url: '/evenements', modifieLe: '2026-09-18', titre: 'Les rendez-vous', description: 'Le programme des rendez-vous de la Fondation Green-Got, dépollutions, visites de fermes et rencontres avec les chercheurs financés.' },
  { url: '/publications', modifieLe: '2026-09-18', titre: 'Publications', description: 'Les documentaires et les films produits dans le cadre de la Fondation Green-Got.' },
  { url: '/nous-soutenir', modifieLe: '2026-09-18', titre: 'Nous soutenir', description: "Le cadre fiscal des dons à la Fondation Green-Got, qui émet les reçus, et les autres façons de soutenir le travail des projets financés." },
  { url: '/associations', modifieLe: '2026-09-18', titre: 'Associations, candidater', description: 'Les quatre étapes de la candidature à un soutien de la Fondation Green-Got, et le délai de réponse.' },
  { url: '/contact', modifieLe: '2026-09-18', titre: 'Contact', description: 'Qui joindre à la Fondation Green-Got selon le sujet.' },
  { url: '/mentions-legales', modifieLe: '2026-09-18', titre: 'Mentions légales', description: 'Éditeur, hébergement, propriété intellectuelle et crédits du site.' },
  { url: '/confidentialite', modifieLe: '2026-09-18', titre: 'Politique de confidentialité', description: 'Ce que le site collecte, ce qu\'il ne collecte pas, et comment exercer vos droits.' },
];

export async function planDuSite() {
  const projets = (await getCollection('projets')).sort((a, b) => a.data.ordre - b.data.ordre);
  const evenements = (await getCollection('evenements')).sort((a, b) => a.data.ordre - b.data.ordre);
  const publications = (await getCollection('publications')).sort((a, b) => a.data.ordre - b.data.ordre);

  return {
    statiques,
    projets: projets.map((p) => ({
      url: `/projets/${p.id}`,
      modifieLe: p.data.modifieLe,
      titre: p.data.nom,
      description: p.data.description,
    })),
    evenements: evenements.map((e) => ({
      url: `/evenements/${e.id}`,
      modifieLe: e.data.modifieLe,
      titre: e.data.resume,
      description: e.data.description,
    })),
    publications: publications.map((p) => ({
      url: `/publications/${p.id}`,
      modifieLe: p.data.modifieLe,
      titre: p.data.titre,
      description: p.data.description,
    })),
  };
}

export async function toutesLesPages() {
  const p = await planDuSite();
  return [...p.statiques, ...p.projets, ...p.evenements, ...p.publications];
}
