node -v
npm create vite@latest ipt-goes-cicd --template react
cd ipt-goes-cicd/
code .
npm install
npm run dev

# Optional: Build docker image locally
docker build -t alpenzauber:v0.x .
docker run -p 3000:3000 alpenzauber:v0.x

# Publish to Azure Container Registry
Log in to azure, enzure to be part of ipt Sandbox subscription
Create your own container registry on https://portal.azure.com/#browse/Microsoft.ContainerRegistry%2Fregistries
az login
az acr update --name LREngineering --admin-enabled true
az acr credential show --name LREngineering
[save password as ACR_PASSWORD in github project settings &rarr; Secrets and variables &rarr; Actions &rarr; Repository secrets]

# Run container from Azure Container Registry
az acr credential show --name LREngineering
sudo docker login lrengineering.azurecr.io -u LREngineering
sudo docker run -p 3000:3000 lrengineering.azurecr.io/ipt-spins:latest

# Allow github action to commit new version to repository
ssh-keygen -t ed25519 -C "github-deploy-key" -f github-deploy-key -N ""
Store public key in repository settings --> Deploy keys
Store private key in repository settings --> Secrets and variables --> Actions --> DEPLOY_PRIVATE_KEY