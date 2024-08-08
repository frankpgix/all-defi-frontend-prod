import { FC } from 'react'

import classNames from 'classnames'

interface Props {
  activeIndex: number
  stepStatus: boolean[]
  setStepIndex: (i: number) => void
}

const StepLine: FC<Props> = ({ activeIndex = 0, stepStatus, setStepIndex }) => {
  // const list = ['Basic Info', 'Strategy Select', 'ALL Token Stake', 'Review']
  const list = ['Basic Info', 'Strategy Select', 'Review']
  const onClick = (index: number) => {
    if (stepStatus[index]) {
      setStepIndex(index)
    }
  }
  return (
    <div className="c-create-step-line">
      <ul>
        {list.map((item: string, index: number) => (
          <li
            key={index}
            className={classNames({ active: index === activeIndex, cup: stepStatus[index] })}
            onClick={() => onClick(index)}
          >
            <em>Step {index + 1}</em>
            <strong>{item}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StepLine
