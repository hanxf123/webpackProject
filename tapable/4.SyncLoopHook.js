// 监听函数返回true表示继续循环，返回undefined表示循环结束(返回false和其他值不生效)
// loop 循环
let {SyncLoopHook} = require('tapable')

// SyncHook的使用
// 创建SyncHook实例，参数是一个数组，数组里放置着将要传递给回调函数的参数列表
let syncLoopHook = new SyncLoopHook(['name']);
// tap 注册，相当于xxx.addEventListener(listener)
let total = 0;
syncLoopHook.tap('1' ,function (name) {
  console.log(total);
  return total++ < 3 ? true : undefined;
})
// 触发时间，让监听函数（tap）执行，入参对应上面的参数列表
syncLoopHook.call('test')


// SyncLoopHook的实现
class SyncLoopHookRealize {
  constructor (props) {
    this.props = props;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    this.tasks.forEach((task) => {
      let ret;
      do{
        ret = task[i](...args)
      }while (ret!==undefined)
    })
  }
}