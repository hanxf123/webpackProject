const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const happyPack = require('happypack')
module.exports = {
  devtool: 'eval-source-map',
  mode: 'development', // 默认production-生产模式，development-开发模式
  entry:'./src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    publicPath: "http://img/zhufengpeixun.cn", // 外链地址
  },
  module: {
    // 配置不需要解析的模块
    noParse: /jquery|lodash/,
    // 配置Loader
    rules: [
      {
        test: /\.css$/,
        use: ['happypack/loader?id=css']
      },
      {
        test: /\.html$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=babel']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ['index'], // 指定html加载哪个js，针对多入口生成多html时
    }),
    new happyPack({
      id: 'babel',
      use: [{
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env'],
          plugins: [['@babel/plugin-proposal-decorators', { "legacy": true }],'@babel/plugin-proposal-class-properties']
        }
      },'eslint-loader'],
      threads: 2, // 开的进程数量，默认是当前CPU核心数-1
    }),
    new happyPack({
      id: 'css',
      use: ['css-loader', 'postcss-loader']
    })
  ]
}
