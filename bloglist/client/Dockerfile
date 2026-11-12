FROM node:24 AS build-stage

WORKDIR /usr/src/app

COPY client/package*.json ./

RUN npm install

COPY client/ .

RUN npm run build

FROM nginx:1.27-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf