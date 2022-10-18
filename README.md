# API server for [React Quiz](https://github.com/Mayamee/react-quiz)

## Menu
- [API server for React Quiz](#api-server-for-react-quiz)
	- [Menu](#menu)
		- [Installation](#installation)
		- [Env](#env)
		- [Development](#development)
		- [Production](#production)
			- [Build code](#build-code)
			- [Docker](#docker)
			- [Docker compose](#docker-compose)


### Installation
Install dependencies
```sh
yarn install
```

### Env

<strong>IMPORTANT ❗️</strong>

<u>Create .env file following the instructions below</u>

<details>
<summary>Structure</summary>

|        Value       | Explain                                                               |
|:------------------:|-----------------------------------------------------------------------|
|     SERVER_PORT    | the port that the server will listen on (8080 by default)             |
|       APP_URL      | url of api server (used in mail)                                      |
|     CLIENT_URL     | the frontend url                                                      |
|       ORIGINS      | the array of origins                                                  |
|    BCRYPT_ROUNDS   | number of rounds for bcrypt (used to get a hash sum of the password)  |
|  JWT_ACCESS_SECRET | secret phrase for the access token (used to get a JWT access token)   |
| JWT_REFRESH_SECRET | secret phrase for the refresh token (used to get a JWT refresh token) |
|      SMTP_HOST     | host of mail server (ip or fqdn)                                      |
|      SMTP_PORT     | the port that the smtp server uses                                    |
|      SMTP_USER     | user smtp                                                             |
|   SMTP_USER_EMAIL  | the mailing address from which the letters will be sent               |
|  SMTP_API_PASSWORD | smtp user's password                                                  |
|       DB_USER      | name of user in database                                              |
|     DB_PASSWORD    | password of user in database                                          |
|       DB_NAME      | name of database                                                      |
|       DB_HOST      | host of database (ip or fqdn)                                         |
|       DB_PORT      | the port that your mongodb instance listen on                         |

</details>

Example [.env](https://gist.githubusercontent.com/Mayamee/6f2bc4e4b406653fe24d7f23247d869c/raw/592da83ae742aab6b4f6bc095f9737b1f98b00e7/.env)

### Development
For develop run
```sh
yarn dev
```

This project includes prettier

You can run command below for beautify your code
```sh
yarn prettify
```

### Production

#### Build code

Build code and move necessary files
```sh
yarn build
```
#### Docker
Build image
```sh
yarn docker:build
```
#### Docker compose

First build the project
```sh
yarn build
```
Then run [docker-compose](https://docs.docker.com/compose)
```sh
docker-compose up -d
```