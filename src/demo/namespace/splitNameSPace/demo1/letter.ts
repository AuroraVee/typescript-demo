// export const a = 1

// namespace 代替内部模块
// tslint:disable-next-line:no-namespace
namespace Validationrr {
  export const isLetterReg = /^[A-Za-z]+$/
  export const checkLetter = (text: any) => {
    return isLetterReg.test(text)
  }
}
