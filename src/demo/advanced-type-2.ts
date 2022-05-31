import { type } from 'os'

export const a = 1

class Counter {
  constructor(public count: number = 0) {}

  public add(value: number) {
    this.count += value
    return this
  }

  public subtract(value: number) {
    this.count -= value
    return this
  }
}

const counter1 = new Counter(10)
console.log(counter1.add(3).subtract(5))

// tslint:disable-next-line:max-classes-per-file
class PowCounter extends Counter {
  constructor(public count: number = 0) {
    super(count)
  }

  public pow(value: number) {
    this.count = this.count ** value
    return this
  }
}

const powCounter = new PowCounter(2)
console.log(powCounter.pow(3).add(1))

// 索引类型查询符 keyof:返回索引类型的联合类型
interface Info {
  name: string
  age: number
}

let info: keyof Info // Info属性形成的联合类型
info = 'name'
info = 'age'
// info="sex" // error
// 返回结果为T中以K为属性的值的类型 形成的数组
function getValue<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
  return names.map((name) => obj[name])
}

const infoObj = {
  name: 'wjx',
  age: 18,
}

const obj1: string[] = getValue(infoObj, ['name'])
const obj2: (string | number)[] = getValue(infoObj, ['name', 'age'])

// 索引访问操作符 []
type NameTypes = Info['name'] // string类型
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}

interface Objs<T> {
  [key: string]: T
}
// tslint:disable-next-line:prefer-const
let keys: keyof Objs<number> // number|string

interface Objs2<T> {
  [key: number]: T
}
// tslint:disable-next-line:prefer-const
let keys2: keyof Objs2<string> // number 只能是number

const obj3: Objs<number> = {
  age: 18,
}

const key: Objs<number>['name'] = 18 // number

//
interface Type {
  a: never
  b: never
  c: string
  d: number
  e: undefined
  f: null
  g: object
}

type Test = Type[keyof Type]

// 映射类型
interface Info2 {
  age: number
  name: string
  sex: string
}

type ReadonlyType<T> = {
  readonly // 循环给T类型的所有属性加上readonly，值类型保持一样
  [p in keyof T]: T[p]
}

type choiceType<T> = {
  // 让属性变成可选属性
  [p in keyof T]?: T[p]
}

type readonlyInfo1 = ReadonlyType<Info2>

// 增加或移除修饰符
type RemoveReadonlyType<T> = {
  -readonly [P in keyof T]+?: T[P]
}

type AddReadonlyType<T> = {
  +readonly [P in keyof T]-?: T[P]
}

const info1: readonlyInfo1 = {
  age: 18,
  name: 'wjx',
  sex: 'female',
}
// info1.name='ss' // error

// 内置的映射类型
// Readonly、 Partial
// Pick 、Record

const info3: Info2 = {
  age: 18,
  name: 'wjx',
  sex: 'female',
}

// 从T对象上取出一部分属性名，形成新的对象
// tslint:disable-next-line:no-shadowed-variable
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const res: any = {}
  // tslint:disable-next-line:no-shadowed-variable
  keys.map((key) => (res[key] = obj[key]))
  return res
}
const nameAndAge = pick(info3, ['name', 'age'])

// Record以K做属性，T做值
function mapObj<K extends string | number, T, U>(
  obj: Record<K, T>,
  f: (x: T) => U,
): Record<K, U> {
  const res: any = {}
  // tslint:disable-next-line:forin
  for (const key in obj) {
    res[key] = f(obj[key])
  }
  return res
}

const names = { 0: 'ww', 1: 'ss', 2: 'aa' }
const lengths = mapObj(names, (s) => s.length)
console.log(lengths)

// 由映射类型进行推断 推断原始类型
type Proxy<T> = {
  get(): T
  set(v: T): void
}

type Poxify<T> = {
  [P in keyof T]: Proxy<T[P]>
}

// 作用：返回的对象的属性执行set/get会作用到obj对象上
function proxify<T>(obj: T): Poxify<T> {
  const res = {} as Poxify<T>
  for (const key in obj) {
    res[key] = {
      get() {
        return obj[key]
      },
      set(v) {
        obj[key] = v
      },
    }
  }

  return res
}

const props = {
  name: 'wjx',
  age: 19,
}

const propxyProps = proxify(props)
propxyProps.name.set('li')
console.log(props, 'proxy')

// 重新获取原来未包装的对象
function unproxify<T>(t: Poxify<T>): T {
  const res = {} as T
  for (const key in t) {
    res[key] = t[key].get()
  }
  return res
}
const originProps = unproxify(propxyProps)
console.log(originProps)

