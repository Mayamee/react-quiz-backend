const APP_URL = process.env.APP_URL || 'http://localhost:8080' // for email verification
const HOST = process.env.HOST || '0.0.0.0'
const ORIGINS = process.env.ORIGINS ? process.env.ORIGINS.split(',') : '*'
const PORT = process.env.SERVER_PORT || 8080

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  'mongodb://quiz:quiz@localhost:27017/quiz?authMechanism=DEFAULT&authSource=admin'

const SMTP_HOST = process.env.SMTP_HOST || ''
const SMTP_PORT = +process.env.SMTP_PORT || 465
const SMTP_USER = process.env.SMTP_USER || ''
const SMTP_API_PASSWORD = process.env.SMTP_API_PASSWORD || ''
const SMTP_USER_EMAIL = process.env.SMTP_USER_EMAIL || ''

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || '12345' // secret key for JWT
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || '12345' // secret key for JWT

const BCRYPT_ROUNDS = +process.env.BCRYPT_ROUNDS || 10 // password hashing

export { BCRYPT_ROUNDS }

export { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET }

export { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_API_PASSWORD, SMTP_USER_EMAIL }

export { DB_CONNECTION_STRING }

export { APP_URL, HOST, PORT, ORIGINS }
