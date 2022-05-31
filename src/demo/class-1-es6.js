class Demo {
  static name = 'Demo' //静态属性

  z = 0 //实例属性
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  getPosition() {
    return this.x + ',' + this.y
  }

  //静态方法
  static getX() {
    return Demo.name
  }
}

console.log('demo', Demo.name)

//set和get的名字表示对象提供给外部访问的属性名
const obj = {
  _age: 18,
  set age(v) {
    this._age = v
    console.log('set')
  },
  get age() {
    console.log('get')
    return this._age
  },
}

// console.log(obj.age)
// obj.age = 16

//
class Info {
  constructor(age) {
    this._age = age
  }

  set age(v) {
    console.log('set')
    this._age = v
  }

  get age() {
    console.log('get')
    return this._age
  }
}

// const p = new Info(17)
// console.log(p.age + 'p')
// p.age = 18

//
const Infos = class {}

//私有方法
const f1 = () => {
  return 'aa'
}

const test2 = Symbol('test')

class PrivateDemo {
  #name = 'provate'
  constructor() {}

  getP() {
    //私有方法移到类外
    f1()
    console.log(this.#name)
  }

  [test2]() {
    console.log('test')
  }
}

const pridemo = new PrivateDemo()
// console.log(pridemo['#name'])
pridemo.getP()

//new.target
class Rectangle {
  constructor(length, width) {
    console.log(new.target === Rectangle)
    // ...
    if (new.target === Rectangle) {
      throw Error('不能实例化对象')
    } else if (new.target === Square) {
      console.log('right')
    }
  }
}

class Square extends Rectangle {
  constructor(length, width) {
    super(length, width)
  }
}

var obj_square = new Square(3) // 输出 false
//new Rectangle()
