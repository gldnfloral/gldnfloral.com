import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import bookshop from '@bookshop/astro-bookshop';
import sitemap from '@astrojs/sitemap';
import prefetch from '@astrojs/prefetch';

// https://astro.build/config
export default defineConfig({
  site: 'https://gldnfloral.com/',
  integrations: [bookshop(), react(), sitemap(), prefetch()],
});
