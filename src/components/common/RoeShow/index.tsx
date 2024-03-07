import { FC, useMemo } from 'react'
import classNames from 'classnames'
import { floor } from 'lodash'
interface Props {
  value: number | string
  preArrow?: boolean
  subArrow?: boolean
}

const RoeShow: FC<Props> = ({ value, preArrow, subArrow }) => {
  const val = floor(Number(value), 2)
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
      {val}%
    </span>
  )
}

export default RoeShow
