# Docker Build and Push Script

# Build the Docker image
Write-Host "Building Docker image..." -ForegroundColor Cyan
docker build -t innovatorhome .

# Tag the image for the local registry
Write-Host "Tagging Docker image..." -ForegroundColor Cyan
docker tag innovatorhome localhost:5000/innovatorhome:latest

# Push the image to the local registry
Write-Host "Pushing Docker image to local registry..." -ForegroundColor Cyan
docker push localhost:5000/innovatorhome:latest

# Print a success message
Write-Host "Docker image built, tagged, and pushed successfully!" -ForegroundColor Green