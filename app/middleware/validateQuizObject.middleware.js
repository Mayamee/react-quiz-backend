import validateQuizObject from '../lib/validateQuizObject.js'

export default function validateQuizObjectMiddleware(req, res, next) {
  const body = req.body
  try {
    validateQuizObject(body)
    return next()
  } catch (error) {
    return next(error)
  }
}
