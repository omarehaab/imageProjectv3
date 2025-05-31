// module.exports = {
//   entry: './index.ts',
//   output: {
//     filename: './[name].js'
//   },
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js']
//   },
//   module: {
//     rules: [
//       { test: /.tsx?$/, loader: 'ts-loader' }
//     ]
//   }
// }
const path = require("path");

module.exports = {
  mode: "production",
  entry: "./script.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
