const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  context: __dirname,
  entry  : './src/pareto.ts',
  externals: [nodeExternals()],
  module : {
    rules: [
      {
        exclude: /node_modules/,
        test   : /\.ts$/,
        use    : {
          loader: 'ts-loader'
        },
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename  : 'pareto.js',
    path      : path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  target: 'node'
}
