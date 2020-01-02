# build environment
FROM node:11.10.1-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY client/package.json .
COPY client/webpack.congif.js  .

COPY client/src  ./src
COPY client/public  ./public

RUN apk add --no-cache make gcc g++ python git \
    && npm install --silent \
    && npm run build



# production environment
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8002

CMD ["nginx", "-g", "daemon off;"]
