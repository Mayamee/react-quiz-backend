import fs from "fs";
import path from "path";

export default function writeLogToFile(pathToFile = [], logPattern = "") {
  if (pathToFile.length === 0) {
    return;
  }
  const copyOfPathToFile = pathToFile.slice();
  const fileName = copyOfPathToFile.pop();
  const filePath = path.resolve(...copyOfPathToFile, fileName);
  try {
    const isFileExists = fs.existsSync(filePath);
    if (isFileExists) {
      fs.appendFileSync(filePath, logPattern);
    } else {
      fs.mkdirSync(path.resolve(...copyOfPathToFile), { recursive: true });
      fs.writeFileSync(filePath, logPattern);
    }
  } catch (error) {
    console.error(error);
  }
}

export const writeToAccessLog = writeLogToFile.bind(null, [
  "logs",
  "access.log",
]);
export const writeToErrorLog = writeLogToFile.bind(null, ["logs", "error.log"]);

export const writeToServiceLog = writeLogToFile.bind(null, [
  "logs",
  "service.log",
]);
