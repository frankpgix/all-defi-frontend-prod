import React, { FC } from 'react'
import classNames from 'classnames'

interface Props {
  activeIndex: number
  onChange: (val: number) => void
}

const Tab: FC<Props> = ({ activeIndex, onChange }) => {
  const tabList = ['Preview', 'Summary']
  return (
    <div className="web-mining-preview-tab">
      {tabList.map((tab, index) => (
        <span
          key={index}
          onClick={() => onChange(index)}
          className={classNames({ active: index === activeIndex })}
        >
          {tab}
        </span>
      ))}
    </div>
  )
}

export default Tab
