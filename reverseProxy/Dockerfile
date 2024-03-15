FROM nginx:alpine

COPY ssl /etc/nginx/ssl
COPY default.conf /etc/nginx/conf.d

# EXPOSE 80
# CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
# WORKDIR /usr/share/nginx/html