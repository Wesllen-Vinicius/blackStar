FROM node:latest As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN npx prisma generate

RUN yarn build




FROM node:latest as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

COPY . .

RUN npx prisma generate

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]