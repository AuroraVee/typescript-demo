// namespace 代替内部模块
// tslint:disable-next-line:no-namespace
var Validation;
(function (Validation) {
    Validation.isNumberReg = /^[0-9]+$/;
    Validation.checkNumber = function (text) {
        return Validation.isNumberReg.test(text);
    };
})(Validation || (Validation = {}));
// 现在一般不适用命名空间
// namespace 代替内部模块
// tslint:disable-next-line:no-namespace
var Validation;
(function (Validation) {
    Validation.isLetterReg = /^[A-Za-z]+$/;
    Validation.checkLetter = function (text) {
        return Validation.isLetterReg.test(text);
    };
})(Validation || (Validation = {}));
// 导入命名空间
/// <reference path="./number.ts" />
/// <reference path="./letter.ts" />
var isLetter = Validation.checkLetter('abc');
console.log(isLetter);
var isNumber = Validation.checkNumber('abc');
console.log(isNumber);
// tsc测试： npx tsc --outFile use.js use.ts
