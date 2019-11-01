FROM node:12.13.0
WORKDIR /usr/app
RUN npm install -g nodemon

COPY package.json .
RUN npm install --quiet

COPY . .
