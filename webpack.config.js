const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const webpack = require('webpack')
const mock = require('./mock')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
module.exports = {
  optimization: {
    // 对应webpack优化 5.提取公共代码
    splitChunks: {
      cacheGroups: {
        // 把公共的第三方模块都打包到单独的js文件中
        vender: {
          test: /node_modules/, // 第三方模块
          chunks: "initial", // 代码块是直接饮用
          name: "vendor", // 打包文件的名字
          priority: 10, // 优先级
          enforce: true, // 强制执行
        },
        // 把多个文件之间的公共模块提取出来
        commons: {
          chunks: "initial", // 代码块是直接饮用
          minChunks: 2, // 使用最小次数
          minSize: 0, // 单独提取的文件的最小字节数（文件过小的时候可以不提取）
        }
      }
    },
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
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    // 导出模块，类似node_modules里面的库，打包之后会生成var calculator = (function(){}())
    // library: 'calculator',
    // 导出规则，默认是var
    // libraryTarget: "commonjs", // commonjs2/this/window/global=window
  },
  devServer: {
    host: '127.0.0.1',
    port: '8080',
    // 配置静态文件根目录
    contentBase: path.resolve('dist'),
    compress: true, // 是否压缩
    proxy: {
      // "/api": "http://localhost:3000"  // 直接代理
      "/api": {
        target: "http://localhost:3000",
        pthRewrite: {  // 重写url，api为前端统一规则，不与后端交互，通过重写去掉
          "^\/api": ""
        }
      }
    },
    // 在请求到静态资源之前配置路由 app=express();
    before (app) {
      // app.get('/user',function(res, res){
      //   res.json({id:1, name:'test'})
      // })
      mock(app);
    },
    // 请求静态资源之后的处理，极少用到
    after (app) {
      app.use(function (err, req, res, next) {
        res.send('请求路径不正确')
      })
    }
  },
  // 填加在其中的文件不会被打包到bundle.js中，能够减小体积，一般是从cdn引入的文件
  /*externals: {
    jquery: "jQuery"
  },*/
  // 配置如何寻找Loader
  /*resolveLoader: {
    modules: ['node_modules','others'], // 后面可以跟自己写的loader模块
  },*/
  // 配置如何寻找普通模块
  /*resolve: {
    // 查找的后缀名，一般情况不要配置太多，避免查找混乱
    extensions: ['js','jsx','json'],
    // 配置路径，引入时可以直接用component
    alias: {
      'component': __dirname+'src/component'
    },
    // 不配置的情况下，也会在node_modules中找，可以添加其他的查找模块,例如还从others里面找
    modules: ['node_modules','others'],
    // mainFields: []
    // 当目录下没有package.json情况下，默认调用index.js,mainFiles可配置调用文件
    mainFiles: ['index']
  },*/
  module: {
    // 配置不需要解析的模块
    noParse: /jquery|lodash/,
    // 配置Loader
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        use: {
          loader: "url-loader",
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
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-proposal-decorators', { "legacy": true }], '@babel/plugin-proposal-class-properties']
          }
        }, 'eslint-loader']
      },
      {
        test: /\.(ts|tsx)$/,
        use: ['ts-loader'],
        include: path.resolve('src'),// include,exclude能大大提升编译速度
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
      filename: "index.html",
      // chunks: ['index'], // 指定html加载哪个js，针对多入口生成多html时；如果不配置，会把生成的所有js引入；配置之后只会引入配置的模块，不会引入关联模块
    }),
    // 需要将上面的loader中的style-loader改成MiniCssExtractPlugin.loader
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    // 公共模块配置，可在项目中直接使用，不需要在每个文件中单独引入一遍。内置插件，不需要安装
    new webpack.ProvidePlugin({
      "_": "lodash"
    }),
    // 添加标签，会在bundle.js顶部注释
    new webpack.BannerPlugin('hxf'),
    // 定义一些希望在代码中直接获取的常量，不用JSON.stringify包裹会报错
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(true), // 只能写字符串
      VERSION: JSON.stringify("1.0.0"),
      EXPRESSION: 1 + 1 + 1, // 可以放字符串，表达式，boolean值等;表达式
      COPYRIGHT: {
        AUTHOR: JSON.stringify('hxf-test')
      }
    }),
    // 编译时会查找json中是否包含想要打包的文件，如果包含则略过，有dll.js文件提供输出；打包后需要手动在index.html中引入dll.js文件
    new DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dllDist/main.manifest.json')
    }),
    // 变量提升
    new ModuleConcatenationPlugin(),
  ]
}
