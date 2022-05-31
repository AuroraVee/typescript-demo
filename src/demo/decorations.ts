export const a = 1

function setUp() {
  console.log('setUp')

  return (target: unknown) => {
    //
    console.log('get setUp')
  }
}

let sign = null
function setName(name: string) {
  console.log('setName')

  return (target: new () => unknown) => {
    //
    sign = target
    console.log(target.name)
  }
}

@setName('wjx')
class TestDecoration {}
console.log(sign === TestDecoration)
console.log(sign === TestDecoration.prototype.constructor)

function addName(constructor: new () => void) {
  constructor.prototype.name = 'wjx'
}

@addName
class TestADD {}
// 必须使用同名接口，接口中的属性添加到类的原型对象上
interface TestADD {
  name: string
}
console.log(new TestADD().name)

// 类装饰器
function classDecorator<T extends new (...args: any[]) => {}>(target: T) {
  return class extends target {
    public newP = 'new p'
    public hello = 'hello'
  }
}

@classDecorator
class Grettr {
  public prop = 'prop'
  public hello: string
  constructor(m: string) {
    this.hello = m
  }
}

console.log(new Grettr('Grettr')) // 装饰器重新返回了一个新的类
/**
 *
 *  Grettr {prop: 'prop', hello: 'hello', newP: 'new p'}
    hello: "hello"
newP: "new p"
prop: "prop"
 */

// 方法装饰器对属性描述符的操作，
// !ES5以上
interface ObjUser {
  [key: string]: any
}
// 必须得加上接口类型
const obj: ObjUser = {}

Object.defineProperty(obj, 'name', {
  value: 'wjx',
  writable: false, // 可修改
  enumerable: true, // 可枚举
  configurable: true, // 可配置，重新配置属性的修饰符
})
console.log(obj.name)

function enumerable(bool: boolean) {
  /**
   * target:类的原型对象
   *  普通方法， target 对应的是类的 prototype
   *  静态方法， target 对应的是类的 构造函数
   * propName：被修饰的方法名
   * PropertyDescriptor：ts内置的接口
   */
  return (target: any, propName: string, descriptor: PropertyDescriptor) => {
    // console.log(target, propName)
    // descriptor.enumerable = bool

    return {
      value() {
        return 21
      },
      enumerable: bool,
    }
  }
}

class ClassF {
  constructor(public age: number) {}

  @enumerable(false)
  public getAge() {
    return this.age
  }
}
const o = new ClassF(18)

// 访问器装饰器
function visitDecorator(
  target: any,
  key: string,
  descriptor: PropertyDescriptor,
) {
  // console.log(123);
  descriptor.enumerable = true
  // forin访问能获得name属性和_name
}

class Test {
  private _name: string
  constructor(name: string) {
    this._name = name
  }
  // 这里不能写@visitDecorator，同时写两个会引发报错
  get name() {
    return this._name
  }
  @visitDecorator
  set name(name: string) {
    this._name = name
  }
}

const test = new Test('Monday')
test.name = 'Tuesday'
console.log(test.name) // Tuesday
for (const key in test) {
  console.log(key)
}

// 参数装饰器
// 原型，方法名，参数所在的位置
function paramDecorator() {
  return (target: any, key: string, paramIndex: number) => {
    console.log(target, key, paramIndex) // Test { getInfo: [Function] } , 'getInfo' , 1(参数所在位置是第2个位置)
  }
}

class Test22 {
  // !这里加@识别不了
  public getInfo(age: number, name: string) {
    console.log(name, age)
  }
}
interface Test22 {
  [key: string]: Function | string
}
const test2 = new Test22()
test2.getInfo(18, 'Monday') // Monday 18
