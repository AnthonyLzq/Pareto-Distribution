import { Person } from '../classes/person'

const baseMoneyFromStatus = {
  a: parseInt(process.env.BASE_MONEY_A as string),
  b: parseInt(process.env.BASE_MONEY_B as string),
  c: parseInt(process.env.BASE_MONEY_C as string),
  d: parseInt(process.env.BASE_MONEY_D as string),
  e: parseInt(process.env.BASE_MONEY_E as string)
}
const limitPercentagesToExchange = {
  a: parseInt(process.env.LIMIT_PERCENT_A as string) / 100,
  b: parseInt(process.env.LIMIT_PERCENT_B as string) / 100,
  c: parseInt(process.env.LIMIT_PERCENT_C as string) / 100,
  d: parseInt(process.env.LIMIT_PERCENT_D as string) / 100,
  e: parseInt(process.env.LIMIT_PERCENT_E as string) / 100
}
const rangeMoneyToExchangePerStatus = {
  a: [1, 10000],
  b: [1, 5000],
  c: [1, 1000],
  d: [1, 500],
  e: [1, 100]
}
const people: Person[] = []
const peopleNumber: number = parseInt(process.env.PEOPLE_NUMBER as string)
const resultsPath = `./${process.env.RESULTS_PATH}`

export {
  baseMoneyFromStatus,
  limitPercentagesToExchange,
  people,
  Person,
  peopleNumber,
  rangeMoneyToExchangePerStatus,
  resultsPath
}
