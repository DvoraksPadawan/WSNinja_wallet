FROM node:16 AS builder

WORKDIR /react-app

COPY . /react-app
COPY package.json /react-app
COPY nginx/nginx.conf /react-app

RUN yarn install
RUN yarn build

FROM nginx:latest as production
ENV NODE_ENV production

COPY --from=builder /react-app/build /usr/share/nginx/html

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
