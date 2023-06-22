FROM node:20
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
CMD ["npm", "run", "build"]
CMD ["serve", "-s", "build", "-l", "3333"]
