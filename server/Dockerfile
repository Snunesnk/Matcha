FROM node:16

WORKDIR /server
COPY package.json .
RUN npm install
COPY . .

CMD ["node", "server.js"]

EXPOSE 8080