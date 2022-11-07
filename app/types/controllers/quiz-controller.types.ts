import { Request } from 'express'

export interface IAddQuizRequest extends Request {
  body: {
    title: string
    body: string
  }
  user: {
    id: string
    username: string
  }
}

