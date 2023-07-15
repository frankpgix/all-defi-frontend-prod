import React, { FC } from 'react'
import classNames from 'classnames'

interface Props {
  activeIndex: number
}

const StepLine: FC<Props> = ({ activeIndex = 0 }) => {
  const list = ['Basic Info', 'Strategy Select', 'ALL Token Stake', 'Review']
  return (
    <div className="web-manage-create-step-line">
      <ul>
        {list.map((item: string, index: number) => (
          <li key={index} className={classNames({ active: index === activeIndex })}>
            <em>Step {index + 1}</em>
            <strong>{item}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StepLine
