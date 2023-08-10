import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'
import ContentLoader from 'react-content-loader'

import Popper from '@@/common/Popper'

interface Props {
  className?: string
  label: string
  children: ReactNode
  gray?: boolean
  large?: boolean
  popper?: string
  normalFont?: boolean
  loading?: boolean
}

const DataItem: FC<Props> = ({
  className,
  label,
  children,
  gray,
  large,
  popper,
  normalFont,
  loading
}) => {
  return (
    <div className={classNames('web-c-data-item', className, { gray, large, normal: normalFont })}>
      <div className="web-c-data-item-label">
        <label>{label}</label>
        {popper && <Popper size="mini" content={popper}></Popper>}
      </div>
      <div className="web-c-data-item-content">
        {loading ? (
          <ContentLoader
            width={100}
            height={24}
            viewBox="0 0 100 24"
            backgroundColor="#eaeced"
            foregroundColor="#ffffff"
          >
            <rect x="0" y="0" rx="4" ry="4" width="100" height="24" />
          </ContentLoader>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

export default DataItem
