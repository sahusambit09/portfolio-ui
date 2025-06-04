# ───────────────────────────────────────────────────────────────────────────────
# Stage 1: Build the React app
# ───────────────────────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

# 1. Set working directory inside the container
WORKDIR /app

# 2. Copy package.json and package-lock.json first
#    so that `npm ci` can leverage Docker’s layer caching.
COPY package.json package-lock.json ./

# 3. Install dependencies exactly as specified in package-lock.json
RUN npm ci

# 4. Copy all remaining source files into /app
COPY . .

# 5. Build the production-ready static files.
#    This creates /app/build with optimized JavaScript, CSS, and HTML.
RUN npm run build

# ───────────────────────────────────────────────────────────────────────────────
# Stage 2: Serve the built files using `serve`
# ───────────────────────────────────────────────────────────────────────────────
FROM node:18-alpine

# 6. Create (and switch to) a fresh working directory in the final image
WORKDIR /app

# 7. Copy only the `build` folder from the builder stage into our final image
COPY --from=builder /app/build ./build

# 8. Copy the start.sh script into /app and make it executable
COPY start.sh ./start.sh
RUN chmod +x ./start.sh

# 9. Install `serve` globally, so start.sh can run `serve -s build`
RUN npm install -g serve

# 10. Expose port 5000 inside the container
EXPOSE 3000

# 11. When the container starts, run start.sh
CMD ["./start.sh"]
