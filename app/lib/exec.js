import { writeToServiceLog } from '@app/lib/fileWrite'

export function exec(maxRetries, repeatIn = 3000) {
  let retries = 0
  const repeat = async (app) => {
    if (retries >= maxRetries) {
      throw new Error('Max retries reached')
    }
    try {
      await app()
      retries = 0
    } catch (error) {
      retries++
      console.error(error)
      writeToServiceLog(`${new Date().toUTCString()}\t${error.message}\t${retries}/${maxRetries}\n`)
      await new Promise((resolve) => setTimeout(resolve, repeatIn))
      repeat(app)
    }
  }
  return repeat
}
