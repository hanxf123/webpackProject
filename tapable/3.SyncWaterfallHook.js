// 将当前返回值传入下一个task
// waterfall 瀑布
let {SyncWaterfallHook} = require('tapable')

// SyncHook的使用
// 创建SyncHook实例，参数是一个数组，数组里放置着将要传递给回调函数的参数列表
let syncWaterfallHook = new SyncWaterfallHook(['name']);
// tap 注册，相当于xxx.addEventListener(listener)
syncWaterfallHook.tap('1' ,function (name) {
  // function参数和上面的参数列表相对应
  console.log(name)
  return '1'
})
// data是1执行后的返回值
syncWaterfallHook.tap('2' ,function (data) {
  console.log(data)
  return '2'
})
syncWaterfallHook.tap('3' ,function (data) {
  console.log(data)
  return '3'
})
// 触发时间，让监听函数（tap）执行，入参对应上面的参数列表
syncWaterfallHook.call('test')


// SyncHook的实现
class SyncWaterfallHookRealize {
  constructor (props) {
    this.props = props;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  call(...args) {
    let [first, ...others] = this.tasks;
    // reduce 参数：
    // function(total,currentValue, index,arr) 上一个返回值，当前值，当前索引，当前元素所属的数组对象
    // initialValue 初始化值
    return others.reduce((memo, task) => {
      return task(memo)
    }, first(...args))
  }
}