FROM node:8
FROM keymetrics/pm2:latest-alpine

# Create app directory
WORKDIR ~/dock/withyoufriends

COPY package.json ./
RUN npm install
COPY . .

RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json" ]
EXPOSE 3007
