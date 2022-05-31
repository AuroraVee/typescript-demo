export const a = 1

class Point {
  x: number
  y: number
  protected constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  private getPosition(): string {
    return this.x + ',' + this.y
  }

  protected getY() {
    return this.y
  }
}

class Child extends Point {
  constructor(x: number, y: number) {
    super(x, y)
    // super.getPosition()
    console.log(super.getY())
  }

  private getX(): number {
    return this.x
  }
}

//修饰符
//public
//private：不能被继承和被super访问，不能类外访问
//protected :可以被继承和super访问，不能类外访问
//构造函数加protected，不能在类外创建实例
// const p = new Point(1, 2)
// console.log(p)
const child = new Child(1, 2)
console.log(child.x)

class UserInfo {
  public readonly name: string //只读
  public age?: number
  private _infoStr: string = 'wjx-18'
  constructor(name: string, age?: number) {
    this.name = name
    this.age = age
  }

  //存储器,访问和修改私有属性
  get infoStr() {
    return this._infoStr + 'infostr'
  }

  set infoStr(v) {
    this._infoStr = v
    console.log(v, 'set infoStr')
  }
}

const user = new UserInfo('wjx')
user.infoStr = '1'
console.log(user.infoStr)

// user.name="w"

class A {
  constructor(public name: string) {} //初始化的同时创建实例属性
}
const a_ = new A('aaa')
console.log(a_)

//抽象类,子类必须实现抽象类的方法
abstract class P {
  constructor() {}
  abstract getName(): string
  abstract _name: string
  abstract get insideName(): string
  abstract set insideName(v: string)
}

class Man extends P {
  public _name: string = 'w'
  public insideName: string = 's'

  getName(): string {
    return 'Man'
  }
}

const man: Man = new Man()
console.log(man.getName(), 'man')

//类实现接口，保证类的实例实现了接口
interface Food {
  type: string
  count: number
}

class Tomato implements Food {
  constructor(public type: string, public count: number) {}
}

class AA {
  protected name: string = 'AA'
}

//BB需要AA里的属性，但是由于该属性是受保护的，则CC必须手动继承，才能拿到
interface BB extends AA {
  type: string
}

class CC extends AA implements BB {
  constructor(public type: string, public name: string) {
    super()
  }
}

const ccc = new CC('add', 'cc')

// 传入的c是一个构造函数，返回该函数的实例
const create = <T>(c: new () => T): T => {
  return new c()
}

class Info {
  age: number = 12
}

const i = create<Info>(Info)
console.log(i)
