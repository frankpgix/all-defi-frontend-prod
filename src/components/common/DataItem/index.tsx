import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'

import Popper from '@@/common/Popper'

interface Props {
  className?: string
  label: string
  children: ReactNode
  gray?: boolean
  large?: boolean
  popper?: string
  normalFont?: boolean
}

const DataItem: FC<Props> = ({ className, label, children, gray, large, popper, normalFont }) => {
  return (
    <div className={classNames('web-c-data-item', className, { gray, large, normal: normalFont })}>
      <div className="web-c-data-item-label">
        <label>{label}</label>
        {popper && <Popper size="mini" content={popper}></Popper>}
      </div>
      <div className="web-c-data-item-content">{children}</div>
    </div>
  )
}

export default DataItem
