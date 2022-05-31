class A {
  static hello() {
    console.log('hello world')
  }
}

class B extends A {}
//除了私有属性，父类的所有属性和方法，都会被子类继承，其中包括静态方法。
B.hello() // hello world

//super虽然代表了父类A的构造函数，但是返回的是子类B的实例
class A_ {
  constructor() {
    console.log(new.target.name)
  }
}
class B_ extends A_ {
  constructor() {
    super()
  }
}
new A_() // A
new B_() // B

//super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
