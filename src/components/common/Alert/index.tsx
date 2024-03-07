import { FC, ReactNode } from 'react'
import classNames from 'classnames'

interface Props {
  type?: 'success' | 'error' | 'info'
  size?: 'default' | 'mini'
  children: ReactNode
  show?: boolean
}

const Alert: FC<Props> = ({ type = 'info', size = 'default', children, show }) => {
  if (!show) return null
  return (
    <div className={classNames('web-c-alert', `web-c-alert-${type}`, `web-c-alert-size-${size}`)}>
      <p>{children}</p>
    </div>
  )
}

export default Alert
