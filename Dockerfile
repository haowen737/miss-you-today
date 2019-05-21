FROM node:10.15.3-alpine
FROM keymetrics/pm2:latest-alpine

# you'll likely want the latest npm, regardless of node version, for speed and fixes
# but pin this version for the best stability
RUN npm i npm@latest -g

# ARG PATH="/home/dock/withyoufriends"

WORKDIR /home/dock/withyoufriends
# install dependencies first
COPY package.json .
RUN npm install --silent

# COPY ./client/package.json /home/dock/withyoufriends/client

# Create app directory
WORKDIR /home/dock/withyoufriends
COPY . .
RUN npm run build

WORKDIR /home/dock/withyoufriends/client
RUN npm install --silent && npm run build && rm -rf node_modules

WORKDIR /home/dock/withyoufriends
RUN ls -al

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# expose port
ARG PORT=3007
ENV PORT $PORT
EXPOSE $PORT

CMD [ "pm2-runtime", "start", "pm2.json" ]
