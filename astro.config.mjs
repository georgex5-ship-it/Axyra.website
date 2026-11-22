// Site build configuration. You normally don't need to edit this file:
// the website address comes from content/settings.yaml (site.url).
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import { load as yamlLoad } from 'js-yaml';

const settings = yamlLoad(fs.readFileSync('./content/settings.yaml', 'utf8'));
const url = settings?.site?.url;
const hasDomain = !!url && !String(url).includes('[[EDIT');
const site = hasDomain ? String(url).replace(/\/$/, '') : 'https://axyra.invalid';

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  // The sitemap is only created once a real domain is set in settings.yaml.
  integrations: hasDomain ? [
    sitemap({
      filter: (page) => !page.includes('/styleguide/') && !page.includes('/question/'),
      i18n: { defaultLocale: 'en', locales: { en: 'en', ar: 'ar' } },
    }),
  ] : [],
});
