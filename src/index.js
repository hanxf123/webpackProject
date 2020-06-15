import './index.less'
/*{
  enumerable: true, // 是否可枚举
  writable: true, // 是否可修改
  configurable: true, // 是否可配置 delete obj[key]
  value(){}
  get(){}
  set(){}
}*/
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
console.log(VERSION,process.env.NODE_ENV)
