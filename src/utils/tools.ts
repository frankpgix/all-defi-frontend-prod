import dayjs from 'dayjs'
import BN from 'bignumber.js'
import numeral from 'numeral'
// import { ethers } from 'ethers'
import duration from 'dayjs/plugin/duration'
// import { BigNumberish } from '@ethersproject/bignumber'
// import { formatUnits } from '@ethersproject/units'
import { formatUnits, parseUnits } from 'viem'

dayjs.extend(duration)

export const toType = (obj: any): string => {
  // @ts-ignore
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}

export const copyText = (text: string) => {
  return new Promise((resolve, reject) => {
    try {
      const input = document.createElement('textarea')
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input?.parentElement?.removeChild(input)
      resolve(text)
    } catch (e) {
      reject(e)
    }
  })
}

export const isMobile = (): boolean => {
  return (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    ) != null
  )
}

export const px2rem = (px: number | string): string => {
  return `${String(Number(px) / 100)}rem`
}

export const num2size = (num: number | string): string => {
  return isMobile() ? px2rem(num) : `${String(num)}px`
}

// sleep
export const sleep = async (time: number): Promise<any> => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

export const getMaxZIndex = (): number => {
  // @ts-ignore
  return [...document.getElementsByTagName('*')].reduce(
    (r, e) => Math.max(r, +window.getComputedStyle(e).zIndex || 0),
    0
  )
}

export const calcShortHash = (hash = '', before?: number, end?: number) => {
  const reg = new RegExp(`(\\w{${before ?? 15}})\\w*(\\w{${end ?? 15}})`)
  return hash.replace(reg, '$1...$2')
}

export const calcDateDuration = (date: string) => {
  const _date = dayjs(date)
  const _duration = dayjs.duration(dayjs(dayjs()).diff(_date))
  const _asDays = _duration.asDays()
  return Math.floor(_asDays)
}

// split number
export const safeInterceptionValues = (value: any, decimal = 8, precision = 18): string => {
  const isDecimal = toType(value) === 'object' && String(value).includes('.')
  const regexp = /(?:\.0*|(\.\d+?)0+)$/
  const _value = isDecimal ? (value as string) : formatUnits(value, precision)
  const _split = _value.split('.')
  const handle = `${_split[0]}.${(_split[1] ?? '0').substring(0, decimal)}`
  return handle.replace(regexp, '$1')
}

export const nonBigNumberInterception = (value: string | number, decimal = 2): string => {
  const base = String(value)
  return safeInterceptionValues(base.indexOf('.') > -1 ? base : `${base}.0`, decimal)
}

export const calcDecimalsFloor = (value: string | number, decimal = 2): string => {
  const base = String(value)
  const zero = new Array(decimal).fill('0').join('')
  if (base.includes('.')) {
    const [int, dec] = base.split('.')
    const decimals = (dec + zero).substring(0, decimal)
    return int + '.' + decimals
  } else {
    return base + '.' + zero
  }
}

export const formatNumber = (value: string | number, decimals = 8, format: string): string => {
  return numeral(calcDecimalsFloor(value, decimals)).format(format).toUpperCase()
}

// 1 --> 1000000000000000000
export const getDecimalAmount = (amount: number | string | BN, decimals = 8): BN => {
  return new BN(amount).times(new BN(10).pow(decimals))
}

export const getUnitAmount = (amount: number | string, decimals = 8): string => {
  return String(parseUnits(String(amount), decimals))
}

export const toHexString = (amount: number | string, decimals = 8) => {
  return '0x' + new BN(amount).shiftedBy(decimals).integerValue(BN.ROUND_DOWN).toString(16)
}

export const toFloorNum = (amount: number | string, decimals = 8) => {
  const num = new BN(amount).shiftedBy(decimals).integerValue(BN.ROUND_FLOOR)
  return num.toString()
}

export const sum = (numberArr: number[]): number => BN.sum(...numberArr).toNumber()

export const thousandthsDivision = (n: string | number) => {
  return n.toString().replace(/\d+/, (m) => m.replace(/(\d)(?=(\d{3})+$)/g, ($1) => $1 + ','))
}

export const createArrayByNumber = (length: number) => {
  const arr = []
  for (let i = 0; i <= length; i++) {
    arr.push(i)
  }
  return arr
}

// export const arrayObjectUniq = (Arr: any[], id: string): any[] => {
//   const obj: Record<string, any> = {}
//   return Arr.reduce((setArr, item) => {
//     // @ts-ignore
//     obj[item[id]] ? '' : (obj[item[id]] = true && setArr.push(item))
//     return setArr
//   }, [])
// }

// 定义一个泛型函数，接受一个对象作为参数，返回一个 Record 类型的对象
export function resetObjectValues<T extends object>(obj: T): Record<keyof T, number> {
  // 定义一个空对象，用来存储结果
  const result: Record<keyof T, number> = {} as Record<keyof T, number>
  // 遍历对象中的每个键
  for (const key of Object.keys(obj) as Array<keyof T>) {
    // 将键的值设置为数字零
    result[key] = 0
  }
  // 返回对象
  return result
}

// 生成随机UUID
export const makeUUID = () => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const radix = chars.length
  const uuid = []
  for (let i = 0; i < 32; i++) uuid[i] = chars[0 | (Math.random() * radix)]
  return uuid.join('')
}
