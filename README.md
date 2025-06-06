# Build, Publish and Code Quality analysis in CI
This readme helps you to create an automatic CI environment which builds your project, publishes it to Azure Container Registry and executes Code Quality Analsis.

The solutions to the below steps are found in seperate branches of this repository.

## PART A - Automatic Unit Tests

tbd DGA

## PART B - Continuous Integration

### 1 - Create Azure Container Registry
1. Log in to azure, ensure to be part of ipt Sandbox subscription
2. Create your own container registry on https://portal.azure.com/#browse/Microsoft.ContainerRegistry%2Fregistries
    a) You will need to create a new resource group. Use default configs for resource group and container registry.
    b) Use your initials (e.g. SZE) as prefix for Resource Group
3. Get password of your ACR from your (local) Terminal. For the moment, we are using the ACR Admin credentials for publishing images to the ACR.
```
az login
az acr update --name <My-Azure-ACR> --admin-enabled true
az acr credential show --name <My-Azure-ACR>
```
4. save (first) password as ACR_PASSWORD in github project settings &rarr; Secrets and variables &rarr; Actions &rarr; Repository secrets

### 2 - Publish your Webapp to ACR using gitlab pipelines
1. Create a **public** fork of this Github repo **in your private github namespace** (this is required as we are using the FREE version of SonarCloud later on)
```
git remote remove origin
git remote add origin https://github.com/YourUsername/YourRepoName.git
```
2. Follow the **Tasks A - C** in docker-publish.yml. Check that the Actions in your GitHub are executed properly.

### 3 - Run ACR image on your local machine
If Docker is available on your local machine, you can try to run your ACR image locally
```
az acr credential show --name <My-Azure-ACR>
sudo docker login <My-Azure-ACR>.azurecr.io -u <My-Azure-ACR>
sudo docker run -p 3000:3000 <My-Azure-ACR>.azurecr.io/ipt-spins:latest
```
[access Webapp on localhost:3000]

## PART C - Continuous Deployment

tbd DGA

## PART D - Code Quality

### 4 - Create SonarCloud Project
1. Login to SonarCloud.io using your **Github Account**
2. Create a new SonarCloud project (within our private SonarCloud organisation) for your github repository (stored in your private github account)
    a) Select 'Previous version' when prompted
3. Create a Security Token (My Account &rarr; Security) and store it in your github project settings as SONAR_TOKEN
4. In the project settings under 'Analysis Method', disable 'Automatic Analysis'. This allows us to use CI Analysis, which provides more control over when the repository is analysed and which data is incorporated (for example test coverage reports).
5. Optional: Check the "Quality Gates" section in your SonarCloud organisation. Your can add and customize your own quality gates.

### 5 - Extend your GitHub Actions to use SonarCloud
1. Follow the **Task D** in docker-publish.yml to enable SonarCloud analysis for each new Pull Request.
2. Observe your issues in SonarCloud, namely in App.tsx and Dockerfile. Fix them.

## PART E - Security

### 6 - Optional: Use OIDC instead of Admin credentials
Instead of using the ACR Admin credentials, extend your setup to use OIDC.


# Backup: Run Webapp locally
Here's how you can run and test your Webapp locally:
```
npm install
npm run dev
```