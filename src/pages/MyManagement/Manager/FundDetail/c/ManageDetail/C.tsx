import React, { FC, ReactNode } from 'react'
import ContentLoader from 'react-content-loader'

import PercentageLine from '@@/common/PercentageLine'
import Popper from '@@/common/Popper'

export const CountLayout: FC<{ children: ReactNode; col?: string }> = ({ children, col = '4' }) => (
  <div className={`web-manage-fund-count col-${col}`}>{children}</div>
)

export const CountItem: FC<{
  label: string
  value: string | ReactNode
  popper?: string
  popperWidth?: string
  loading?: boolean
}> = ({ label, value, popper, popperWidth, loading }) => {
  return (
    <div className="web-manage-fund-count-item">
      <label>
        {label} {popper && <Popper content={popper} white width={popperWidth} />}
      </label>
      {loading ? (
        <ContentLoader
          width={100}
          height={40}
          viewBox="0 0 100 40"
          backgroundColor="#82b6ff"
          foregroundColor="#ffffff"
        >
          <rect x="0" y="5" rx="4" ry="4" width="100" height="30" />
        </ContentLoader>
      ) : (
        <span>{value}</span>
      )}
    </div>
  )
}

export const SectionHeader: FC<{ name?: string | ReactNode; children?: ReactNode }> = ({
  name,
  children
}) => <header className="web-manage-fund-section-header">{children || name}</header>
export const SectionLayout: FC<{ children: ReactNode; col: string }> = ({ children, col }) => (
  <section className={`web-manage-fund-section col-${col}`}>{children}</section>
)
export const SectionBlank: FC = () => <hr className="web-manage-fund-section-blank" />

export const SectionItem: FC<{
  label: string | ReactNode
  value?: string | number | ReactNode
  children?: ReactNode
  popper?: string
  popperWidth?: string
  loading?: boolean
}> = ({ label, value, children, popper, popperWidth, loading }) => {
  return (
    <div className="web-manage-fund-section-item">
      <label>
        {label}
        {popper && <Popper size="mini" content={popper} width={popperWidth}></Popper>}
      </label>
      {loading ? (
        <ContentLoader
          width={100}
          height={40}
          viewBox="0 0 100 40"
          backgroundColor="#eaeced"
          foregroundColor="#ffffff"
        >
          <rect x="0" y="5" rx="4" ry="4" width="100" height="30" />
        </ContentLoader>
      ) : (
        <span>{children || value}</span>
      )}
    </div>
  )
}

export const SectionTip: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="web-manage-fund-section-tip">
      <p>{children}</p>
    </div>
  )
}

export const SectionButtons: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="web-manage-fund-section-buttons">{children}</div>
}

export const SectionPercentageLine: FC<{ percent: number; remainPercent: string | number }> = ({
  percent,
  remainPercent
}) => {
  return (
    <div className="web-manage-fund-section-percent">
      <PercentageLine size="large" value={percent} />
      <p>
        <em>Current Fund AUM {percent}%</em>
        <span>Fund AUM Available For Subscribtion {remainPercent}%</span>
      </p>
    </div>
  )
}
