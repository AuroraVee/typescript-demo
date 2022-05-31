// 引入其他的全局库,UMD也可以
/// <reference types="moment"/>
// 引入其他的模块库
import * as moment from 'moment'

declare function setTile(title: string | number): void

declare function getTitle(): string

declare let documentTitle: string

// 不写该声明就会报错
interface String {
  getFirstLetter(): string
}
