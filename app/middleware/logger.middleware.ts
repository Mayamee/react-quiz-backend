import { Request, Response, NextFunction } from 'express'
import { writeToAccessLog } from '../lib/fileWrite'

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const logPattern = `${new Date().toUTCString()} ${req.method} ${req.url} ${req.ip} ${
    req.headers['user-agent']
  }\n`
  writeToAccessLog(logPattern)
  next()
}
