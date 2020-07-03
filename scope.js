/*
变态题库：https://juejin.im/post/5ee03947e51d457889262921#heading-4
  变量提升也有优先级, 函数声明 > arguments > 变量声明
*/
// 例子1
var obj6 = {n:1}
var obj6b = obj6;
obj6.n = 2; // obj6b的n会变成2
obj6 = {n:2}; // 此时obj6b不变，obj6指向了一个新的对象
obj6.n = 3; // 此时obj6b的n依旧不变