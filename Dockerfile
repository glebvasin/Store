FROM  cr.yandex/mirror/library/node:18 as builder
COPY . .
ARG REACT_APP_DEBUG
ARG REACT_APP_YANDEX_AUTH
ENV REACT_APP_DEBUG $REACT_APP_DEBUG
ENV REACT_APP_YANDEX_AUTH $REACT_APP_YANDEX_AUTH
RUN npm i --force && npm run build && rm -rf node_modules

FROM  cr.yandex/mirror/library/nginx:alpine

LABEL service.name=frontend.billed.pro


COPY --from=builder build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
CMD ["nginx-debug", "-g", "daemon off;"]