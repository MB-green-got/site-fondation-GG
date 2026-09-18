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

export const collections = { projets };
