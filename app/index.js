import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import { exec } from './lib/exec'
import { loggerMiddleware } from './middleware/logger.middleware'
import quizRouter from './routes/quiz.router'
import authRouter from './routes/auth.router'
import { catchErrorMiddleware } from './middleware/catchError.middleware'
import { writeToServiceLog } from './lib/fileWrite'
import path from 'path'
import fs from 'fs'
dotenv.config()
const app = express()
const PORT = process.env.SERVER_PORT || 8080
const HOST = process.env.HOST || '0.0.0.0'
const PROTOCOL = process.env.PROTOCOL || 'http'
const ORIGINS = process.env.ORIGINS ? process.env.ORIGINS.split(' ') : '*'

fs.existsSync(path.resolve('uploads')) || fs.mkdirSync(path.resolve('uploads'))
fs.existsSync(path.resolve('uploads', 'logos')) || fs.mkdirSync(path.resolve('uploads', 'logos'))

app.use('/uploads', express.static(path.resolve('uploads')))
app.use(
  cors({
    origin: ORIGINS,
    credentials: true,
  })
)
app.use(express.json())
app.use(cookieParser())
app.use(loggerMiddleware)
//Quizes
app.use('/api/quiz', quizRouter)
//Authorization
app.use('/api/auth', authRouter)
app.use('*', (_req, res) => {
  res.status(404).json({ data: 'Not found' })
})
app.use(catchErrorMiddleware)
//start app
exec(100, 15000)(main)
//start app

async function main() {
  const DB_USER = process.env.DB_USER || 'admin'
  const DB_PASSWORD = process.env.DB_PASSWORD || 'admin'
  const DB_NAME = process.env.DB_NAME || 'test'
  const DB_HOST = process.env.DB_HOST || 'localhost'
  const DB_PORT = process.env.DB_PORT || '27017'
  const DB_CONNECTION_STRING = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authMechanism=DEFAULT&authSource=admin`
  await mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  app.listen(PORT, HOST, () => {
    writeToServiceLog(`${new Date().toUTCString()}\tserver started on port ${PORT}\n`)
    console.log(`Server listening: ${HOST} port ${PORT}/tcp`)
  })
}
