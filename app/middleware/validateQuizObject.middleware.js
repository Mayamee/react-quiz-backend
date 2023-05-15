import validateQuizObject from '#app/lib/validateQuizObject'

export default function validateQuizObjectMiddleware(req, _, next) {
  const body = req.body
  try {
    validateQuizObject(body)
    return next()
  } catch (error) {
    return next(error)
  }
}
