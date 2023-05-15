import fs from 'fs'
import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import { exec } from '#app/lib/exec'
import { loggerMiddleware } from '#app/middleware/logger.middleware'
import quizRouter from '#app/routes/quiz.router'
import authRouter from '#app/routes/auth.router'
import { catchErrorMiddleware } from '#app/middleware/catchError.middleware'
import { DB_CONNECTION_STRING, PORT, ORIGINS, HOST } from '#app/env'

const app = express()

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

app.use('/api/quiz', quizRouter)
app.use('/api/auth', authRouter)
app.use('*', (_req, res) => {
  res.status(404).json({ data: 'Not found' })
})
app.use(catchErrorMiddleware)

exec(1000, 15000)(main)

async function main() {
  await mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  app.listen(PORT, HOST, () => {
    console.log(`Server listening: ${HOST} port ${PORT}/tcp`)
  })
}
