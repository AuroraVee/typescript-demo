// “外部模块”称为“模块”，而“内部模块”称做“命名空间”
// 不同命名空间之间互不影响
namespace Validation {
  // 把需要在命名空间外部使用的用export导出
  export interface StringValidator {
    isAcceptable(s: string): boolean
  }

  const lettersRegexp = /^[A-Za-z]+$/
  const numberRegexp = /^[0-9]+$/

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s)
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s)
    }
  }
}

namespace T {
  const name = 'wjx'
}

// Some samples to try
const strings = ['Hello', '98052', '101']

// Validators to use
const validators: { [s: string]: Validation.StringValidator } = {}
validators['ZIP code'] = new Validation.ZipCodeValidator()
validators['Letters only'] = new Validation.LettersOnlyValidator()

// Show whether each string passed each validator
for (const s of strings) {
  for (const name in validators) {
    console.log(
      `"${s}" - ${
        validators[name].isAcceptable(s) ? 'matches' : 'does not match'
      } ${name}`,
    )
  }
}

export {}
