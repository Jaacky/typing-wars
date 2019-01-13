FROM node:8 AS ui-builder

WORKDIR /home/node/app
COPY . ./

RUN yarn install && yarn build

FROM nginx:1.15-alpine

COPY --from=ui-builder /home/node/app/dist /var/www/typingwars.com

WORKDIR /etc/nginx

EXPOSE 80
ENTRYPOINT ["nginx"]