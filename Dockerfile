FROM node:24-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.29-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

RUN sed -i '/^user  nginx;/d; s#pid        /run/nginx.pid;#pid        /tmp/nginx.pid;#' /etc/nginx/nginx.conf \
  && chown -R nginx:nginx /usr/share/nginx/html /var/cache/nginx

USER nginx
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
