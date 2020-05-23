# The Pareto distribution applied to simulate the peruvian socioeconomic reality

This is an experimental simulation (as mentioned before) made in [`TypeScript`](https://www.typescriptlang.org/).

The code works as follows:

We will create an array of `N` people, they will exchange `x` soles `i` times in total. Each exchange is randomly performed (this means that both chosen people has 50% of probability to win the exchange and 50% of probability to lose it), and those two people that will exchange are also randomly chosen. However, when a person who has 0 soles left, he will be replaced for other person who must have 1 soles or more (randomly and iteratively). This process will continue until we reach the established `limit` (tested up 500000 exchanges). Finally, the last state of the array mentioned above will be stored in a `result.txt` file.

## Prerequisites

You need to have [`Node.js`](https://nodejs.org/en/), [`TypeScript`](https://www.typescriptlang.org/) and [`yarn`](https://yarnpkg.com/) installed.

You need an `.env` file in order to run this project. You can use and modify the provided here.

## Setup

In order to install and use this project please run the following commands in your terminal:

```console
$ yarn
$ yarn service
```

This will run the `dist/pareto.js` file, which is a bundle file generated with [`Webpack`](https://webpack.js.org/).

## Results

Depending of the values you set in the `.env`, different result will be thrown. These result will be stored in the `iterationResults/result.txt` file.

## Notes

Our algorithm is the `src/pareto.ts` file, and was designed as follows:

### Variables

1. `resultsPath`: the path to the `result.txt` file.
2. `baseMoney`: the initial quantity of money that each person has.
3. `peopleNumber`: number of people considered for the simulation.
4. `exchangeValue`: quantity of money that two people will exchange.
5. `iterations`: quantity of exchanges that will be performed.
6. `peopleMoney`: array that stores how much money each person has.

### Functions

1. Three functions from `src/utils/writeFiles.ts` are imported, as its name show, they are used to append the results to the file, if this already exists, then, the second function verify whether our result file exists. Finally, the third one writes the initial values in the file.

2. There are several functions in the file, so we they are explained here:
  - `avoidRepetition`: this function receive a number, and return another number different to the first one.
  - `coinThrow`: this function return a random boolean.
  - `exchange`: here the two chosen people perform a random exchange, according to the result of the `coinThrow`. Each person has 50% probability to win.
  - `generateRandomPositionAvoidingCeroValue`: here we chose two people who are positionally different and has at least 1 soles.
  - `init`: here we initialize the array of people with a constant and equal quantity of soles.
  - `paretoSimulation`: here we will chose the two people who will exchange, calling `generateRandomPositionAvoidingCeroValue` function, and then, we will perform an exchange between those two people.
  - `main`: here we will create the `result.txt` file (indirectly) and store the initial data (if it is the first time that we run the algorithm), then we call (iteratively) the `paretoSimulation` function `N` times. Finally, we append the final state of the array to the `result.txt` file.
