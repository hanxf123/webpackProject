const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
module.exports = {
  entry: ['react', 'react-dom'],
  output: {
    path: path.resolve(__dirname, 'dllDist'),
    filename: '[name].dll.js',
    library: '_dll_[name]',
  },
  plugins: [
    new DllPlugin({
      name: '_dll_[name]', // 必须跟上面library保持一致
      path: path.join(__dirname, 'dllDist', '[name].manifest.json')
    })
  ]
}