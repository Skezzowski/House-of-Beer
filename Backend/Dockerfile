FROM node:12

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:prod"]