import validateQuizObject from '#app/lib/validateQuizObject'

export default function validateQuizObjectMiddleware(req, _res, next) {
  const body = req.body
  try {
    validateQuizObject(body)
    return next()
  } catch (error) {
    return next(error)
  }
}
