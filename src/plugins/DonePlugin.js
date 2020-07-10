class DonePlugin {
  // 接受参数
  constructor (params) {
    this.params = params;
  }
  apply(compiler) {
    compiler.hooks.done.tapAsync('DonePlugin', function (callback) {
      callback();
    })
    // 拿到Compilation
    // compiler.hooks.compilation.tap('DonePlugin', function (compilation) {
    //   compilation.hooks.optimize.tap('DonePlugin', function () {
    //       console.log('已经编译完成，正在优化，准备输出')
    //   })
    // })
  }
}
module.exports = DonePlugin;