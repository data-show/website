import { satteri } from '@astrojs/markdown-satteri'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import { markdownImages } from './src/lib/markdown-images.ts'

export default defineConfig({
  site: 'https://www.data-show.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  image: {
    layout: 'constrained',
    responsiveStyles: false,
    breakpoints: [640, 828, 1080, 1280, 1920],
  },
  markdown: { processor: satteri({ hastPlugins: [markdownImages] }) },
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
})
