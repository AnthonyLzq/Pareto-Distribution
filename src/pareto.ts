/* eslint-disable import/first */
import dotenv from 'dotenv'
import random from 'random'

dotenv.config()
import { appendFile, exists, writeFile } from './utils/writeFile'

const resultsPath = `./${process.env.RESULTS_PATH}`
const baseMoney: number = parseInt(process.env.BASE_MONEY as string)
const peopleNumber: number = parseInt(process.env.PEOPLE_NUMBER as string)
const exchangeValue: number = parseInt(process.env.EXCHANGE_VALUE as string)
const iterations: number = parseInt(process.env.ITERATIONS as string)
const peopleMoney: Array<number> = []

const avoidRepetition = (numberToAvoid: number): number => {
  let number = random.int(0, peopleNumber - 1)

  while (number === numberToAvoid) number = random.int(0, peopleNumber - 1)

  return number
}

const coinThrow = (): boolean => random.boolean()

const exchange = (
  peopleMoneyArray: Array<number>,
  chosenOne: number,
  chosenTwo: number
): void => {
  const coin: boolean = coinThrow()

  if (coin) {
    peopleMoneyArray[chosenOne] += exchangeValue
    peopleMoneyArray[chosenTwo] -= exchangeValue
  } else {
    peopleMoneyArray[chosenOne] -= exchangeValue
    peopleMoneyArray[chosenTwo] += exchangeValue
  }
}

const generateRandomPositionAvoidingCeroValue = (
  peopleMoneyArray: Array<number>,
  previousValue?: number
): number => {
  let value: number = random.int(0, peopleNumber - 1)

  if (previousValue === undefined)
    while (peopleMoneyArray[value] <= 0) value = random.int(0, peopleNumber - 1)
  else
    while (peopleMoneyArray[value] <= 0 || previousValue === value)
      value = avoidRepetition(previousValue)

  return value
}

const init = (
  numberOfPeople: number,
  peopleMoneyArray: Array<number>
): void => {
  for (let i = 0; i < numberOfPeople; i++) peopleMoneyArray.push(baseMoney)
}

const paretoSimulation = (peopleMoneyArray: Array<number>): void => {
  const chosenOne: number = generateRandomPositionAvoidingCeroValue(
    peopleMoneyArray
  )
  const chosenTwo: number = generateRandomPositionAvoidingCeroValue(
    peopleMoneyArray,
    chosenOne
  )

  exchange(peopleMoneyArray, chosenOne, chosenTwo)
}

const main = async (
  numberOfPeople: number,
  peopleMoneyArray: Array<number>
): Promise<void> => {
  init(numberOfPeople, peopleMoneyArray)

  if (!exists(resultsPath))
    try {
      await writeFile(peopleMoneyArray, resultsPath, null, true)
    } catch (error) {
      console.log('There was a problem trying to write the results')
      console.error(error)
    }

  for (let i = 0; i < iterations; i++) paretoSimulation(peopleMoneyArray)

  try {
    await appendFile(peopleMoneyArray, resultsPath, iterations)
  } catch (error) {
    console.log('There was a problem trying to append the results')
    console.error(error)
  }
}

main(peopleNumber, peopleMoney)
