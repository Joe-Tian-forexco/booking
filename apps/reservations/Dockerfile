FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./
COPY tsconfig.json tsconfig.json

RUN corepack enable && \
    yarn set version 4.1.1 && \
    yarn install

COPY . .

RUN yarn build

FROM node:18-alpine As production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY .yarnrc.yml ./

RUN corepack enable && \
    yarn set version 4.1.1 && \
    yarn workspaces focus && \
    yarn install

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]