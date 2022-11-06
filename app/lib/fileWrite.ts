import fs from 'fs'
import path from 'path'

export default function writeLogToFile(pathToFile: string[], log: string) {
  if (pathToFile.length === 0) {
    return
  }
  const copyOfPathToFile = pathToFile.slice()
  const fileName = copyOfPathToFile.pop()
  if (!fileName) return
  const filePath = path.resolve(...copyOfPathToFile, fileName)
  try {
    const isFileExists = fs.existsSync(filePath)
    if (isFileExists) {
      fs.appendFileSync(filePath, log)
    } else {
      fs.mkdirSync(path.resolve(...copyOfPathToFile), { recursive: true })
      fs.writeFileSync(filePath, log)
    }
  } catch (error) {
    console.error(error)
  }
}

export const writeToAccessLog = writeLogToFile.bind(null, ['logs', 'access.log'])
export const writeToErrorLog = writeLogToFile.bind(null, ['logs', 'error.log'])

export const writeToServiceLog = writeLogToFile.bind(null, ['logs', 'service.log'])
