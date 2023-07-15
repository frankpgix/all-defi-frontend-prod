// PercentButton
import React, { FC, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import BN from 'bignumber.js'

interface Props {
  value: number | string
  onChange: (value: number) => void
  allValue: number | string
}

const list = [0.25, 0.5, 0.75, 1]

const PercentButton: FC<Props> = ({ value, onChange, allValue }) => {
  // const [valueIndex, setValueIndex] = useState<number>(-1)

  const submitChange = (percent: number) => {
    onChange(BN(allValue).multipliedBy(percent).toNumber())
  }

  // const isActive = (percent: number) => {
  //   return
  // }
  // useEffect(() => {
  //   if (valueIndex > -1) onChange(values[valueIndex])
  // }, [values, valueIndex])

  return (
    <div className="web-percent-button">
      {list.map((percent: number, index: number) => (
        <span
          key={percent}
          onClick={() => submitChange(percent)}
          className={classNames({ active: BN(allValue).multipliedBy(percent).toString() === String(value) })}
        >
          {percent * 100}%
        </span>
      ))}
    </div>
  )
}

export default PercentButton
