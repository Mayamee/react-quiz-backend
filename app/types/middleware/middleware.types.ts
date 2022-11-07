import { Request } from 'express'

export interface IAuthRequest extends Request {
  headers: {
    authorization?: string
  }
  user?: any
}
export interface IValidateQuizIdRequest extends IAuthRequest {
  params: {
    id?: string
  }
}
