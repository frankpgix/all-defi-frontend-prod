import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'

interface Props {
  children: ReactNode
  value?: string | number
}
const Badge: FC<Props> = ({ children, value }) => {
  return (
    <div className="web-badge-layout">
      <div className={classNames('web-badge', { dot: value == null })}>{value}</div>
      {children}
    </div>
  )
}

export default Badge
