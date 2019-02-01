FROM node:9.6.1 as builder

RUN mkdir -p /app/public
WORKDIR /app

COPY package.json /app/package.json
COPY public/package.json /app/public/package.json

RUN npm install && cd public && npm install
RUN npm install -g @angular/cli@1.7.1 --unsafe

COPY . /app

RUN cd public && npm build

EXPOSE 3000

CMD ["npm", "start"]