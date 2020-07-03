/*1.最后一个被调用的loader必须返回一个合法的js代码
2.链式
3.模块化
4.纯函数（无状态）
5.loader-utils webpack配置loader的时候，如果想要在写loader的时候拿到配置的options，需要用到这个库
  schema-utils校验option格式*/
let loaderUtils = require('loader-utils');
let validateOptions = require('schema-utils')
// 采用的是node语法，支持es6，但是不支持import
// import validateOptions from 'schema-utils'
function loader (source) {
  // 缓存，提升加载速度
  this.cacheable()
  const callback = this.async(); // 如果存在异步代码，需要调用callback
  let options = loaderUtils.getOptions(this);
  validateOptions(schema, options)
  console.log(loaderUtils.stringifyRequest(this.request)) // 转换成相对路径
  return source+'//log'
}
module.exports = loader;