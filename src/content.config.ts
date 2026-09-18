/*
  Les collections de contenu. Chaque fiche est un fichier Markdown que l'on
  peut corriger depuis GitHub sans toucher au code.

  Le schéma est la garantie du chantier. Un champ obligatoire absent fait
  échouer la construction du site. Les champs qui peuvent légitimement
  manquer acceptent la valeur null, et la page affiche alors À VALIDER en
  clair, jamais une estimation.
*/
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chiffre = z.object({
  valeur: z.string(),
  libelle: z.string(),
  /* La date du chiffre. null vaut À VALIDER. */
  date: z.string().nullable(),
  sourceTitre: z.string(),
  /* L'adresse de la source. null vaut À VALIDER. */
  sourceUrl: z.string().url().nullable(),
});

const personne = z.object({
  nom: z.string().nullable(),
  role: z.string().nullable(),
  lieu: z.string().nullable(),
  date: z.string().nullable(),
});

const projets = defineCollection({
  loader: glob({ base: './src/content/projets', pattern: '**/*.md' }),
  schema: z.object({
    nom: z.string(),
    objet: z.string(),
    titre: z.string(),
    description: z.string(),
    pilier: z.enum(['Terre', 'Mer', 'Recherche et éducation']),
    lieu: z.string(),
    lieuPrecision: z.string().nullable(),
    portee: z.enum(['national', 'point', 'world']),
    coordonnees: z.object({ lon: z.number(), lat: z.number() }).nullable(),

    finance: z.string(),
    levier: z.string(),

    /* Les cinq éléments exigés sur chaque page de projet. */
    personne,
    montant: z.string().nullable(),
    montantDate: z.string().nullable(),
    chiffres: z.array(chiffre),
    partenaire: z.object({ nom: z.string(), url: z.string().url().nullable() }),

    recit: z.array(z.object({ titre: z.string(), texte: z.string() })).default([]),
    source: z.string(),

    image: z.object({ fichier: z.string().nullable(), alt: z.string().nullable() }),

    ordre: z.number(),
    publieLe: z.string(),
    modifieLe: z.string(),
    auteur: z.string().nullable(),
  }),
});

const evenements = defineCollection({
  loader: glob({ base: './src/content/evenements', pattern: '**/*.md' }),
  schema: z.object({
    titrePage: z.string(),
    description: z.string(),
    h1: z.string(),
    resume: z.string(),
    avec: z.string(),
    /* Une date arrêtée, ou null et alors dateIncertaine porte la période. */
    debut: z.string().nullable(),
    fin: z.string().nullable(),
    dateIncertaine: z.string().nullable(),
    lieu: z.string(),
    lieuPrecision: z.string().nullable(),
    ville: z.string().nullable(),
    acces: z.enum(['ouvert', 'membres-plus-un', 'membres']),
    accesLibelle: z.string(),
    badge: z.string().nullable(),
    lede: z.string(),
    projetLie: z.string().nullable(),
    pratique: z.array(z.object({
      intitule: z.string(),
      valeur: z.string(),
      precision: z.string(),
    })),
    inscription: z.string().url().nullable(),
    inscriptionAValider: z.string().nullable(),
    image: z.object({ fichier: z.string().nullable(), alt: z.string().nullable() }),
    ordre: z.number(),
    publieLe: z.string(),
    modifieLe: z.string(),
    auteur: z.string().nullable(),
  }),
});

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.md' }),
  schema: z.object({
    titre: z.string(),
    titrePage: z.string(),
    description: z.string(),
    type: z.enum(['documentaire', 'video', 'article']),
    resume: z.string(),
    duree: z.string().nullable(),
    realisation: z.string().nullable(),
    realisationAValider: z.string().nullable(),
    lien: z.string().url().nullable(),
    lienAValider: z.string().nullable(),
    /* Identifiant YouTube, la vidéo n'est jamais intégrée par défaut, voir la page. */
    video: z.string().nullable(),
    image: z.object({ fichier: z.string().nullable(), alt: z.string().nullable() }),
    ordre: z.number(),
    publieLe: z.string(),
    modifieLe: z.string(),
    auteur: z.string().nullable(),
  }),
});

export const collections = { projets, evenements, publications };
