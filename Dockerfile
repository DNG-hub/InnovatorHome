# Package the already-validated static site; no database credentials in the image.
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=8080
COPY --chown=node:node dist ./dist
COPY --chown=node:node content/snapshot.json ./content/snapshot.json
COPY --chown=node:node scripts/serve.mjs ./scripts/serve.mjs
USER node
EXPOSE 8080
CMD ["node", "scripts/serve.mjs"]
