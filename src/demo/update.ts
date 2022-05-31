function getIndexPromise(bool: boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1)
      if (bool) {
        resolve('a')
      } else {
        reject('b')
      }
    }, 1000)
  })
}

// getIndexPromise(true).then(console.log)
async function f() {
  try {
    const res = await getIndexPromise(true)
    console.log(res)
  } catch (e) {
    console.log(e)
  }
}

f()

interface Res {
  data: {
    [key: string]: any
  }
}

namespace axios {
  export function post(url: string, config: object): Promise<Res> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const res: Res = { data: {} }
        if (url === '/login') {
          res.data.user_id = 111
        } else {
          res.data.role = 'admin'
        }
        resolve(res)
      }, 1000)
    })
  }
}
interface InfoUsr {
  userName: string
  pwd: number
}
async function loginReq({ userName, pwd }: InfoUsr) {
  try {
    console.log(1)
    const res: Res = await axios.post('/login', {
      data: {
        userName,
        pwd,
      },
    })
    return res
  } catch (error) {
    throw new Error('e')
  }
}

async function getRoleReq(user_id: number) {
  try {
    console.log(1)
    const res: Res = await axios.post('/user_roles', {
      data: {
        user_id,
      },
    })
    return res
  } catch (e) {
    // !必须得throw Error，要不是类型不匹配
    throw new Error('e')
  }
}

loginReq({ userName: 'wjx', pwd: 123 }).then((res) => {
  const {
    data: { user_id },
  } = res
  getRoleReq(user_id).then((res2) => {
    const {
      data: { role },
    } = res2
    console.log(role)
  })
})

// 动态导入表达式，实现按需加载
async function getTime(format: string) {
  const moment = await import('moment')
  return moment.default().format(format)
}

getTime('L').then((res) => {
  console.log(res)
})

// 弱类型探测:任何只包含可选属性的类型都是弱类型
// 从2.4版本开始，给弱类型的值赋值的时候，当值与弱类型没有重叠属性，会报错
interface Objin {
  name?: string
  age?: number
}

let obj_in = {
  sex: '12',
}

function testObjin(obj: Objin) {
  console.log(obj)
}

// testObjin(obj_in) // error
testObjin(obj_in as Objin)

// ...运算符
function merge<T, U extends string>(obj1: T, p: U) {
  return { ...obj1, p }
}
console.log(merge({ a: 'a' }, 'op2'))

// 剩余属性
function getExcludeProp<T extends { prop: string }>(obj: T) {
  const { prop, ...rest } = obj
  return rest
}
console.log(getExcludeProp({ prop: 'name', age: 'age', sex: 'male' }))
