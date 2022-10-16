FROM node:16
LABEL maintainer="ponyashcat228@gmail.com"
ENV SERVER_PORT=8080
EXPOSE 8080
WORKDIR /usr/src/app
COPY build .
RUN ["yarn", "install", "--production=true"]
ENTRYPOINT ["node", "index.js"]