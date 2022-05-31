interface NameInfo {
  name?: string
  readonly lastName: string
  [prop: string]: any
}

const getName = ({ name, lastName }: NameInfo): string => `${name} ${lastName}`

const obj: NameInfo = { lastName: 'wjx' }

// 数组限定

interface ArrInter {
  0: number
  1: string
}

const arr: ArrInter = [1, '2']

// 函数限制
type funcInfo = (n1: number, n2: number) => number

// 限制对象的属性类型
interface Role {
  [id: string]: string
}

const obj2: Role = { [Symbol('e')]: 'w' }

// 接口继承
interface Veg {
  color: string
}

interface Tomato extends Veg {
  number: number
}

const obj3: Tomato = { number: 1, color: 'blue' }

// 返回一个满足固定接口的函数
interface Counter {
  (): void
  count: number
}

const getCounter = (): Counter => {
  const c = () => {
    c.count++
  }
  c.count = 0
  return c
}

const counter: Counter = getCounter()
counter()
// console.log(counter.count)

counter()
// console.log(counter.count)
