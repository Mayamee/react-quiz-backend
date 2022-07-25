import fs from "fs";
import path from "path";
export function loggerMiddleware(req, _res, next) {
  const logPattern = `${new Date().toUTCString()} ${req.method} ${req.url} ${
    req.ip
  } ${req.headers["user-agent"]}\n`;
  if (fs.existsSync(path.resolve("logs", "access.log"))) {
    fs.appendFile(path.resolve("logs", "access.log"), logPattern, (err) => {
      if (err) {
        console.error(err);
      }
    });
  } else {
    fs.mkdirSync(path.resolve("logs"));
    fs.writeFileSync(path.resolve("logs", "access.log"), logPattern);
  }
  next();
}
