import fs from 'fs'
import { quickSort } from './quickSort'
import { baseMoneyFromStatus, peopleNumber } from './pareto.constants'

const peopleFromStatus = {
  a: parseInt(process.env.PERCENT_FROM_A as string)*peopleNumber/100,
  b: parseInt(process.env.PERCENT_FROM_B as string)*peopleNumber/100,
  c: parseInt(process.env.PERCENT_FROM_C as string)*peopleNumber/100,
  d: parseInt(process.env.PERCENT_FROM_D as string)*peopleNumber/100,
  e: parseInt(process.env.PERCENT_FROM_E as string)*peopleNumber/100,
}

const messageBuilder = (
  iterations: number | null,
  data: Array<number>,
  firstTime?: boolean
): string => {
  if (firstTime)
    return `Initial data:\n\tStatus A:\n\t\tQuantity of people: ${peopleFromStatus.a}\n\t\tMoney per person: ${baseMoneyFromStatus.a}\n\tStatus B:\n\t\tQuantity of people: ${peopleFromStatus.b}\n\t\tMoney per person: ${baseMoneyFromStatus.b}\n\tStatus C:\n\t\tQuantity of people: ${peopleFromStatus.c}\n\t\tMoney per person: ${baseMoneyFromStatus.c}\n\tStatus D:\n\t\tQuantity of people: ${peopleFromStatus.d}\n\t\tMoney per person: ${baseMoneyFromStatus.d}\n\tStatus E:\n\t\tQuantity of people: ${peopleFromStatus.e}\n\t\tMoney per person: ${baseMoneyFromStatus.e}\n`

  return `Result after ${iterations} iterations: \n${quickSort(data).join()}\nPeople left: ${data.length}`
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
