# Avanti AI Innovators

Astro + TypeScript website with PostgreSQL content in English, Spanish and Portuguese.
The active application is src/. The retained C# files are historical reference only.

## Local setup

Use Node 24 LTS and Docker Desktop. Run:

    npm ci
    npm run setup:local
    docker compose up -d db
    npm run db:migrate
    npm run db:seed
    ./docker-build.ps1

Open http://localhost:3204/en/ (also /es/ and /pt/).
The old preview remains at http://localhost:3203 for comparison.

Pages are generated from PostgreSQL when you build; the public server has no database credentials.
See docs/astro-migration.md for editing, translations, imports, validation and backups.

The production container is published at https://avanticomplex.com/ through the dedicated Cloudflare Tunnel `avanti-ai-innovators-web`. Both the root and `www` hostnames are proxied through that tunnel to the loopback-only web container on port 3204.