// 映射类型对string、number、symbol属性的支持
const stringIndex = 'a'
const numberIndex = 1
const symbolIndex = Symbol()
type Objs4 = {
  [stringIndex]: string
  [numberIndex]: number
  [symbolIndex]: symbol
}
type keysType = keyof Objs4
type ReadonlyT<T> = {
  readonly [P in keyof T]: T[P]
}
const o: ReadonlyT<Objs4> = {
  a: 's',
  1: 1,
  [symbolIndex]: Symbol(),
}
// o.a=1 // 只读属性

// 元组和数组映射类型
type MapToPromise<T> = {
  [K in keyof T]: Promise<T[K]>
}
type Tuple = [number, string, boolean]
type promiseTuple = MapToPromise<Tuple>
const tuple1: promiseTuple = [
  new Promise((resolve, reject) => resolve(1)),
  new Promise((resolve, reject) => resolve('a')),
  new Promise((resolve, reject) => resolve(false)),
]

// unknown
// 1. 任何类型都可以赋值给unknown类型
let v: unknown
v = '1'
v = 1
// 2. 如果没有类型断言或基于控制流的类型细化时，unknown不可以赋值给其他类型,此时它只能赋值给unknown和any类型
let v2: unknown
// let v3:string=v2 error
v = v2 // unknown赋值给unknown
// 3. 如果没有类型断言或基于控制流的类型细化时,不能在它上面进行任何操作
let v3: unknown
// v3+=1 error
// 4. unknown与任何其他类型组成的交叉类型，最后都等于其他类型
type Type1 = unknown & number // number
// 5.unknown与任何其他类型(除any以外)组成的联合类型，最后都等于unknown
type Type2 = unknown | number
type Type3 = unknown | string
// 6. never是unknown的子类型
type Type4 = never extends unknown ? true : false // true
// 7. keyof unknown等于类型never
type Type5 = keyof unknown
// 8. 只能对unknown进行等或者不等操作，不能进行其他操作
console.log(v === v2)
console.log(v !== v2)
// 9 .unknown类型的值不能访问它的属性，作为函数调用和作为类创建的实例
let v5: unknown
// v5.name error
// v5() error
// new v5() error

// 10. 使用映射类型时如果遍历的是unknown类型，则不会映射任何属性
type Type6<T> = {
  [P in keyof T]: number
}
type type7 = Type6<any> // [x:string]:number
type type8 = Type6<unknown> // {}

// T extends U?X:Y 条件类型
type Types7<T> = T extends string ? string : number
let index: Types7<false>

// 分布式条件类型
type TypeName<T> = T extends any ? T : never
type Type8 = TypeName<string | number> // string | number

type TypeName2<T> = T extends string
  ? string
  : T extends number
  ? number
  : T extends undefined
  ? undefined
  : T extends boolean
  ? boolean
  : T extends () => void
  ? () => void
  : object
type Type9 = TypeName2<() => void>
type Type10 = TypeName2<string[]>
type Type11 = TypeName2<string[] | (() => void)>

type Diff<T, U> = T extends U ? never : T
// 判断前面的每个类型是否是后面类型的子类型
type Test44 = Diff<string | number | boolean, undefined | number>
type ttt = never | string // string

// 映射类型与条件类型结合
type Type13<T> = {
  // tslint:disable-next-line:ban-types
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T] // 返回属性不为never的属性名

interface Part {
  id: number
  name: string
  subpart: Part[]
  update(newName: string): void
  test(newName: string): void
}
type Test7 = Type13<Part> // update|test

// infer
// 传入数组，取数组的元素类型，否则直接取
type Type15<T> = T extends any[] ? T[number] : T
type test2 = Type15<string[]> // string 传入数组，取数组的元素类型，否则直接取
type test3 = Type15<string> // string

// tslint:disable-next-line:array-type
type Type16<T> = T extends Array<infer U> ? U : T // infer自动推断元素类型
type test5 = Type15<string[]> // string

// Exclude<T,U> 内置类型
type Type17<T> = Exclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
// Extract<T,U> 内置类型
type Type18<T> = Extract<'a' | 'b' | 'c', 'a' | 'b'> // 'a' | 'b'
// NonNullable<T>
type Type19 = NonNullable<string | null | undefined | boolean> // 去除null和undefined
// ReturnType<T> 获取函数类型的返回类型
type Type20 = ReturnType<() => string>
type Type21 = ReturnType<() => void>

// InstanceType
class A {
  constructor() {}
}
type Type22 = InstanceType<typeof A> // 获取A创建实例的类型 -》 就是A
type Type23 = InstanceType<any>
type Type24 = InstanceType<never>
