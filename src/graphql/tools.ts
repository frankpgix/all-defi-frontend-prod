import dayjs from 'dayjs'
import { sum } from 'lodash'

export const timeDiffType = (startTime: number) => {
  const diff = dayjs().unix() - startTime
  if (diff <= 60 * 60 * 24) return 'hour'
  if (diff <= 60 * 60 * 24 * 7) return 'day'
  return 'longTime'
}

export const typeStartTime = (type: string) => {
  const now = dayjs().unix()
  if (type === 'DAY') {
    return now - 24 * 60 * 60
  }
  if (type === 'WEEK') {
    return now - 24 * 60 * 60 * 7
  }
  if (type === 'MONTH') {
    return now - 24 * 60 * 60 * 30
  }
  if (type === 'YEAR') {
    return now - 24 * 60 * 60 * 365
  }
  return now
}
// export const calcDiffDayUnixArray = (startTime: number) => {
//   if (startTime === 0) return []
//   const currDayUnix = ~~(dayjs(dayjs().format('MMM DD, YYYY 00:00:00')).unix() / 60 / 60 / 24)
//   const start = ~~(startTime / 60 / 60 / 24)
//   // console.log(currDayUnix, start)
//   const unixArray = []
//   for (let unix = start; unix <= currDayUnix; unix++) {
//     console.log(unix)
//     unixArray.push(unix * 60 * 60 * 24)
//   }
//   return unixArray
// }

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

export const get10MinutelyUnix = () => {
  const now = dayjs().format('MMM DD, YYYY HH:mm:00')
  const temp = now.slice(0, now.length - 4) + '0:00'
  return dayjs(temp).unix()
  // console.log(now)
  // return dayjs(dayjs().format('MMM DD, YYYY HH:m0:00')).unix() - 3000
}
