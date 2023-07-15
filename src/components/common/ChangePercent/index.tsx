import React, { FC, useMemo } from 'react'
import classNames from 'classnames'
import BN from 'bignumber.js'

interface Props {
  value: number
  size?: string
}

const ChangePercent: FC<Props> = ({ value, size }) => {
  const [valStr, isUp] = useMemo(() => {
    const isUp = value >= 0
    const valStr = `${isUp ? '+' : ''}${new BN(value).multipliedBy(100)}%`
    return [valStr, isUp]
  }, [value])
  return (
    <div className={classNames('web-change-percent', `web-change-percent-size-${size}`, { up: isUp }, { down: !isUp })}>
      <span>{valStr}</span>
    </div>
  )
}

ChangePercent.defaultProps = {
  size: 'default'
}

export default ChangePercent
