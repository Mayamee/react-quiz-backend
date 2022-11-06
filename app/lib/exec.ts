import { writeToServiceLog } from './fileWrite'

export function exec(maxRetries: number, repeatIn = 3000) {
  let retries = 0
  const repeat = async (app: () => Promise<void>) => {
    if (retries >= maxRetries) {
      throw new Error('Max retries reached')
    }
    try {
      await app()
      retries = 0
    } catch (error: any) {
      retries++
      console.error(error)
      if (error instanceof Error) {
        writeToServiceLog(
          `${new Date().toUTCString()}\t${error.message}\t${retries}/${maxRetries}\n`
        )
      }
      await new Promise((resolve) => setTimeout(resolve, repeatIn))
      repeat(app)
    }
  }
  return repeat
}
