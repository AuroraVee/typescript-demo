export const a = 1

//eg 1
const getArray = <T>(value: T, times: number = 5): Array<T> => {
  return new Array(times).fill(value)
}

getArray<string>('5', 4).map((item) => item.length)
// 元组构成的数组
const getArray2 = <T, U>(p1: T, p2: U, times: number): [T, U][] => {
  return new Array(times).fill([p1, p2])
}

getArray2<number, string>(1, 'a222', 3).forEach((item) => {
  //   console.log(item[0])
  //   console.log(item[1].length)
})

type GetArray = <T>(value: T) => T[]

interface Demo<T> {
  <T>(value: T): T[]
  count: T
}

//泛型约束
interface ValueWithLength {
  length: number
}

//传入的类型必须具有length属性
const demo1 = <T extends ValueWithLength>(
  value: T,
  times: number = 5,
): Array<T> => {
  return new Array(times).fill(value)
}

//demo1(1)
demo1([1, 23])
demo1({ length: 3 })
demo1('qww')

//泛型约束2
//keyof T 返回T所有属性构成的数组，K继承它，则代表K是其中的一员
const getProps = <T, K extends keyof T>(obj: T, prop: K) => {
  return obj[prop]
}

getProps({ a: 1 }, 'a')
