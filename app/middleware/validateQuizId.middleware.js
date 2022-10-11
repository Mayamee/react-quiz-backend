import pkg from 'mongoose'
const { Types } = pkg
import ApiError from '../error/ApiError.js'

export default function validateQuizId(req, _res, next) {
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
