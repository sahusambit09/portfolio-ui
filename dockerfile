# ───────────────────────────────────────────────────────────────────────────────
# Stage 1: Build the React app
# ───────────────────────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

# 1. Set working directory inside the container
WORKDIR /app

# 2. Copy package.json and package-lock.json (or yarn.lock) first
#    so that `npm ci` (or `yarn install`) can leverage Docker layer caching.
COPY package.json package-lock.json ./

# 3. Install dependencies
#    - `npm ci` is preferred over `npm install` in CI/CD environments because it
#      installs exactly what’s in package-lock.json.
RUN npm ci

# 4. Copy the rest of your source code into the container
COPY . .

# 5. Build the production-ready static files
#    This will create a `/app/build` folder containing optimized JS/CSS/etc.
RUN npm run build

CMD ["/app/start.sh"]


