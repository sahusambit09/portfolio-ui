# ───────────────────────────────
# Single-stage: DEV MODE ONLY
# ───────────────────────────────
FROM node:18-alpine

# Let CRA bind to 0.0.0.0 so the host can reach it
ENV HOST=0.0.0.0
# optional – fixes fs notifications on some hosts (WSL, Docker Desktop)
ENV CHOKIDAR_USEPOLLING=true

# 1. Make a workspace
WORKDIR /app

# 2. Copy package manifests first (better layer-cache)
COPY package.json package-lock.json* ./

# 3. Install deps
RUN npm ci         
# or `npm install` if you don't have a lockfile

# 4. Copy the rest (src/, public/, etc.)
COPY . .

# 5. Expose CRA’s port
EXPOSE 3000

# 6. Start dev server
CMD ["npm", "start"]
