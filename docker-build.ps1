$ErrorActionPreference = 'Stop'
npm run build
if ($LASTEXITCODE -ne 0) { throw 'Site build failed; running preview unchanged.' }
docker compose build web
if ($LASTEXITCODE -ne 0) { throw 'Container build failed; running preview unchanged.' }
docker compose up -d web
if ($LASTEXITCODE -ne 0) { throw 'Could not start the preview.' }
Write-Host 'Local preview updated at http://localhost:3204. No registry push or tunnel change.'
