// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Le dossier assets reste a la racine du depot, il est servi tel quel.
// Les polices sortent donc sur /fonts, les images sur /img, la video sur /video.
// La maquette d'origine, index.html, reste en place tant que la migration
// n'est pas finie, elle n'est pas reprise dans la construction.
export default defineConfig({
  site: 'https://fondation.green-got.com',
  publicDir: './assets',
  trailingSlash: 'never',
  build: { format: 'directory', inlineStylesheets: 'never' },
  compressHTML: true,
  integrations: [
    sitemap({
      // La date de derniere modification vient du contenu, pas de la date du fichier.
      serialize(item) {
        return item;
      },
    }),
  ],
});
