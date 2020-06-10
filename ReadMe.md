##项目初始化
npm init -y <!--生成空项目，空package.json-->

npm i webpack webpack-cli webpack-dev-server -D 

新建src文件夹

新建webpack.config.js

##plugin
html-webpack-plugin<!--自动在打包文件夹中生成html文件-->

mini-css-extract-plugin<!--用于css分离，默认css会被打包到引入文件中js/html-->

uglifyjs-webpack-plugin<!--用于js压缩-->

optimize-css-assets-webpack-plugin<!--用于css压缩-->
##loader（从右往左加载）
css-loader

style-loader

file-loader<!--解决CSS等文件中的引入图片路径问题-->

url-loader<!--当图片小于limit时会把图片转换成base64编码，大于是还是用file-loader进行拷贝-->

<!--file-loader和url-loader同时用的时候图片会加载不出来，只能用其中一个（原因待考察）-->  

html-withimg-loader<!--解决CSS等文件中的引入图片路径问题-->    

postcss-loader<!--处理css属性前缀--> 
调用<!-- npm i -->autoprefixer<!-- -d -->进行处理

expose-loader<!--将模块挂在到全局（window下）-->

##TypeScript
npm i typescript -g

ts-loader

tsc --init <!--生成tsconfig.json配置文件-->
##less
npm i less -g

less-loader
##编译ES6/7/8/9/10
@babel/core

@babel/cli

babel-loader

@babel/preset-env<!--把ES6转换成ES5-->

@babel/preset-react<!--转化react-->

babel-plugin-transform-decorators-legacy<!--转化装饰器语法插件-->

##devtools




