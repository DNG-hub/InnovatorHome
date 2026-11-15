import { defineConfig } from 'astro/config';
import 'dotenv/config';
export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:3204',
  output: 'static',
  trailingSlash: 'always',
  build: { inlineStylesheets: 'never' },
  devToolbar: { enabled: false }
});
