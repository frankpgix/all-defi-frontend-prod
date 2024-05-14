import { FC, ReactNode } from 'react'

import classNames from 'classnames'

interface Props {
  value: string | number
  onChange: (val: string | number) => void
  options: { label: string | ReactNode; value: string | number }[]
}

const ButtonSelect: FC<Props> = ({ value, onChange, options }) => {
  return (
    <div className="c-select-button">
      {options.map((item, index) => (
        <span
          key={index}
          onClick={() => onChange(item.value)}
          className={classNames({ active: item.value === value })}
        >
          {item.label}
        </span>
      ))}
    </div>
  )
}

export default ButtonSelect
