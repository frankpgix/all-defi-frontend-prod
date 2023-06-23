import dayjs from 'dayjs'

export const getCurrHourUnix = () => {
  return dayjs(dayjs().format('MMM DD, YYYY HH:00:00')).unix()
}

export const get10MinutelyUnix = () => {
  const now = dayjs().format('MMM DD, YYYY HH:DD:00')
  const temp = now.slice(0, now.length - 4) + '0:00'
  return dayjs(temp).unix()
}

export const getCurrDayUnix = () => {
  return dayjs(dayjs().format('MMM DD, YYYY 00:00:00')).unix()
}

export const get24HourUnix = () => {
  const currHourUnix = getCurrHourUnix()
  return [...new Array(24)].map((_, index: number) => currHourUnix - index * 60 * 60)
}

export const getWeekUnix = () => {
  const currHourUnix = getCurrHourUnix()
  return [...new Array(6 * 7)].map((_, index: number) => currHourUnix - index * 60 * 60 * 4)
}

export const getMonthUnix = () => {
  const currDayUnix = getCurrDayUnix()
  return [...new Array(60)].map((_, index: number) => currDayUnix - index * 60 * 60 * 12)
}

export const getYearUnix = () => {
  const currDayUnix = getCurrDayUnix()
  return [...new Array(180)].map((_, index: number) => currDayUnix - index * 60 * 60 * 24 * 2)
}

export const getTypeUnix = (type: string) => {
  if (type === 'DAY') return JSON.stringify(get24HourUnix())
  if (type === 'WEEK') return JSON.stringify(getWeekUnix())
  if (type === 'MONTH') return JSON.stringify(getMonthUnix())
  if (type === 'YEAR') return JSON.stringify(getYearUnix())
  return null
}
