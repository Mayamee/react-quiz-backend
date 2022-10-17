import validateQuizObject from '../lib/validateQuizObject'

export default function validateQuizObjectMiddleware(req, res, next) {
  const body = req.body
  try {
    validateQuizObject(body)
    return next()
  } catch (error) {
    return next(error)
  }
}
