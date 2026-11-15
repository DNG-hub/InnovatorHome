param([switch]$Execute, [switch]$Remaining)
$ErrorActionPreference = 'Stop'
if (-not $Execute) { throw 'Publication requires an explicit -Execute and operator authorization.' }
if ($env:COMPUTERNAME -ne 'STABLE') { throw 'This release targets Stable only.' }
Set-Location (Split-Path $PSScriptRoot -Parent)
$baseline = if ($Remaining) { 'backups/remaining-notes-before.json' } else { 'backups/september-notes-before.json' }
if (-not (Test-Path $baseline)) { throw 'Create and check the pre-publication backup first.' }
$node = Join-Path (Get-Location) 'node_modules/node/bin/node.exe'
$checkOptions = @()
if ($Remaining) { $checkOptions += '--remaining' }

& $node scripts/check-september-notes.mjs stage @checkOptions
if ($LASTEXITCODE -ne 0) { throw 'Staging checks failed.' }
$oldImage = docker inspect avanti-astro-web-1 --format '{{.Image}}'
if ($LASTEXITCODE -ne 0) { throw 'Could not identify the existing Stable release.' }
$backupTag = if ($Remaining) { 'avanti-astro-web:before-remaining-notes-20260915' } else { 'avanti-astro-web:before-september-notes-20260915' }
docker tag $oldImage $backupTag
if ($LASTEXITCODE -ne 0) { throw 'Could not preserve the running image.' }

$ids = if ($Remaining) { @(33,34,35,36,37,38,39,40,41,42,44) } else { @(43,45,46,47,48) }
$files = @(foreach ($id in $ids) {
    foreach ($locale in 'en','es','pt') { "content/valeska-evolution-$id.$locale.json" }
})
& $node scripts/content.mjs save-batch @files
if ($LASTEXITCODE -ne 0) { throw 'Atomic content save failed; batch rolled back.' }
& $node scripts/check-september-notes.mjs database @checkOptions
if ($LASTEXITCODE -ne 0) { throw 'Database verification failed; do not deploy.' }
npm run build
if ($LASTEXITCODE -ne 0) { throw 'Build failed; running website unchanged.' }
& $node scripts/check-september-notes.mjs built @checkOptions
if ($LASTEXITCODE -ne 0) { throw 'Built-content checks failed; running website unchanged.' }
# Public pulls must not invoke the desktop credential helper from an SSH session.
$env:DOCKER_CONFIG = Join-Path (Get-Location) '.publication-docker'
$env:DOCKER_HOST = 'npipe:////./pipe/dockerDesktopLinuxEngine'
docker compose build web
if ($LASTEXITCODE -ne 0) { throw 'Container build failed; running website unchanged.' }
docker compose up -d --no-deps web
if ($LASTEXITCODE -ne 0) { throw 'Could not start release; preserved previous image is available.' }

$healthy = $false
for ($attempt = 0; $attempt -lt 20; $attempt++) {
    $health = docker inspect avanti-astro-web-1 --format '{{.State.Health.Status}}'
    if ($LASTEXITCODE -eq 0 -and $health -eq 'healthy') { $healthy = $true; break }
    Start-Sleep -Seconds 3
}
if (-not $healthy) { throw 'New container did not become healthy; inspect before declaring publication.' }
& $node scripts/check-september-notes.mjs live @checkOptions
if ($LASTEXITCODE -ne 0) { throw 'Live checks failed.' }
npm run test:site
if ($LASTEXITCODE -ne 0) { throw 'Site checks failed.' }
Write-Host ('Published and verified ' + $ids.Count + ' articles in EN/ES/PT on Stable only. No Git commit, registry push, or public tunnel change.')
