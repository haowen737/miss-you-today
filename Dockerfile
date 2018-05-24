FROM node:8
FROM keymetrics/pm2:latest-alpine

# Create app directory
WORKDIR ~/dock/miss

COPY package.json ./
RUN npm install
COPY . .

CMD [ "npm", "start" ]
EXPOSE 8081
