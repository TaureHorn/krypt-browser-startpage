# init environment
FROM node:20
ENV NODE_ENV=production
WORKDIR /app

# install dependencies
COPY ["package*.json", "package-lock.json*", "./"]

RUN npm install --production

# copy files
COPY . .

# run server
CMD ["npm", "start"]
