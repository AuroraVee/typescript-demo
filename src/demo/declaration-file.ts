// 对于.d.ts声明的变量或者函数，不需要引入即可使用
// 对于global.js下的全局函数和变量，通过global.d.ts的声明，即可在这个文件直接使用
// 但是需要让global.js这个文件打包后出现在public下，然后还需要被index.html直接使用，才能变成一个全局库
console.log(documentTitle)

setTile('wjx')
console.log(getTitle())

import './module-types/add-method-to-string'
const name = 'wjx'
name.getFirstLetter()
