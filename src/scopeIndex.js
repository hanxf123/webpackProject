/*
函数执行上下文环境(EC)
 - this
 - VO（Variable Object）,AO（Variable Object）
 - scope chain 作用域
*/
function a () {
  let name = 'name';
  return name;
}
function b () {
  // let n = a();
  let n = name = 'name'; // 相当于对name的变量提升
  console.log(n);
}
b();
/*
window->b>a
b是a的父作用域
*/
