// @ts-check
import { defineConfig } from 'astro/config';

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
  // Pas d'extension sitemap. Le sitemap est ecrit dans src/pages/sitemap.xml.ts,
  // pour que la date de derniere modification soit celle du contenu et non
  // celle du fichier sur le disque.
});
