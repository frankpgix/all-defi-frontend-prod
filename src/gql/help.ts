import dayjs from 'dayjs'

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
