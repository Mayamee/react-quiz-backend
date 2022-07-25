import fs from "fs";
import path from "path";

export default function writeLogToFile(pathToFile = [], logPattern = "") {
  if (pathToFile.length === 0) {
    return;
  }
  try {
    const fileName = pathToFile.pop();
    const isFileExists = fs.existsSync(path.resolve(...pathToFile, fileName));
    if (isFileExists) {
      fs.appendFileSync(path.resolve(...pathToFile, fileName), logPattern);
    } else {
      fs.mkdirSync(path.resolve(...pathToFile), { recursive: true });
      fs.writeFileSync(path.resolve(...pathToFile, fileName), logPattern);
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
