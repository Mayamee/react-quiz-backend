import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import { exec } from '@app/lib/exec'
import { loggerMiddleware } from '@app/middleware/logger.middleware'
import quizRouter from '@app/routes/quiz.router'
import authRouter from '@app/routes/auth.router'
import { catchErrorMiddleware } from '@app/middleware/catchError.middleware'
import { writeToServiceLog } from '@app/lib/fileWrite'
import path from 'path'
import fs from 'fs'
dotenv.config()
const app = express()
const PORT = process.env.SERVER_PORT || 5050
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
  await mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  app.listen(PORT, () => {
    writeToServiceLog(`${new Date().toUTCString()}\tserver started on port ${PORT}\n`)
    console.log(`Server listening on port ${PORT}`)
  })
}
