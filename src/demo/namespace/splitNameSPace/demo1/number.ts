// namespace 代替内部模块
// tslint:disable-next-line:no-namespace
namespace Validationrr {
  export const isNumberReg = /^[0-9]+$/
  export const checkNumber = (text: any) => {
    return isNumberReg.test(text)
  }
}

// 现在一般不适用命名空间
