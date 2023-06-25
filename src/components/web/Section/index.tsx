import React, { FC, ReactNode } from 'react'
import PercentageLine from '@@/common/PercentageLine'
import Popper from '@@/common/Popper'

export const CountLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <div className="web-manage-fund-count">{children}</div>
)

export const CountItem: FC<{ label: string; value: string | ReactNode }> = ({ label, value }) => {
  return (
    <div className="web-manage-fund-count-item">
      <label>{label}</label>
      <span>{value}</span>
    </div>
  )
}

export const SectionHeader: FC<{ name?: string | ReactNode; children?: ReactNode }> = ({ name, children }) => (
  <header className="web-manage-fund-section-header">{children || name}</header>
)
export const SectionLayout: FC<{ children: ReactNode; col: string }> = ({ children, col }) => (
  <section className={`web-manage-fund-section col-${col}`}>{children}</section>
)
export const SectionBlank: FC = () => <hr className="web-manage-fund-section-blank" />

export const SectionItem: FC<{
  label: string | ReactNode
  value?: string | number | ReactNode
  children?: ReactNode
  popper?: string
}> = ({ label, value, children, popper }) => {
  return (
    <div className="web-manage-fund-section-item">
      <label>
        {label}
        {popper && <Popper size="mini" content={popper}></Popper>}
      </label>
      <span>{children || value}</span>
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
