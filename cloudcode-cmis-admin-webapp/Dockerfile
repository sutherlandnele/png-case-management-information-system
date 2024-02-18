# base image
FROM node:14.16.1-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
#RUN apk add tzdata && cp /usr/share/zoneinfo/Pacific/Port_Moresby /etc/localtime && apk del tzdata

COPY . /app/

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent
RUN npm rebuild node-sass

EXPOSE 3011

# start app
CMD ["npm", "start"]
