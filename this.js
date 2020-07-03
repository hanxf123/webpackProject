/*
  普通函数的调用永远指向window，严格模式下（use strict）是指向undefined的，但不是所有情况指向undefined
  对象中的函数不算普通函数，指向对象
  箭头函数的this在生成时就已经存在，本身不存在this，不会改变this指向；严格模式下全局调用依旧指向window
  构造函数new的时候this指向实例
  给元素的某一个事件绑定方法,当事件触发的时候执行对应的方法,方法中的this是当前的元素
*/
// 例子1
var obj = {
  a:1,
  c: this.a + 10,
  b:function () {
    // 指向window
    return function () {
      console.log(this.a)
    }
    // 指向a
    // return () => {
    //   console.log(this.a)
    // }
  }
}
obj.c;// NaN c的this指向window，没有a
// 对函数的处理
obj.b()(); // return普通函数是undefined window，箭头函数是1 obj
var obj1 = obj.b();
obj1(); // return普通函数是undefined window，箭头函数是1 obj
var obj2 = obj.b;
obj2()(); // undefined window

// 例子2
let a = 5;
function d(){
  let a = 6;
  console.log(a); // 5
  console.log(this.a) // 6
}
// 例子3
function foo(){
  console.log(this.a);
}
var a = 2;
var o = {
  a:3,
  foo: foo
};
var p = { a:4 };
o.foo();  //3
(p.foo = o.foo)();  // 2
p.foo = o.foo;
p.foo(); // 4

// 例子5
function test(arg) {
  this.x = arg;
  return this;
}
var x = test(5);
var y = test(6);
console.log(x.x); // undefined x是6
console.log(y.x); // 6 y是window对象

// 例子6 严格模式 默认全局的情况下还是window，普通函数挂在在window下是undefined
'use strict'
function showThis() {
  console.log(this)
}
showThis() // undefined

'use strict';
console.log(this); // window

'use strict';
let name = 'BigBear';
let me = {
  name: 'xiuyan',
  hello: function() {
    // 全局作用域下实现的延时函数
    setTimeout(function() {
      console.log(`你好，我是${this.name}`)
    })
  }
}
me.hello() // 你好，我是BigBear

'use strict';
var name = 'BigBear';
(function(){console.log(this.name)})(); // 报错，Cannot read property 'name' of undefined
(function(name){console.log(name)})(this.name); // BigBear

// 实现一个call
Function.prototype.myCall = function(context, ...others) {
  // step1: 把函数挂到目标对象上（这里的 this 就是我们要改造的的那个函数）
  context.func = this
  // step2: 执行函数
  context.func(...others)
  // step3: 删除 step1 中挂到目标对象上的函数，把目标对象”完璧归赵”
  delete context.func
}

