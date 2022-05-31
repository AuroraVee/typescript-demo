// 导入命名空间
/// <reference path="number.ts" />
/// <reference path="letter.ts" />
// 把同一个命名空间下的内容拆分到不同文件，最后还是可以合并成一个
// https://juejin.cn/post/7031804280130502686
// 引入两个同名的命名空间，最后会合并成一个
const isLetter = Validationrr.checkLetter('abc')
console.log(isLetter)

const isNumber = Validationrr.checkNumber('abc')
console.log(isNumber)

// tsc测试： npx tsc --outFile use.js use.ts

// TS中使用import为指定的符号创建一个别名，格式大概是：import q = x.y.z
// 简化命名空间
// tslint:disable-next-line:no-namespace
namespace Shapes {
  export namespace Polygons {
    export class Circle {}
    // tslint:disable-next-line:max-classes-per-file
    export class Rectangle {}
  }
}

import polygons = Shapes.Polygons
const rec = new polygons.Rectangle()

export const a = 1
