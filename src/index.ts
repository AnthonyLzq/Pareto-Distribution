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
  limitPercentagesToExchange,
  people,
  Person,
  peopleNumber,
  rangeMoneyToExchangePerStatus,
  resultsPath
} from './utils/pareto.constants'

const peopleFromStatus = {
  a: (parseInt(process.env.PERCENT_FROM_A as string) * peopleNumber) / 100,
  b: (parseInt(process.env.PERCENT_FROM_B as string) * peopleNumber) / 100,
  c: (parseInt(process.env.PERCENT_FROM_C as string) * peopleNumber) / 100,
  d: (parseInt(process.env.PERCENT_FROM_D as string) * peopleNumber) / 100,
  e: (parseInt(process.env.PERCENT_FROM_E as string) * peopleNumber) / 100
}
const peoplePositions: number[] = []

const cleaner = (chosen: number): void => {
  // const currentMoney = people[chosen].money
  const { moneyExchanged } = people[chosen]

  // eslint-disable-next-line default-case
  switch (people[chosen].status) {
    case 'a':
      if (
        // currentMoney <= limitPercentagesToExchange.a * baseMoneyFromStatus.a ||
        moneyExchanged >= limitPercentagesToExchange.a * baseMoneyFromStatus.a
      ) {
        people[chosen].allowed = false
        peoplePositions.splice(chosen, 1)
      }
      break
    case 'b':
      if (
        // currentMoney <= limitPercentagesToExchange.b * baseMoneyFromStatus.b ||
        moneyExchanged >= limitPercentagesToExchange.b * baseMoneyFromStatus.b
      ) {
        people[chosen].allowed = false
        peoplePositions.splice(chosen, 1)
      }
      break
    case 'c':
      if (
        // currentMoney <= limitPercentagesToExchange.c * baseMoneyFromStatus.c ||
        moneyExchanged >= limitPercentagesToExchange.c * baseMoneyFromStatus.c
      ) {
        people[chosen].allowed = false
        peoplePositions.splice(chosen, 1)
      }
      break
    case 'd':
      if (
        // currentMoney <= limitPercentagesToExchange.d * baseMoneyFromStatus.d ||
        moneyExchanged >= limitPercentagesToExchange.d * baseMoneyFromStatus.d
      ) {
        people[chosen].allowed = false
        peoplePositions.splice(chosen, 1)
      }
      break
    case 'e':
      if (
        // currentMoney <= limitPercentagesToExchange.e * baseMoneyFromStatus.e ||
        moneyExchanged >= limitPercentagesToExchange.e * baseMoneyFromStatus.e
      ) {
        people[chosen].allowed = false
        peoplePositions.splice(chosen, 1)
      }
      break
  }
}

const exchange = (chosenOne: number, chosenTwo: number): void => {
  const coin = random.boolean()

  // Get random value to exchange
  // It's going to be the maximal random value between two people from different status
  const exchangeValue = Math.min(
    random.int(
      rangeMoneyToExchangePerStatus[people[chosenOne].status][0],
      rangeMoneyToExchangePerStatus[people[chosenOne].status][1]
    ),
    random.int(
      rangeMoneyToExchangePerStatus[people[chosenTwo].status][0],
      rangeMoneyToExchangePerStatus[people[chosenTwo].status][1]
    )
  )

  if (
    people[chosenOne].money >= exchangeValue &&
    people[chosenTwo].money >= exchangeValue
  ) {
    people[chosenOne].moneyExchanged += exchangeValue
    people[chosenTwo].moneyExchanged += exchangeValue

    if (coin) {
      people[chosenOne].money += exchangeValue
      people[chosenTwo].money -= exchangeValue
    } else {
      people[chosenOne].money -= exchangeValue
      people[chosenTwo].money += exchangeValue
    }

    cleaner(chosenOne)
    cleaner(chosenTwo)
  }
}

const generateRandomPosition = (previousValue?: number): number => {
  let number = random.int(0, peoplePositions.length - 1)

  if (!previousValue) return number

  while (previousValue === number)
    number = random.int(0, peoplePositions.length - 1)

  return number
}

const init = (): void => {
  // Each status is represented by a number as follows:
  // A -> 1
  // B -> 2
  // C -> 3
  // D -> 4
  // E -> 5
  const statusCode = [1, 2, 3, 4, 5]
  for (let i = 0; i < peopleNumber; i++) {
    const status = statusCode[random.int(0, statusCode.length - 1)]
    peoplePositions.push(i)

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
  // bar.start(peoplePositions.length, 0)

  // eslint-disable-next-line no-constant-condition
  while (true) {
    paretoSimulation()
    const nTrue = people.reduce<number>((trues, person) => (
      person.allowed ? ++trues : trues
    ), 0)

    if (nTrue === 1) break
  }

  // bar.stop()
}

const main = async (): Promise<void> => {
  init()

  if (!exists(resultsPath))
    try {
      const result = await writeFile(people, resultsPath, true)
      console.log(result)
    } catch (error) {
      console.log('There was a problem trying to write the results')
      console.error(error)
    }

  const options = new CliOptions(
    `${colors.bold('Pareto Calculation Progress')} ${colors.cyan(
      '[{bar}]'
    )} ${colors.blue('{percentage}%')} | ${colors.bold(
      'Current people who stop exchanging:'
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
      people,
      resultsPath
    )
    console.log(result)
  } catch (error) {
    console.log('There was a problem trying to append the results')
    console.error(error)
  }
}

main()
