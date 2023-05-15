import ApiError from '#app/error/ApiError'
import { writeToErrorLog } from '#app/lib/fileWrite'

export const catchErrorMiddleware = (err, req, res, _next) => {
  if (err instanceof ApiError) {
    const logPattern = `${new Date().toUTCString()} ${err.message} ${err.errors} ${req.method} ${
      req.url
    } ${req.ip} ${req.headers['user-agent']}\n`
    console.error(logPattern)
    writeToErrorLog(logPattern)
    return res.status(err.status).json({ message: err.message, errors: err.errors })
  }
  const logPattern = `${new Date().toUTCString()} ${err.message} ${req.method} ${req.url} ${
    req.ip
  } ${req.headers['user-agent']}\n`
  console.error(logPattern)
  writeToErrorLog(logPattern)
  return res.status(501).json({ message: 'Server error' })
}
