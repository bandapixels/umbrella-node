FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install && npm cache clean --force

COPY . ./app

EXPOSE 3000

CMD [ "npm", "start" ]
