import { FC } from 'react'
import classNames from 'classnames'

interface Props {
  value: number
  size: 'mini' | 'large'
}

const PercentageLine: FC<Props> = ({ value, size }) => {
  return (
    <div className={classNames('web-c-percentage-line', size)}>
      <div className="web-c-percentage-line-inner" style={{ width: `${value}%` }}></div>
    </div>
  )
}

export default PercentageLine
