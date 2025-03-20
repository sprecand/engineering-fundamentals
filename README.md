node -v
npm create vite@latest ipt-goes-cicd --template react
cd ipt-goes-cicd/
code .
npm install
npm run dev

# Optional: Build docker image locally
docker build -t alpenzauber:v0.x .
docker run -p 3000:3000 alpenzauber:v0.x
