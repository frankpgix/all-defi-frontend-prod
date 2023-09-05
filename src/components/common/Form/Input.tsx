import React, { FC, ChangeEvent, ReactNode, useEffect } from 'react'
import { NumericFormat, NumberFormatValues } from 'react-number-format'
import classNames from 'classnames'
import { isNaN } from 'lodash'
interface InputProps {
  type?: string
  value: number | string
  onChange?: (value: any) => void
  disabled?: boolean
  className?: string
  placeholder?: string
  suffix?: string | ReactNode
  innerSuffix?: string | ReactNode
  maxLength?: number
  right?: boolean
  readonly?: boolean
  maxNumber?: number
  children?: ReactNode
  label?: string
  count?: boolean
  error?: boolean
  decimal?: number
}

const Input: FC<InputProps> = ({
  value,
  onChange,
  type,
  disabled,
  className,
  placeholder,
  maxLength,
  suffix,
  innerSuffix,
  right,
  readonly,
  maxNumber,
  children,
  label,
  error,
  count,
  decimal = 4
}) => {
  const onChangeFunc = (values: NumberFormatValues) => {
    if (!onChange) return
    onChange(values.value)
    console.log(1111)
  }

  const changeFunc = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!onChange) return
    onChange(e.target.value)
  }
  const setMaxFunc = () => {
    if (!onChange) return
    onChange(maxNumber)
  }
  useEffect(() => {
    if (type === 'number' && maxNumber != null && onChange) {
      if (Number(value) > maxNumber) {
        onChange(maxNumber)
      }
    }
  }, [maxNumber, value])

  const style = classNames('web-form-input', className, {
    disabled,
    right,
    'has-max-btn': maxNumber != null,
    error
  })
  return (
    <div className={style}>
      <div className="web-form-input-base">
        {label && <label className="web-form-input-base-label">{label}</label>}
        <label
          className={classNames(
            'web-form-input-base-inner',
            type === 'textarea' ? 'textarea-inner' : 'input-inner'
          )}
        >
          {type === 'textarea' ? (
            <textarea
              value={value}
              maxLength={maxLength}
              onChange={changeFunc}
              placeholder={placeholder}
              disabled={disabled}
            />
          ) : type === 'number' ? (
            <NumericFormat
              className="c-input-number-numeric"
              value={value}
              placeholder={placeholder}
              valueIsNumericString={true}
              onValueChange={onChangeFunc}
              thousandSeparator=","
              decimalScale={decimal}
              allowNegative={false}
              readOnly={readonly}
              disabled={disabled}
            />
          ) : (
            <input
              type={type}
              value={value}
              readOnly={readonly}
              disabled={disabled}
              max={1000000000000000}
              maxLength={maxLength}
              onChange={changeFunc}
              placeholder={placeholder}
              onWheel={(e: any) => e?.target?.blur()}
            />
          )}
          {innerSuffix && <div className="web-form-input-base-inner-suffix">{innerSuffix}</div>}
        </label>
        {maxLength && count && (
          <div className="web-form-input-count">
            {String(value).length}/{maxLength} words
          </div>
        )}
        {(maxNumber != null || children) && (
          <div className="web-form-input-more">
            {children && <div className="web-form-input-inner">{children}</div>}
            {maxNumber != null && (
              <div className="web-form-input-set-max-btn" onClick={setMaxFunc}>
                <span>Max</span>
              </div>
            )}
          </div>
        )}
      </div>
      {suffix && <div className="web-form-input-suffix">{suffix}</div>}
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}

export default Input
