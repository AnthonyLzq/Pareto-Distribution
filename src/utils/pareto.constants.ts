const baseMoneyFromStatus = {
  a: parseInt(process.env.BASE_MONEY_A as string),
  b: parseInt(process.env.BASE_MONEY_B as string),
  c: parseInt(process.env.BASE_MONEY_C as string),
  d: parseInt(process.env.BASE_MONEY_D as string),
  e: parseInt(process.env.BASE_MONEY_E as string),
}
const exchangeValue: number = parseInt(process.env.EXCHANGE_VALUE as string)
const iterations: number = parseInt(process.env.ITERATIONS as string)
const peopleMoney: Array<number> = []
const peopleNumber: number = parseInt(process.env.PEOPLE_NUMBER as string)

const resultsPath = `./${process.env.RESULTS_PATH}`

export {
  baseMoneyFromStatus,
  exchangeValue,
  iterations,
  peopleMoney,
  peopleNumber,
  resultsPath
}
