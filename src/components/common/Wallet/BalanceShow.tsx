import React, { FC, useMemo } from 'react'
import numeral from 'numeral'
import BN from 'bignumber.js'

import classNames from 'classnames'
import { BASE_TOKEN_SYMBOL } from '@/config/tokens'
interface Props {
  value: number | string
  unit: string
  format?: boolean
  percent?: boolean
}

const BalanceShow: FC<Props> = ({ value, unit, format = true, percent = false }) => {
  const [int, dec, million, isDec] = useMemo(() => {
    const realVal = percent ? new BN(value).multipliedBy(100) : value
    const isMillion = realVal >= 1000000
    const isDec = realVal < 1
    const formatRule = isMillion && format ? '0,0.00 a' : '0,0.00'
    return [...numeral(realVal).format(formatRule).split('.'), isMillion, isDec]
  }, [value, format, percent])
  return (
    <div className={classNames('web-balance-show', { million: million && format }, { dec: isDec })}>
      <strong>{int}</strong>
      <small>
        .{dec}
        {percent ? '%' : ''}
      </small>
      {unit && <span>{unit}</span>}
    </div>
  )
}

BalanceShow.defaultProps = {
  value: 0,
  unit: BASE_TOKEN_SYMBOL
}

export default BalanceShow

/**
 * 备用方案：
 * 处理无小数位时候不显示小数位情况
 * 支持任意大的整数

 import React, { FC } from 'react'
 import { safeInterceptionValues } from '@/utils/tools'
 interface Props {
  value: string
  unit: string
}

 const BalanceShow: FC<Props> = ({ value, unit }) => {
  const [int, dec] = safeInterceptionValues(value).split('.')

  return (
    <div className="web-balance-show">
      <strong>{Intl.NumberFormat().format(BigInt(int))}</strong>
      {dec && (<small>.{dec}</small>)}
      <span>{unit}</span>
    </div>
  )
}

 BalanceShow.defaultProps = {
  value: '0',
  unit: 'BUSD'
}

 export default BalanceShow
 */
