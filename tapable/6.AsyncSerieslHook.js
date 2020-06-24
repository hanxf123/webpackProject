// 异步串行执行，执行完1才执行2
let {AsyncSeriesHook} = require('tapable')
let hook = new AsyncSeriesHook(['name']);
// Async类型的Hook注册监听事件的方式有3种 tap tapAsync tapPromise
// tap只能保证代码同步执行，并未等待异步结果返回
hook.tap('1', function (name) {
  setTimeout(() => {
    console.log(name)
  }, 1000)
})

// tapAsync
hook.tapAsync('1', function (name, callback) {
  setTimeout(() => {
    console.log(name)
  }, 1000)
})
hook.tapPromise('1', function (name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name)
      resolve(1);
    }, 1000)
  })
})
// tap tapAsync监听
hook.callAsync('test', (name, callback) => {
  console.log('done')
})
// tapPromise监听
hook.promise('test').then((data) => {
  console.log(data)
})
// AsyncSeriesHook的实现
class AsyncSeriesHookRealize {
  constructor (props) {
    this.props = props;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task)
  }
  tapAsync(name, task) {
    this.tasks.push(task)
  }
  tapPromise(name, task) {
    this.tasks.push(task)
  }
  // tapAsync情况的实现
  callAsync(...args) {
    // 取出callAsync的回调
    let finalCallback = args.pop();
    let i = 0;
    const done = () => {
      if(++i === this.tasks.length) {
        finalCallback();
      }
    }
    this.tasks.forEach((task) => task(...args, done))
  }
  // promise情况的下，没有call方法，直接掉promise
  promise(...args) {
    // 实现1
    let [first, ...other] = this.tasks;
    return other.reduce((promise, task) => {
      return promise.then(() => task(...args))
    }, first(...args))
    // 实现2
    // return this.tasks.reduce((current, task) => {
    //   return Promise.resolve(current).then(() => task(args));
    // }, args)
  }
}