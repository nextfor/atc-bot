FROM node:12-alpine

WORKDIR /opt/app

ENV PORT=80

# daemon for cron jobs
RUN echo 'crond' > /boot.sh
# RUN echo 'crontab .openode.cron' >> /boot.sh
RUN apk --update add make python gcc g++

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)

COPY package*.json ./

# Bundle app source
COPY . .

RUN npm i

CMD sh /boot.sh && npm start