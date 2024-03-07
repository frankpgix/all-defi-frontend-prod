import { FC } from 'react'
import classNames from 'classnames'

interface Props {
  value: string
  onChange: (val: string) => void
  startTime: number
}

const TimeSelect: FC<Props> = ({ value, onChange, startTime }) => {
  const diff = +new Date() - startTime
  const options = [
    { time: 0, key: 'DAY', label: 'DAY' },
    { time: 1000 * 60 * 60 * 24, key: 'WEEK', label: 'WEEK' },
    { time: 1000 * 60 * 60 * 24 * 7, key: 'MONTH', label: 'MONTH' },
    { time: 1000 * 60 * 60 * 24 * 30, key: 'YEAR', label: 'YEAR' },
    { time: 1000 * 60 * 60 * 24 * 30 * 6, key: 'ALL', label: 'ALL' }
  ]

  const onItemClick = (item: { time: number; key: string }) => {
    if (diff >= item.time) {
      onChange(item.key)
    }
  }
  return (
    <div className="web-c-time-select">
      {options.map((item, index) => (
        <span
          key={index}
          onClick={() => onItemClick(item)}
          className={classNames({ active: item.key === value, disable: diff < item.time })}
        >
          {item.label}
        </span>
      ))}
    </div>
  )
}

export default TimeSelect
