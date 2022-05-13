FROM node:16 AS builder

WORKDIR /opt/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --verbose

COPY . ./

RUN yarn build

# Production environment
FROM nginx:1.20

COPY --from=builder /opt/app/build /usr/share/nginx/html

COPY infra/nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]