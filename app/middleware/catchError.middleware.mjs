import { writeToErrorLog } from "../lib/fileWrite.mjs";

export const catchErrorMiddleware = (err, req, res, next) => {
  if (err) {
    const logPattern = `${new Date().toUTCString()} ${err.message} ${
      req.method
    } ${req.url} ${req.ip} ${req.headers["user-agent"]}\n`;
    writeToErrorLog(logPattern);
    res.status(500).json({ data: "Internal server error" });
  }
};
