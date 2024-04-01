FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./

RUN corepack enable && \
    yarn set version 4.1.1 && \
    yarn install

COPY . .

RUN yarn build

FROM node:alpine As production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json yarn.lock .yarnrc.yml ./

RUN corepack enable && \
    yarn set version berry \
    yarn install --production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/payments/main"]