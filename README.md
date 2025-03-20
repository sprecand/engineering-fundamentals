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
az acr update --name EngFundamentals --admin-enabled true
az acr credential show --name EngFundamentals

# Run container from Azure Container Registry
az acr credential show --name EngFundamentals
sudo docker login EngFundamentals.azurecr.io -u EngFundamentals
sudo docker run -p 3000:3000 EngFundamentals.azurecr.io/ipt-spins:latest