// 假设该模块给原型对象上添加了方法
// 对全局的造成影响
// 写声明文件还是暂时写在了 global.d.ts中的

String.prototype.getFirstLetter = function () {
  return this[0]
}
