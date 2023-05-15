const APP_URL = process.env.APP_URL || 'http://localhost:8080'
const HOST = process.env.HOST || '0.0.0.0'
const ORIGINS = process.env.ORIGINS ? process.env.ORIGINS.split(',') : '*'
const PORT = process.env.SERVER_PORT || 8080

const DB_USER = process.env.DB_USER || 'admin'
const DB_PASSWORD = process.env.DB_PASSWORD || 'admin'
const DB_NAME = process.env.DB_NAME || 'quiz'
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = process.env.DB_PORT || '27017'
const DB_CONNECTION_STRING = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authMechanism=DEFAULT&authSource=admin`

const SMTP_HOST = process.env.SMTP_HOST || ''
const SMTP_PORT = +process.env.SMTP_PORT || 465
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_API_PASSWORD = process.env.SMTP_API_PASSWORD || ''
const SMTP_USER_EMAIL = process.env.SMTP_USER_EMAIL || ''

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '12345'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '12345'

const BCRYPT_ROUNDS = +process.env.BCRYPT_ROUNDS || 10

export { BCRYPT_ROUNDS }

export { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET }

export { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_API_PASSWORD, SMTP_USER_EMAIL }

export { DB_CONNECTION_STRING }

export { APP_URL, HOST, PORT, ORIGINS }
