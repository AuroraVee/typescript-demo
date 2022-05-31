type addFun = (n1: number, n2?: number) => number
let add: addFun = (n1) => n1

// 默认参数值
type addFun2 = (n1: number, n2: number) => number
let add2: addFun2 = (n1: number, n2: number = 2) => n1 + n2

// 剩余参数
const handleData = (arg1: number, ...args: number[]) => {
  return args.push(arg1)
}

// 函数重载，必须使用function声明
function handle(x: number): number
function handle(x: string): string
function handle(x: number | string) {
  return x
}
