import { FC, useMemo } from 'react'

import classNames from 'classnames'
import { floor } from 'lodash'

import { formatNumber } from '@/utils/tools'

interface Props {
  value: number | string
  preArrow?: boolean
  subArrow?: boolean
}

const RoeShow: FC<Props> = ({ value, preArrow, subArrow }) => {
  const val = floor(Number(value), 2)
  const valShow = formatNumber(val, 2, '0,0.00')
  const className = useMemo(
    () =>
      classNames(
        'web-c-row-show',
        val < 0 ? 'fall' : 'rise',
        { 'pre-arrow': preArrow },
        { 'sub-arrow': subArrow }
      ),
    [val, preArrow, subArrow]
  )
  return (
    <span className={className}>
      {val >= 0 ? '+' : ''}
      {valShow}%
    </span>
  )
}

export default RoeShow
