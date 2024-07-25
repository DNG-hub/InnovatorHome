# Define variables
$imageName = "innovatorhome"
$localRegistry = "localhost:5000"
$tag = "$localRegistry/$imageName:latest"

# Build the Docker image
Write-Host "Building Docker image..."
docker build -t $imageName .

# Tag the Docker image
Write-Host "Tagging Docker image..."
docker tag $imageName $tag

# Push the Docker image to the local registry
Write-Host "Pushing Docker image to local registry..."
docker push $tag

Write-Host "Done!"
