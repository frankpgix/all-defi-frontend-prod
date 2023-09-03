import dayjs from 'dayjs'
import { sum } from 'lodash'

export const calcDataTypeAndStartTime = (type: string, startTime: number) => {
  const now = dayjs().unix()
  const o = {
    startTime,
    dataType: '1w'
  }
  if (type === 'DAY') {
    o.startTime = now - 24 * 60 * 60
    o.dataType = '15m'
  }
  if (type === 'WEEK') {
    o.startTime = now - 24 * 60 * 60 * 7
    o.dataType = '1h'
  }
  if (type === 'MONTH') {
    o.startTime = now - 24 * 60 * 60 * 30
    o.dataType = '6h'
  }
  if (type === 'YEAR') {
    o.startTime = now - 24 * 60 * 60 * 365
    o.dataType = '1w'
  }
  return o
}

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
