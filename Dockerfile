FROM node:8
FROM keymetrics/pm2:latest-alpine

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# expose port
ARG PORT=3007
ENV PORT $PORT
EXPOSE $PORT

# you'll likely want the latest npm, regardless of node version, for speed and fixes
# but pin this version for the best stability
RUN npm i npm@latest -g

# install dependencies first
COPY package.json ./
RUN npm install
RUN npm run build

# Create app directory
WORKDIR ~/dock/withyoufriends
COPY . .

RUN ls -al -R

CMD [ "pm2-runtime", "start", "pm2.json" ]
EXPOSE 80
