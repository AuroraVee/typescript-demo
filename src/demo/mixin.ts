// 对象混入
interface OA {
  a: string
}
interface OB {
  b: string
}

const a: OA = { a: '1' }
const b: OB = { b: '2' }
const AB: OA & OB = Object.assign(a, b)

// 类的混入
class CA {
  public isA: boolean = false
  public funA() {}
}

class CB {
  public isB: boolean = false
  public funB() {}
}

class CAB {
  constructor() {}
  //   isA: boolean = false
  //   isB: boolean = false
  //   public funA(): void {
  //     console.log('A')
  //   }
  //   public funB(): void {
  //     console.log('b')
  //   }
}

function mixins(base: any, from: any[]) {
  from.forEach((item) => {
    Object.getOwnPropertyNames(item.prototype).forEach((key) => {
      console.log(key)
      base.prototype[key] = item.prototype[key]
    })
  })
}

mixins(CAB, [CA, CB])
const ab = new CAB()
console.log(ab)
/**
 * CAB {}[[Prototype]]: Object
 * funA: ƒ funA()
 * funB: ƒ funB()
 * constructor: class CB
 */
