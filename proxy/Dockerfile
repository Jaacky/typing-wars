FROM nginx:1.15-alpine

RUN echo $'\ndaemon off;' >> /etc/nginx/nginx.conf
RUN cat /etc/nginx/nginx.conf

EXPOSE 80 443
WORKDIR /etc/nginx

ENTRYPOINT ["nginx"]