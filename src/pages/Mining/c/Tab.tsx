import React, { FC } from 'react'
import classNames from 'classnames'
// import Button from '@@/common/Button'

interface Props {
  activeIndex: number
  onChange: (val: number) => void
}

const Tab: FC<Props> = ({ activeIndex, onChange }) => {
  const tabList = ['Stake', 'Unstake']
  return (
    <div className="web-mining-tab">
      <main>
        {tabList.map((tab, index) => (
          <span key={index} onClick={() => onChange(index)} className={classNames({ active: index === activeIndex })}>
            {tab}
          </span>
        ))}
      </main>
      {/*
      <Button to="/fund-market" text>
        view history
      </Button>
      */}
    </div>
  )
}

export default Tab
