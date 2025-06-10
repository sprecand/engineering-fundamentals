# Build, Publish and Code Quality analysis in CI
This readme helps you to create an CI environment which builds your project, publishes it to Azure Container Registry and executes Code Quality Analsis.

### Prerequisites
- Be part of ipt Sandbox subscription on Azure
- Be part of ipt organisation in Github

### Branches
- **baseline**: Starting point to solve exercices
- **main**: Example solution (Musterlösung)

# Setup verification
Check your setup by running the component locally by executing the following commands in the root of this repo.
```bash
npm install
npm run dev
```

## PART A - Automatic Unit Tests
### Create a unit test
In the src directory there is the main App.tsx file. There we use the ``src/Counter.tsx`` component to implement a button 
which increments its counter everytime it is clicked. Write a Unit Test for the ``src/Counter.tsx`` component in the 
``src/__tests__`` folder.

If you are not using jest for implementing the unit tests change in the ``package.json`` the following line to the scripts section:
```json lines
{
  "test": "jest"
}
```
Now Execute your implemented unit test by running
```bash
npm test
```

### Automated test execution
Adapt GitHub Actions workflow in the ``.gibhub/workflows`` directory such, that the unit tests are executed for every merge request and every push to the main 
branch.

## PART B - Continuous Integration

### Create Azure Container Registry
1. Create a **public** fork of this Github repo **in your private github namespace** (this is required as we are using the FREE version of SonarCloud later on) \
  a) Either: Hit '+' in top right of your Github, select 'Import Repository'. Your ipt github user and an access token is required to clone the repo. \
  b) Or, create an empty repository in your personal github namespace and execute this in your local terminal:
```
git checkout git@github.com:iptch/engineering-fundamentals.git
git remote remove origin
git remote add origin https://github.com/<YourUsername>/<YourRepoName>.git
git push
```
2. Create Codespace (https://github.com/YourUsername/YourRepoName &rarr; Code &rarr; Codespaces) and install the azure cli
```
pip install azure-cli
```
3. Log in to azure, ensure to be part of ipt Sandbox subscription
4. Create your own container registry on https://portal.azure.com/#browse/Microsoft.ContainerRegistry%2Fregistries \
    a) You will need to create a new resource group. Use default configs for resource group and container registry. \
    b) Use your initials (e.g. SZE) as prefix for Resource Group
5. Get password of your ACR from your (local) Terminal. For the moment, we are using the ACR Admin credentials for publishing images to the ACR.
```
az login
az acr update --name <My-Azure-ACR> --admin-enabled true
az acr credential show --name <My-Azure-ACR>
```
6. save (first) password as ACR_PASSWORD in github project settings &rarr; Secrets and variables &rarr; Actions &rarr; Repository secrets

### Publish your Webapp to ACR using gitlab pipelines
Follow the **Tasks A - C** in docker-publish.yml. Check that the Actions in your GitHub are executed properly.

### Run ACR image on your local machine (optional)
If Docker is available on your local machine, you can try to run your ACR image locally
```
az acr credential show --name <My-Azure-ACR>
sudo docker login <My-Azure-ACR>.azurecr.io -u <My-Azure-ACR>
sudo docker run -p 3000:3000 <My-Azure-ACR>.azurecr.io/ipt-spins:latest
```

## PART C - Continuous Deployment
In this section you are going to create a GitHub Action which runs after the publishing to Azure was successful. 
For this you will need the following:
1. A service plan in azure (choose the free option)
2. Create a Web App in azure, where this application is deployed
3. A Service Principal in Azure which has the contributor role on your resource
4. Create a new workflow for GitHub

## PART D - Code Quality

### Create SonarCloud Project
1. Login to SonarCloud.io using your **Github Account**
2. Create a new SonarCloud project (within our private SonarCloud organisation) for your github repository (stored in your private github account)
    a) Select 'Previous version' when prompted
3. Create a Security Token (My Account &rarr; Security) and store it in your github project settings as SONAR_TOKEN
4. In the project settings under 'Analysis Method', disable 'Automatic Analysis'. This allows us to use CI Analysis, which provides more control over when the repository is analysed and which data is incorporated (for example test coverage reports).
5. Optional: Check the "Quality Gates" section in your SonarCloud organisation. Your can add and customize your own quality gates.

### Extend your GitHub Actions to use SonarCloud
1. Follow the **Task D** in docker-publish.yml to enable SonarCloud analysis for each new Pull Request.
2. Observe your issues in SonarCloud, namely in App.tsx and Dockerfile. Fix them.

## PART E - Security (Optional)

### Use OIDC instead of Admin credentials
Instead of using the ACR Admin credentials, extend your setup to use OIDC.

## PART F - GitOps (Optional)

### Use ArgoCD
Replace the deployment github action in PART C with ArgoCD.
