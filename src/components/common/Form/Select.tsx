import React, { FC, useRef, useState, useMemo } from 'react'
import { useClickAway } from 'react-use'
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
}

const Select: FC<SelectProps> = ({
  label,
  value,
  options = [],
  onChange,
  objOptions = [],
  className
}) => {
  const ref = useRef(null)
  const [showOptions, setShowOptions] = useState(false)
  useClickAway(ref, () => setShowOptions(false))

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

  return (
    <div className={classNames('web-select', { show: showOptions }, className)} ref={ref}>
      {label && <label>{label}</label>}
      <div className="web-select-show">
        <button onClick={() => setShowOptions(!showOptions)}>
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
