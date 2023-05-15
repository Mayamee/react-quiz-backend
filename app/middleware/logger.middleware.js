import { writeToAccessLog } from '#app/lib/fileWrite'

export function loggerMiddleware(req, _res, next) {
  const logPattern = `${new Date().toUTCString()} ${req.method} ${req.url} ${req.ip} ${
    req.headers['user-agent']
  }\n`
  writeToAccessLog(logPattern)
  next()
}
