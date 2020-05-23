import fs from 'fs'

const messageBuilder = (
  iterations: number | null,
  data: Array<number>,
  firstTime?: boolean
): string => {
  if (firstTime) return `Initial data: \n${data.join()}\n`

  return `Result after ${iterations} iterations: \n${data.join()}\n`
}

const exists = (filename: string): boolean => {
  return fs.existsSync(filename)
}

const writeFile = (
  data: Array<number>,
  filename: string,
  iterations: number | null,
  firstTime?: boolean
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const message = messageBuilder(iterations, data, firstTime)

    fs.writeFile(filename, message, (error: unknown): void => {
      if (error) reject(error)
      resolve('Saved successfully')
    })
  })
}

const appendFile = (
  data: Array<number>,
  filename: string,
  iterations: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const message = messageBuilder(iterations, data)

    fs.appendFile(filename, message, (error: unknown): void => {
      if (error) reject(error)
      resolve('Saved successfully')
    })
  })
}

export { appendFile, exists, writeFile }
