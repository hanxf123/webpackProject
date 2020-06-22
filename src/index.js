import './index.less'
/*{
  enumerable: true, // 是否可枚举
  writable: true, // 是否可修改
  configurable: true, // 是否可配置 delete obj[key]
  value(){}
  get(){}
  set(){}
}*/
// 装饰器
function readonly(target, key, discriptor) {
  discriptor.writable = false;
}
function log (target, key, discriptor) {
  let orgValue = discriptor.value;
  discriptor.value = function () {
    console.log('计算周长1');
    return orgValue.call(this,...arguments);
  }
}
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  @readonly PI = 3.14;
  @log getRound() {
    return 2*this.PI*this.radius;
  }
}

const a = new Circle(2)

// 懒加载-> 按需加载
function lazyClick() {
  import('./lazy').then((res) => {
    console.log(res);
  })
}
lazyClick()
// 全局变量
console.log(VERSION,process.env.NODE_ENV)
// 我也不知道怎么描述，但是感觉很神奇
let exp = {name:'1'};
exp[Symbol.toStringTag] = 'Module';
function F (x, y) {  //构造函数
  this.x = x;
  this.y = y;
}
const f = new F(1,2);
console.log(F.toString())
console.log(f.toString())
console.log(exp.toString())
console.log(Object.prototype.toString.call(['a']))
