FROM node:24

WORKDIR /usr/src/app

COPY server/package*.json ./

RUN npm ci

COPY server/ .

CMD ["npm", "start"]