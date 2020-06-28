/*
函数式编程的三个重要概念：
  1.纯函数 输入什么，输出什么
  2.柯里化 所谓柯里化就是把具有较多参数的函数转换成具有较少参数的函数的过程。
  3.高阶函数 接受一个函数为参数，并且保证原函数不变的情况下，对函数进行二次封装，返回一个新的函数的 函数叫做高阶函数
*/
/*箭头函数本身没有arguments，箭头函数的arguemnts 是父级作用域的arguemnts。所以看箭头函数有没有,就看箭头函数的父级作用域有没有。*/
/*一个函数的子函数调用了这个函数的变量或者入参都算是闭包*/
function f1 () {
  const i = 'init';
  function f2 () {
    // 只要调用了父函数中定义的变量，无论是否return，都是闭包
    console.log(i)
  }
  f2()
}
// 例子1 debounce 防抖
function debounce (fn) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, 2000)
  }
}

function clickEvent () {
  console.log('click')
}
// 相当于debounce只调用一次，每次执行debounced()
const debounced = debounce(clickEvent)
// 执行多次，但是只输出一次click
for (var i = 0; i < 5; i++) {
  debounced()
}
// 直接这样调用会输出多次
debounce()()

// 例子2 柯里化
function curry (fn) {
  // 利用闭包将函数的参数储存起来，等参数达到一定数量时执行函数。
  const g = (args) => fn.length === args.length ? fn(...args) : (arg) => g([...args,arg])
  return g([])
}
function sum (a, b, c) {
  return a+b+c;
}
const curryFn = curry(sum);
curryFn(1)(2)(3)