import fs from "fs";
import path from "path";
export function loggerMiddleware(req, res, next) {
  fs.appendFile(
    path.resolve("logs", "access.log"),
    `${new Date()} ${req.method} ${req.url} ${req.ip} ${
      req.headers["user-agent"]
    }\n`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );

  next();
}
