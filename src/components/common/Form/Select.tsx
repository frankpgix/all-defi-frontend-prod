import { FC, useMemo, useRef, useState } from 'react'

import { useClickAway } from 'ahooks'
import classNames from 'classnames'

// import { toType } from '@/utils/tools'
import Image from '@@/common/Image'

export interface OptionProps {
  value: string | number
  label: string
  icon?: string
}

export interface SelectProps {
  label?: string
  value: string | number
  options?: string[]
  onChange: (value: string | number) => void
  objOptions?: OptionProps[]
  className?: string
  mini?: boolean
  disabled?: boolean
}

const Select: FC<SelectProps> = ({
  label,
  value,
  options = [],
  onChange,
  objOptions = [],
  className,
  mini,
  disabled
}) => {
  const ref = useRef(null)
  const [showOptions, setShowOptions] = useState(false)
  useClickAway(() => setShowOptions(false), ref)

  const calcCurrLabel = useMemo(() => {
    if (options.length) return value
    if (objOptions.length) return (objOptions.find((item) => item.value === value) ?? {}).label
  }, [objOptions, options, value])

  const calcCurrLabelIcon = useMemo(() => {
    if (objOptions.length) return (objOptions.find((item) => item.value === value) ?? {})?.icon
  }, [objOptions, value])

  const onValueChange = (val: string | number) => {
    onChange(val)
    //
    setShowOptions(false)
  }

  const onSelect = () => {
    if (disabled) return
    setShowOptions(!showOptions)
  }

  console.log(value, objOptions)
  return (
    <div
      className={classNames('web-select', { show: showOptions, mini, disabled }, className)}
      ref={ref}
    >
      {label && <label>{label}</label>}
      <div className="web-select-show">
        <button onClick={onSelect}>
          {calcCurrLabelIcon && <Image src={calcCurrLabelIcon} />}
          {calcCurrLabel}
        </button>
        <div className="web-select-options">
          <ul>
            {options.length
              ? options.map((item, index) => (
                  <li
                    key={index}
                    className={classNames({ active: item === value })}
                    onClick={() => onValueChange(item)}
                  >
                    {item}
                  </li>
                ))
              : null}
            {!options.length && objOptions.length
              ? objOptions.map((item, index) => (
                  <li
                    key={index}
                    className={classNames({ active: item.value === value })}
                    onClick={() => onValueChange(item.value)}
                  >
                    {item.icon && <Image src={item.icon} />}
                    {item.label}
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Select
