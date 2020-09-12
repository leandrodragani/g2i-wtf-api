FROM node:lts-slim

EXPOSE 8888

RUN npm i npm@latest -g

RUN mkdir /usr/src/app && chown node:node /usr/src/app

WORKDIR /usr/src/app

USER node
COPY package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force

COPY . .

CMD ["npm", "start"]