import { FC } from 'react'
import classNames from 'classnames'

interface Props {
  value: string
  onChange: (val: string) => void
  options?: string[]
}

const TimeSelect: FC<Props> = ({
  value,
  onChange,
  options = ['ALL', 'DAY', 'WEEK', 'MONTH', 'YEAR']
}) => {
  // const options: string[] = ['ALL', 'DAY', 'WEEK', 'MONTH', 'YEAR']
  return (
    <div className="web-c-time-select">
      {options.map((item, index) => (
        <span
          key={index}
          onClick={() => onChange(item)}
          className={classNames({ active: item === value })}
        >
          {item}
        </span>
      ))}
    </div>
  )
}

// TimeSelect.defaultProps = {
//   options: ['ALL', 'DAY', 'WEEK', 'MONTH', 'YEAR']
// }

export default TimeSelect
