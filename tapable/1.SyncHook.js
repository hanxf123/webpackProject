// 串行同步执行，不关心返回值
let {SyncHook} = require('tapable')

// SyncHook的使用
// 创建SyncHook实例，参数是一个数组，数组里放置着将要传递给回调函数的参数列表
let syncHook = new SyncHook(['name']);
// tap 注册，相当于xxx.addEventListener(listener)
syncHook.tap('1' ,function (name) {
  // function参数和上面的参数列表相对应
  console.log(name)
})
syncHook.tap('2' ,function (name) {
  console.log(name)
})
// 触发时间，让监听函数（tap）执行，入参对应上面的参数列表
syncHook.call('test')


// SyncHook的实现
class SyncHookRealize {
  constructor (props) {
    this.props = props;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    this.tasks.forEach((task) => task(...args))
  }
}