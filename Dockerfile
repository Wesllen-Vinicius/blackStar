FROM node:18.10.0 As development

WORKDIR /usr/src/app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

RUN npx prisma generate

RUN yarn build




FROM node:18.10.0 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist

RUN npx prisma migrate deploy

CMD ["yarn", "start:prod"]