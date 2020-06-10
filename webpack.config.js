const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  // 通过webpack打包提取公共代码
  optimization: {
    minimizer: [
      // 对js，css的压缩需要在mode=production的模式下才生效
      new UglifyJsWebpackPlugin({
        sourceMap: true, // 是否生成sourceMap文件
        parallel: true, // 是否并行压缩文件
      }),
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  watch: true, // 服务器启动后会监听源文件的变化，源文件发生变化时会重新启动编译；监听时只监听入口文件以及入口文件依赖的模块
  watchOptions: {
    poll: 1000, // webpack通过询问源文件变化来重新启动编译，1000代表每秒询问1000次，是目前比较合理的值
    aggregateTimeout: 500, // 累计延迟时间，避免输入时一直编译
    ignored: /node_modules/, // 忽略询问的文件夹
  },
  devtool: 'eval-source-map',
  mode: 'development', // 默认production-生产模式，development-开发模式
  entry:'./src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js'
  },
  devServer: {
    host: '127.0.0.1',
    port: '8080',
    // 配置静态文件根目录
    contentBase: path.resolve('dist')
  },
  // 填加在其中的文件不会被打包到bundle.js中，能够减小体积，一般是从cdn引入的文件
  // externals: {
  //   jquery: "jQuery"
  // },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader ,'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: 'images', // 指定图片输出路径
            esModule: false // 该配置项为图片打包后的默认路径，带default对象，默认为ture，在配置项里将此项改为false即可去掉多余的defalut对象，否则下面html-withimg-loader html路径会变成{defult：XXXX.png}
          }
        }
      },
      {
        test: /\.html$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-proposal-decorators', { "legacy": true }],'@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader'],
        include: path.resolve('src'),
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    // 需要将上面的loader中的style-loader改成MiniCssExtractPlugin.loader
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    // 公共模块配置，可在项目中直接使用，不需要在每个文件中单独引入一遍。内置插件，不需要安装
    new webpack.ProvidePlugin({
      "_":"lodash"
    }),
    // 添加标签，会在bundle.js顶部注释
    new webpack.BannerPlugin('hxf')
  ]
}