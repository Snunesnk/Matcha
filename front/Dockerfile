FROM node:16

WORKDIR /front
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]

EXPOSE 5173