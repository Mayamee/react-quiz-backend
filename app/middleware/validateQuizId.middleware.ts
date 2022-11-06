import { NextFunction, Response } from 'express'
import { Types } from 'mongoose'

import ApiError from '../error/ApiError'

interface IValidateQuizIdRequest extends Request {
  params: {
    id: string
  }
}

export default function validateQuizId(req: IValidateQuizIdRequest, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    if (Types.ObjectId.isValid(id)) {
      return next()
    } else {
      throw ApiError.BadRequest('Invalid quiz id')
    }
  } catch (error) {
    next(error)
  }
}
