FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable pnpm
WORKDIR /app
VOLUME .:/app
EXPOSE 3000
CMD [ "pnpm", "dev" ]
