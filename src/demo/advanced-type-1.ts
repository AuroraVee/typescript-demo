export const a = 1

// 交叉类型
const mergeFunc = <T, U>(arg1: T, arg2: U): T & U => {
  let res = {} as T & U
  res = Object.assign(arg1, arg2)
  return res
}

mergeFunc({ a: 1 }, { b: 2 }) // 只能获取a或者b属性

// 联合类型
const getLengthFunc = (content: string | number): number => {
  if (typeof content === 'string') {
    return content.length
  } else {
    return content.toString().length
  }
}

// console.log(getLengthFunc(false));

const valueList = [12, 'ab']
const getRandomValue = () => {
  const random = Math.random() * 10
  if (random < 5) {
    return valueList[0]
  } else {
    return valueList[1]
  }
}
const v = getRandomValue()
// 联合类型，如何定义类型保护.
// tyoeof实现类型保护只能使用等于/不等于，且类型只能是string/number/boolean/symbol
function isString(value: string | number): value is string {
  return typeof value === 'string'
}

if (isString(v)) {
  console.log(v.length)
} else {
  console.log(v.toFixed())
}

// 或者使用类型断言
if ((v as string).length) {
  console.log((v as string).length)
} else {
  console.log((v as number).toFixed())
}

// instanceof 实现类型保护
class CreateByClass1 {
  public age = 18
}

// tslint:disable-next-line:max-classes-per-file
class CreateByClass2 {
  public name = 18
}

function getRandomItem() {
  if (Math.random() < 0.5) {
    return new CreateByClass1()
  } else {
    return new CreateByClass2()
  }
}

const item = getRandomItem()
if (item instanceof CreateByClass1) {
  console.log(item.age)
} else {
  console.log(item.name)
}

// null/undefined
const value: string | undefined = '1'
// string|null 与 string|undefined 与 string|undefined|null 是三种完全不同的类型
// 可选参数自动加上Undefined类型
const sumFun = (n1: number, n2?: number) => {
  return n1 + (n2 || 0)
}

// 类型保护和类型断言
const getLength = (num: string | null): number => {
  return (num || '').length
}

function getSpliceStr(num: number | null): string {
  function getRes(prefix: string): string {
    // 添加一个 ! 实现类型断言
    return prefix + num!.toFixed().toString()
  }

  // 这里有个问题，如果number为0，也会变成0.1
  num = num || 0.1
  return getRes('wjx-')
}

console.log(getSpliceStr(1.2))

// 类型别名
type TypeString = string
const c: TypeString = '1'
// 别名中也可以使用泛型
type PositionType<T> = { x: T; y: T }
interface PositionType1<T> {
  x: T
  y: T
}

const position1: PositionType<number> = { x: 1, y: 1 }
const position2: PositionType<string> = { x: 'left', y: 'top' }

type Childs<T> = {
  current: T
  // 只可以在属性中循环引用别名
  // !type Childs=Childs[] 错误
  childs?: Childs<T>
}
const cc: Childs<string> = {
  current: '1',
  childs: {
    current: '1-1',
  },
}

// 类型别名不能使用 extends 和 implements
// 有时类型别名和接口可以表达同样的结构
// 使用字面量定义别名
type Name = 'wjx' // 不能修改
// const user:Name="w" // error，不能修改
type Direction = 'left' | 'right' | 'top' | 'down'
function getDirectionFirstLetter(direction: Direction): string {
  return direction.substring(0, 1)
}
// 只能传联合类型中的某一个
getDirectionFirstLetter('right')

type Age = 18
interface Info {
  name: string
  age: Age
}
const me: Info = { name: '1', age: 18 }

/**
 * 可辨识联合类型 两要素
 * 1.具有普通的单例类型属性
 * 2.一个类型别名包含了哪些类型的联合
 */
interface Square {
  kind: 'square'
  size: number
}
interface Rectangle {
  kind: 'rectangle'
  width: number
  height: number
}
interface Circle {
  kind: 'circle'
  radius: number
}

type Shape = Square | Rectangle | Circle
function getArea(s: Shape) {
  switch (s.kind) {
    case 'circle':
      return s.radius * s.radius
    case 'rectangle':
      return s.width * s.height
    case 'square':
      return s.size * s.size
    default:
      break
  }
}

// 完整性检查，比如Shape是三种类型的联合，如果在switch中缺少了某一种类型，能自动检查
function assertNever(val: never): never {
  throw new Error('unexpected error' + val)
}

function getArea2(s: Shape): number {
  switch (s.kind) {
    case 'circle':
      return s.radius * s.radius
    case 'rectangle':
      return s.width * s.height
    case 'square':
      return s.size * s.size
    default:
      // 用于检测缺少的情况
      return assertNever(s)
  }
}
