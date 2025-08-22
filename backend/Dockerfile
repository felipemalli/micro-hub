FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

RUN chown -R nestjs:nodejs /app

RUN pnpm prune --prod

USER nestjs

EXPOSE 4000

CMD ["node", "dist/main"]