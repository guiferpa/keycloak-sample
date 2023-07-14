FROM node:18-alpine AS builder

WORKDIR /opt/app

COPY . .

RUN yarn install

RUN yarn build

FROM node:18-alpine

WORKDIR /opt/app

COPY --from=builder /opt/app/dist ./dist

COPY package.json .

COPY yarn.lock .

RUN yarn install --production

CMD [ "yarn", "start" ]
