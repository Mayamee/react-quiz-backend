import fs from "fs";
import path from "path";

export default function writeLogToFile(pathToFile = [], logPattern = "") {
  if (pathToFile.length === 0) {
    return;
  }
  try {
    const fileName = pathToFile.pop();
    const filePath = path.resolve(...pathToFile, fileName);
    const isFileExists = fs.existsSync(filePath);
    if (isFileExists) {
      fs.appendFileSync(filePath, logPattern);
    } else {
      fs.mkdirSync(path.resolve(...pathToFile), { recursive: true });
      fs.writeFileSync(filePath, logPattern);
    }
    console.log({ filePath, isFileExists });
  } catch (error) {
    console.error(error);
  }
}

export const writeToAccessLog = writeLogToFile.bind(null, [
  "logs",
  "access.log",
]);
export const writeToErrorLog = writeLogToFile.bind(null, ["logs", "error.log"]);
