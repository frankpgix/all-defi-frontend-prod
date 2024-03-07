import { sum } from 'lodash'

// 定义一个函数，接受一个数组作为参数

export const removeZeroKeys = (array: any[]) => {
  array.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (sum(array.map((item) => item[key] ?? 0)) === 0) {
        delete obj[key]
      }
    })
  })
  // 返回修改后的数组
  return array
}
