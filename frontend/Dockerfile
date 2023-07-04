# init environment
FROM node:20
ENV NODE_ENV=production
WORKDIR /app

# install dependencies
COPY ["package*.json", "package-lock.json*", "./"]

RUN npm install --production
RUN npm install -g serve

# copy files
COPY . .

# build server
RUN npm run build

# run server
CMD ["serve", "-l", "3000", "build"]
