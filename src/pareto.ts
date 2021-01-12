/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import { config } from 'dotenv'
config()

import cliProgress from 'cli-progress'
import colors from 'colors'
import random from 'random'

import { appendFile, exists, writeFile } from './utils/writeFile'
import { CliOptions } from './classes/cli-progress.options'
import {
  baseMoneyFromStatus,
  exchangeValue,
  limitPercentagesToExchange,
  iterations,
  people,
  Person,
  peopleNumber,
  resultsPath
} from './utils/pareto.constants'

const peopleFromStatus = {
  a: (parseInt(process.env.PERCENT_FROM_A as string) * peopleNumber) / 100,
  b: (parseInt(process.env.PERCENT_FROM_B as string) * peopleNumber) / 100,
  c: (parseInt(process.env.PERCENT_FROM_C as string) * peopleNumber) / 100,
  d: (parseInt(process.env.PERCENT_FROM_D as string) * peopleNumber) / 100,
  e: (parseInt(process.env.PERCENT_FROM_E as string) * peopleNumber) / 100
}
let peopleConstant: Array<Person>
let peopleAllowed = peopleNumber

const avoidRepetition = (numberToAvoid: number): number => {
  let number = random.int(0, peopleAllowed - 1)
  while (number === numberToAvoid) number = random.int(0, peopleAllowed - 1)

  return number
}

const cleaner = (chosen: number): void => {
  const currentMoney = people[chosen].money

  // eslint-disable-next-line default-case
  switch (people[chosen].status) {
    case 'a':
      if (
        currentMoney <=
        limitPercentagesToExchange.a * baseMoneyFromStatus.a
      ) {
        peopleConstant[chosen].allowed = false
        people.splice(chosen, 1)
        peopleAllowed--
      }
      break
    case 'b':
      if (
        currentMoney <=
        limitPercentagesToExchange.b * baseMoneyFromStatus.b
      ) {
        peopleConstant[chosen].allowed = false
        people.splice(chosen, 1)
        peopleAllowed--
      }
      break
    case 'c':
      if (
        currentMoney <=
        limitPercentagesToExchange.c * baseMoneyFromStatus.c
      ) {
        peopleConstant[chosen].allowed = false
        people.splice(chosen, 1)
        peopleAllowed--
      }
      break
    case 'd':
      if (
        currentMoney <=
        limitPercentagesToExchange.d * baseMoneyFromStatus.d
      ) {
        peopleConstant[chosen].allowed = false
        people.splice(chosen, 1)
        peopleAllowed--
      }
      break
    case 'e':
      if (
        currentMoney <=
        limitPercentagesToExchange.e * baseMoneyFromStatus.e
      ) {
        peopleConstant[chosen].allowed = false
        people.splice(chosen, 1)
        peopleAllowed--
      }
      break
  }
}

const exchange = (chosenOne: number, chosenTwo: number): void => {
  const coin = random.boolean()

  if (coin) {
    people[chosenOne].money += exchangeValue
    people[chosenTwo].money -= exchangeValue
    cleaner(chosenTwo)
  } else {
    people[chosenOne].money -= exchangeValue
    people[chosenTwo].money += exchangeValue
    cleaner(chosenOne)
  }
}

const generateRandomPosition = (previousValue?: number): number => {
  let value: number = random.int(0, peopleAllowed - 1)

  if (!previousValue) return value

  while (previousValue === value) value = avoidRepetition(previousValue)

  return value
}

const init = (): void => {
  // Each status is represented by a number as follows:
  // A -> 1
  // B -> 2
  // C -> 3
  // D -> 4
  // E -> 5
  const statusCode = [1, 2, 3, 4, 5]
  for (let i = 0; i < peopleAllowed; i++) {
    const status = statusCode[random.int(0, statusCode.length - 1)]

    // eslint-disable-next-line default-case
    switch (status) {
      case 1:
        people.push(new Person(baseMoneyFromStatus.a, 'a'))
        peopleFromStatus.a--
        if (peopleFromStatus.a === 0)
          statusCode.splice(statusCode.indexOf(1), 1)
        break
      case 2:
        people.push(new Person(baseMoneyFromStatus.b, 'b'))
        peopleFromStatus.b--
        if (peopleFromStatus.b === 0)
          statusCode.splice(statusCode.indexOf(2), 1)
        break
      case 3:
        people.push(new Person(baseMoneyFromStatus.c, 'c'))
        peopleFromStatus.c--
        if (peopleFromStatus.c === 0)
          statusCode.splice(statusCode.indexOf(3), 1)
        break
      case 4:
        people.push(new Person(baseMoneyFromStatus.d, 'd'))
        peopleFromStatus.d--
        if (peopleFromStatus.d === 0)
          statusCode.splice(statusCode.indexOf(4), 1)
        break
      case 5:
        people.push(new Person(baseMoneyFromStatus.e, 'e'))
        peopleFromStatus.e--
        if (peopleFromStatus.e === 0)
          statusCode.splice(statusCode.indexOf(5), 1)
        break
    }
  }
  peopleConstant = people.slice()
}

const paretoSimulation = (): void => {
  const chosenOne = generateRandomPosition()
  const chosenTwo = generateRandomPosition(chosenOne)

  exchange(chosenOne, chosenTwo)
}

const runPareto = (options: CliOptions): void => {
  const bar = new cliProgress.SingleBar(
    options,
    cliProgress.Presets.shades_classic
  )
  bar.start(iterations, 0)

  for (let i = 0; i < iterations && people.length > 1; i++) {
    paretoSimulation()
    bar.update(i + 1)
  }

  bar.stop()
}

const main = async (): Promise<void> => {
  init()

  if (!exists(resultsPath))
    try {
      const result = await writeFile(people, resultsPath, null, true)
      console.log(result)
    } catch (error) {
      console.log('There was a problem trying to write the results')
      console.error(error)
    }

  const options = new CliOptions(
    `${colors.bold('Pareto Calculation Progress')} ${colors.cyan(
      '[{bar}]'
    )} ${colors.blue('{percentage}%')} | ${colors.bold(
      'Current exchange:'
    )} ${colors.yellow('{value}')} | ${colors.bold('Duration:')} ${colors.green(
      '{duration_formatted}'
    )}`,
    true,
    true
  )

  runPareto(options)

  try {
    const result = await appendFile(
      people.length,
      peopleConstant,
      resultsPath,
      iterations
    )
    console.log(result)
  } catch (error) {
    console.log('There was a problem trying to append the results')
    console.error(error)
  }
}

main()
