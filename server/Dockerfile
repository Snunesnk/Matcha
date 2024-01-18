FROM node:16

WORKDIR /server
COPY package.json .
RUN npm install
RUN npm config set strict-ssl false --global
COPY . .

CMD ["npm", "run", "dev:populate"]

EXPOSE 8080