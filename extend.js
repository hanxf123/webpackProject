/*实例的prototype始终等于构造函数的_ptoto_*/
function Parent(name){
  this.name = name
}
Parent.prototype.age = '20'

/*
原型链继承
  1.每次都需要初始化实例
  2.无法初始化子类时进行传值
*/
function Child1 () {

}
Child1.prototype = new Parent('Child1')
const c1 = new Child1();
c1.name; // Child1
c1.age;  // 20

/*
借用构造函数继承
  1.无法继承原型属性
*/
function Child2 (name) {
  Parent.call(this, name)
}
const c2 = new Child2('child2');
c2.name; // child2
c2.age; // undefined

/*
组合继承
  1.每次都需要初始化实例
*/
function Child3 (name) {
  Parent.call(this, name)
}
Child3.prototype = new Parent('Child1')
const c3 = new Child2('child3');
c3.name; // child3
c3.age;  // 20

/*
原型继承
  1.生成了一个原型指向传入对象的新实例
  2.Object.create(proto)的实现方法
*/
function child4 (obj) {
  function F () {

  }
  F.prototype = obj;
  return new F()
}
/*
寄生继承
  1.在原型继承的基础上扩展自己的属性
*/
function child5 (obj) {
  var a = child4(obj)
  a.otherAttr = '123';
  return a;
}
/*
寄生组合继承
  1.传入模板对象和新对象，生成一个temp
  2.将temp的原型链指向模板对象
  3.将temp的构造函数指向新对象
*/
function child6 (obj, Child) {
  var temp = child4(obj)
  Child.prototype = temp;
  temp.constructor = Child;
}
