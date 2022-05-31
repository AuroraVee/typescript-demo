export const a = 1

interface Infow {
  name: string
  getRes(input: string): number
}

interface Infow {
  age: number
  getRes(input: number): string
}

// 接口合并
// 每个同名函数声明都会被当成这个函数的一个重载
const people: Infow = {
  name: '',
  age: 18,
  getRes(text: any): any {
    // 只能给any
    if (typeof text === 'string') {
      return text.length
    }
    return String(text)
  },
}

people.getRes(123)

// 命名空间合并
namespace V1 {
  export const a = 1
  export function letter() {
    //
  }
}

namespace V1 {
  // 需要把a导出才能访问到
  console.log(a)

  export function number() {
    //
  }
}

// 命名空间和类合并
// 类需要出现在命名空间的前面
// 合并后 命名空间的内容会作为类的静态属性或者静态函数
class Test {
  check() {
    //
  }
}

namespace Test {
  export const reg = /^[0-9]+$/
}

console.log(Test.reg)

// 命名空间和函数合并
// 函数放在前面
function countUp() {
  countUp.n++
}

namespace countUp {
  export let n = 0
}
console.log(countUp.n)
console.log(countUp())

// 命名空间和枚举合并，顺序没有要求
enum Colors {
  red,
  blue,
  yellow,
}
namespace Colors {
  export const white = 3
}

console.log(Colors)
