import ApiError from '../error/ApiError'
import { writeToErrorLog } from '../lib/fileWrite'

export const catchErrorMiddleware = (err, req, res, next) => {
  if (err instanceof ApiError) {
    const logPattern = `${new Date().toUTCString()} ${err.message} ${err.errors} ${req.method} ${
      req.url
    } ${req.ip} ${req.headers['user-agent']}\n`
    writeToErrorLog(logPattern)
    res.status(err.status).json({ message: err.message, errors: err.errors })
  } else {
    const logPattern = `${new Date().toUTCString()} ${err.message} ${req.method} ${req.url} ${
      req.ip
    } ${req.headers['user-agent']}\n`
    writeToErrorLog(logPattern)
    res.status(500).json({ message: err.message })
  }
}
