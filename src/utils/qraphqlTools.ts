import dayjs from 'dayjs'

export const getCurrHourUnix = () => {
  return dayjs(dayjs().format('MMM DD, YYYY HH:00:00')).unix()
}

export const get10MinutelyUnix = () => {
  // const now = dayjs().format('MMM DD, YYYY HH:DD:00')
  // const temp = now.slice(0, now.length - 4) + '0:00'
  // return dayjs(temp).unix()
  return dayjs(dayjs().format('MMM DD, YYYY HH:DD:00')).unix()
}

export const getCurrDayUnix = () => {
  return dayjs(dayjs().format('MMM DD, YYYY 00:00:00')).unix()
}

export const get24HourUnix = () => {
  const currHourUnix = get10MinutelyUnix()
  return [...new Array(24)].map((_, index: number) => currHourUnix - index * 60 * 60)
}

export const getWeekUnix = () => {
  const currHourUnix = get10MinutelyUnix()
  return [...new Array(24 * 7)].map((_, index: number) => currHourUnix - index * 60 * 60)
}

export const getMonthUnix = () => {
  const currDayUnix = get10MinutelyUnix()
  return [...new Array(60)].map((_, index: number) => currDayUnix - index * 60 * 60 * 12)
}

export const getYearUnix = () => {
  const currDayUnix = get10MinutelyUnix()
  return [...new Array(90)].map((_, index: number) => currDayUnix - index * 60 * 60 * 24 * 4)
}

export const getAllUnix = (startTime: number) => {
  // let currUnix = 0
  const now = dayjs().unix()
  const diffTime = now - startTime
  const curr10MinutelyUnix = get10MinutelyUnix()
  const currHourUnix = getCurrHourUnix()

  if (diffTime <= 60 * 60 * 10) {
    console.log(1111)
    return [...new Array(60)].map((_, index: number) => curr10MinutelyUnix - index * 60 * 10)
  }

  if (diffTime <= 60 * 60 * 100) {
    console.log(2222)
    return [...new Array(60)].map((_, index: number) => curr10MinutelyUnix - index * 60 * 100)
  }

  if (diffTime <= 60 * 60 * 24 * 10) {
    console.log(3333)
    return [...new Array(60)].map((_, index: number) => curr10MinutelyUnix - index * 60 * 24 * 10)
  }

  if (diffTime <= 60 * 60 * 24 * 30) {
    console.log(4444)
    return [...new Array(30)].map((_, index: number) => currHourUnix - index * 60 * 60 * 24)
  }

  if (diffTime <= 60 * 60 * 24 * 30 * 3) {
    console.log(55555)
    return [...new Array(30)].map((_, index: number) => currHourUnix - index * 60 * 60 * 24 * 3)
  }

  if (diffTime <= 60 * 60 * 24 * 30 * 6) {
    return [...new Array(30)].map((_, index: number) => currHourUnix - index * 60 * 60 * 24 * 6)
  }

  if (diffTime <= 60 * 60 * 24 * 30 * 12) {
    return [...new Array(30)].map((_, index: number) => currHourUnix - index * 60 * 60 * 24 * 12)
  }

  if (diffTime <= 60 * 60 * 24 * 30 * 12 * 2) {
    return [...new Array(30)].map((_, index: number) => currHourUnix - index * 60 * 60 * 24 * 12 * 2)
  }

  return null
}

export const getTypeUnix = (type: string, startTime?: number) => {
  if (type === 'DAY') return JSON.stringify(get24HourUnix())
  if (type === 'WEEK') return JSON.stringify(getWeekUnix())
  if (type === 'MONTH') return JSON.stringify(getMonthUnix())
  if (type === 'YEAR') return JSON.stringify(getYearUnix())
  // if (type === 'ALL' && startTime) return JSON.stringify(getAllUnix(startTime))
  return null
}
