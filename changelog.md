# Pareto distribution verification

## Version 0.1.0

- Implemented:
  - First version of the simulation.
  - Writing in a file the results.
  - [`TypeScript`](https://www.typescriptlang.org/) to have better understand of the code.
  - [`Webpack`](https://webpack.js.org/) to bundle the files.
  - [`Eslint`](https://eslint.org/) to have better code practices.
  - [`Prettier`](https://eslint.org/) to have format the code.

- TODO:
  - Optimization of the algorithm, pop the elements once they became 0.
  - Sort the array (today 24-05-2020).
  - Increase the sample to 1000 (today 24-05-2020).
  - Divide in 5 categories that sample (monday 25-05-2020):

    1. A category: 2% of the sample with 12660 soles as initial money and salary.
    2. B category: 10% of the sample with 7020 soles as initial money and salary.
    3. C category: 27% of the sample with 3970 soles as initial money and salary.
    4. D category: 27% of the sample with 2480 soles as initial money and salary.
    5. E category: 34% of the sample with 1300 soles as initial money and salary.
  
  - According to its category, after losing **X%** of its initial money, the _person_ can't perform any other exchange (wednesday 27-05-2020).

    1. A category: X = 62%.
    2. B category: X = 68%.
    3. C category: X = 75%.
    4. D category: x = 80%.
    5. E category: x = 87%.

  - Once exchanges stop, each category will receive its corresponding salary, showed above (friday 29-05-2020).
  - Show the results in a graph (pending to assign a date).
