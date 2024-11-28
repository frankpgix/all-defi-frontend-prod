import { FC, useMemo } from 'react'
import CountUp from 'react-countup'

import { TokenTypes } from '@/types/base'

import { formatNumber } from '@/utils/tools'
// import classNames from 'classnames'
import { TokenIcon } from '@@/common/TokenUnit'

interface Props {
  size?: string
  format?: string
  value: number
  token?: TokenTypes
  decimal?: number
  shares?: boolean
  noUnit?: boolean
  countUp?: boolean
}

const TokenValue: FC<Props> = ({
  value,
  size = 'default',
  token,
  format,
  decimal,
  shares,
  noUnit,
  countUp
}) => {
  const { precision, name } = token || {}
  const precisionNumber = useMemo(() => decimal ?? precision ?? 2, [decimal, precision])
  const formatString = useMemo(
    () => formatTokenValueString(format, precisionNumber),
    [format, precisionNumber]
  )
  const valueShow = useMemo(() => {
    if (formatString) {
      const t = formatNumber(value, precisionNumber, formatString)
      return t === 'NAN' ? '0' : t
    }
    return value
  }, [value, precisionNumber, formatString])

  return (
    <span className="c-token-value" title={`${valueShow} ${name}`}>
      {countUp ? <CountUp end={value} decimals={precisionNumber}></CountUp> : valueShow}
      {!noUnit && (shares ? ' Shares' : <TokenIcon size={size} name={name} />)}
    </span>
  )
}

export default TokenValue

export const formatTokenValueString = (format?: string, precisionNumber?: number) => {
  if (format && precisionNumber != null) {
    if (format.includes('.')) {
      const pre = format.split('.')[0]
      const zero = new Array(precisionNumber).fill('0').join('')
      return `${pre}.${zero}`
    } else {
      return format
    }
  }
  return ''
}
