##webpack运行流程（串行）

1.初始化参数

2.开始编译

3.确定入口

4.编译模块

5.完成模块编译

6.输出资源

7.输出完成

8.在以上过程中，webpack会在特定时间广播特定事件，调用插件

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

copy-webpack-plugin<!--用于拷贝没有被引用的文件 参数：from ，to-->

clean-webpack-plugin<!--打包前清空目录-->
##loader（从右往左加载）

1.用于对模块的源码进行转换

2.可以在import或者‘加载’模块时预处理文件

css-loader

style-loader

file-loader<!--解决CSS等文件中的引入图片路径问题-->

url-loader<!--当图片小于limit时会把图片转换成base64编码，大于是还是用file-loader进行拷贝-->

<!--file-loader和url-loader同时用的时候图片会加载不出来，只能用其中一个（原因待考察）-->  

html-withimg-loader<!--解决CSS等文件中的引入图片路径问题-->    

postcss-loader<!--处理css属性前缀--> 
调用<!-- npm i -->autoprefixer<!-- -d -->进行处理

expose-loader<!--将模块挂在到全局（window下）-->

image-webpack-loader<!--通过把图片分辨率降低的方法压缩图片，不常用-->

eslint-loader<!--esLint校验-->

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

##morgan nodejs日志工具
##中间件
webpack-dev-middleware<!--下Express中提供webpack-dev-server静态能力服务的中间件-->
##合并配置文件
<!--在生产环境(webpack.prod.js)和开发环境(webpack.dev.js)配置不同的webpack,
通过merge.smart(base,{mode:development/production})和基础文件进行合并，
在package.json中通过--config选择执行不同的配置文件-->
webpack-merge
##library和libraryTarget
<!--导出模块，类似node_modules里面的库-->  
##打包优化
1.DLL<!--webpack最有效打包的优化手段之一，动态链接库-->

1）DllPlugin<!--用于打包出一个个动态连接库，内置插件-->

2）DllReferencePlugin<!--在配置文件中引入DllPlugin插件打包好的动态连接库，内置插件-->

2.HappyPack<!--项目太小时不建议使用-->

3.cdn

4.Tree Shaking<!--用来剔除js中用不上的死代码，比如未引用的方法-->

5.提取公共代码

6.Scope Hoisting 作用域提升<!--使打包文件更小，运行更快-->

7.动态导入和懒加载
<!--undefined(未加载)->null(预加载)->Promise(加载中)->0(加载完成)-->
 