import { NextFunction, Request, Response } from 'express'
import validateQuizObject from '../lib/validateQuizObject'

export default function validateQuizObjectMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const body = req.body
  try {
    validateQuizObject(body)
    return next()
  } catch (error) {
    return next(error)
  }
}
