export const a = 1

const getIndex = () => {
  return 2
}
// 数值型枚举
enum Status {
  Uploading = 3,
  Success = getIndex(),
  Error = 5,
}

console.log(Status.Success)

// 字符串型枚举
enum Message {
  error = 'hi,error',
  success = 'hi,success',
}

console.log(Message.success)

// 枚举类型做属性类型
// 1.enum E{ A }
// 2.enum E{ A="a" }
// 3.enum E { A=-1}
enum E {
  Dog = 1,
  Cat = 2,
}

interface Dog {
  type: E.Dog
}

const Cat: Dog = { type: E.Dog }

// 常量枚举,编译后不会生成A这个对象
const enum A {
  status = 'success',
}
const dog = A.status

// 常量类型
const str = 'this is string' // str: 'this is string'
const num = 1 // num: 1
const bool = true // bool: true

// tslint:disable-next-line:prefer-const
let str2 = 'this is string' // str: string
// tslint:disable-next-line:prefer-const
let num2 = 1 // num: number
// tslint:disable-next-line:prefer-const
let bool2 = true // bool: boolean

class AAA {
  _name = 'wjx'
  get name() {
    return this._name
  }

  set name(value) {
    this._name = value
  }
}
