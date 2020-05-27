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
  iterations,
  peopleMoney,
  peopleNumber,
  resultsPath
} from './utils/pareto.constants'

const peopleFromStatus = {
  a: parseInt(process.env.PERCENT_FROM_A as string)*peopleNumber/100,
  b: parseInt(process.env.PERCENT_FROM_B as string)*peopleNumber/100,
  c: parseInt(process.env.PERCENT_FROM_C as string)*peopleNumber/100,
  d: parseInt(process.env.PERCENT_FROM_D as string)*peopleNumber/100,
  e: parseInt(process.env.PERCENT_FROM_E as string)*peopleNumber/100,
}

let peopleWithMoney = peopleNumber


const avoidRepetition = (numberToAvoid: number): number => {
  let number = random.int(0, peopleWithMoney - 1)

  while (number === numberToAvoid) number = random.int(0, peopleWithMoney - 1)

  return number
}

const cleaner = (index: number): void => {
  if(peopleMoney[index] === 0) {
    peopleMoney.splice(index, 1)
    peopleWithMoney--
  }
}

const coinThrow = (): boolean => random.boolean()

const exchange = (chosenOne: number, chosenTwo: number): void => {
  const coin: boolean = coinThrow()

  if (coin) {
    peopleMoney[chosenOne] += exchangeValue
    peopleMoney[chosenTwo] -= exchangeValue
    cleaner(chosenTwo)
  } else {
    peopleMoney[chosenOne] -= exchangeValue
    peopleMoney[chosenTwo] += exchangeValue
    cleaner(chosenOne)
  }
}

const generateRandomPosition = (previousValue?: number): number => {
  let value: number = random.int(0, peopleWithMoney - 1)

  if (!previousValue) return value

  while (previousValue === value)
    value = avoidRepetition(previousValue)

  return value
}

const init = (): void => {
  const shit = [1, 2, 3, 4, 5]
  for (let i = 0; i < peopleWithMoney; i++) {
    const status = shit[random.int(0, shit.length - 1)]

    // eslint-disable-next-line default-case
    switch (status) {
      case 1:
        peopleMoney.push(baseMoneyFromStatus.a)
        peopleFromStatus.a--
        if(peopleFromStatus.a === 0) shit.splice(shit.indexOf(1), 1)
        break
      case 2:
        peopleMoney.push(baseMoneyFromStatus.b)
        peopleFromStatus.b--
        if(peopleFromStatus.b === 0) shit.splice(shit.indexOf(2), 1)
        break
      case 3:
        peopleMoney.push(baseMoneyFromStatus.c)
        peopleFromStatus.c--
        if(peopleFromStatus.c === 0) shit.splice(shit.indexOf(3), 1)
        break
      case 4:
        peopleMoney.push(baseMoneyFromStatus.d)
        peopleFromStatus.d--
        if(peopleFromStatus.d === 0) shit.splice(shit.indexOf(4), 1)
        break
      case 5:
        peopleMoney.push(baseMoneyFromStatus.e)
        peopleFromStatus.e--
        if(peopleFromStatus.e === 0) shit.splice(shit.indexOf(5), 1)
        break
    }

  }
}

const paretoSimulation = (): void => {
  const chosenOne: number = generateRandomPosition()
  const chosenTwo: number = generateRandomPosition(chosenOne)

  exchange(chosenOne, chosenTwo)
}

const runPareto = (options: CliOptions): void => {
  // eslint-disable-next-line max-len
  const bar = new cliProgress.SingleBar(options, cliProgress.Presets.shades_classic)
  bar.start(iterations, 1)

  for (let i = 0; i < iterations && peopleMoney.length > 1; i++) {
    paretoSimulation()
    bar.update(i + 1)
  }

  bar.stop()
}

const main = async (): Promise<void> => {
  console.log(peopleFromStatus)
  init()
  console.log(peopleFromStatus)

  if (!exists(resultsPath))
    try {
      await writeFile(peopleMoney, resultsPath, null, true)
    } catch (error) {
      console.log('There was a problem trying to write the results')
      console.error(error)
    }

  const options = new CliOptions(
    `${colors.bold('Pareto Calculation Progress')} ${colors.cyan('[{bar}]')} ${colors.blue('{percentage}%')} | ${colors.bold('Current exchange:')} ${colors.yellow('{value}')} | ${colors.bold('Duration:')} ${colors.green('{duration_formatted}')}`,
    true,
    true
  )

  runPareto(options)

  try {
    await appendFile(peopleMoney, resultsPath, iterations)
  } catch (error) {
    console.log('There was a problem trying to append the results')
    console.error(error)
  }
}

main()
