FROM node:16
LABEL maintainer="ponyashcat228@gmail.com"
EXPOSE 8080
WORKDIR /usr/src/app
COPY build .
RUN ["yarn", "install", "--production=true"]
CMD ["node", "index.js"]