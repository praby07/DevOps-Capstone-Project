# Small, fast base image
FROM node:20-alpine

# App lives here inside the container
WORKDIR /usr/src/app

# Install deps first (better layer caching — only re-installs if package.json changes)
COPY package*.json ./
RUN npm install --production

# Now copy the rest of the app
COPY . .

# App listens on this port (matches PORT in index.js)
EXPOSE 3000

# Basic container-level health check, hits our /health route
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "index.js"]
