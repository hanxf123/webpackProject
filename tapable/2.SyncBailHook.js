// 串行执行，如果有一个返回值不为null，就停止执行；与SyncHook区别在于call的实现
// bail 保险，保险丝
let {SyncBailHook} = require('tapable')

// SyncHook的使用
// 创建SyncHook实例，参数是一个数组，数组里放置着将要传递给回调函数的参数列表
let syncBailHook = new SyncBailHook(['name']);
// tap 注册，相当于xxx.addEventListener(listener)
SyncBailHook.tap('1' ,function (name) {
  // function参数和上面的参数列表相对应
  console.log(name)
  return 1; // 返回值不为null
})
SyncBailHook.tap('2' ,function (name) {
  console.log(name)
})
// 触发时间，让监听函数（tap）执行，入参对应上面的参数列表
SyncBailHook.call('test')

// SyncBailHook的实现
class SyncBailHookRealize {
  constructor (props) {
    this.props = props;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    let i = 0, ret;
    do{
      ret = this.tasks[i++](...args)
    }while (!ret)
  }
}