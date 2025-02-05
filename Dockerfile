FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm
RUN corepack prepare pnpm@10.0.0 --activate

FROM base AS dev
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install
COPY . .
EXPOSE 4000
CMD [ "pnpm", "dev" ]

FROM base AS prod
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 4000
CMD [ "sh", "-c", "pnpm build && pnpm preview" ]