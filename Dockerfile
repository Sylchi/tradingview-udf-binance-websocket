FROM node:16
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
ENV NODE_ENV=production
ENV MARKET_TYPE=futures
WORKDIR /app
COPY package.json pnpm-lock.yaml
COPY . .
RUN pnpm install --production
CMD ["node", "bin/www"]
EXPOSE 3000