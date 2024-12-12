import { FC, ReactNode } from 'react'
import ContentLoader from 'react-content-loader'
import CountUp from 'react-countup'

import classNames from 'classnames'

import PercentageLine from '@@/common/PercentageLine'
import Popper from '@@/common/Popper'

export const CountLayout: FC<{ children: ReactNode; col?: string }> = ({ children, col = '4' }) => (
  <div className={`c-section-count col-${col}`}>{children}</div>
)

export const CountItem: FC<{
  label: string
  value?: string | ReactNode
  popper?: string
  popperWidth?: string
  unit?: string
  loading?: boolean
  countUp?: { value: number; prefix?: string; decimals: number }
}> = ({ label, value, popper, popperWidth, unit, loading, countUp }) => {
  return (
    <div className="c-section-count-item">
      <label>
        {/* {label} {popper && <Popper content={popper} white width={popperWidth} />} */}
        {popper ? (
          <Popper white content={popper} width={popperWidth}>
            {label}
          </Popper>
        ) : (
          label
        )}
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
        <span>
          {value && value}
          {countUp && (
            <CountUp
              end={countUp.value}
              decimals={countUp.decimals ?? 2}
              prefix={countUp.prefix ?? ''}
            ></CountUp>
          )}
          {unit && <small>{unit}</small>}
        </span>
      )}
    </div>
  )
}

export const SectionHeader: FC<{ name?: string | ReactNode; children?: ReactNode }> = ({
  name,
  children
}) => <header className="c-section-section-header">{children || name}</header>
export const SectionLayout: FC<{ children: ReactNode; col: string }> = ({ children, col }) => (
  <section className={`c-section-section col-${col}`}>{children}</section>
)
export const SectionBlank: FC = () => <hr className="c-section-section-blank" />

export const SectionItem: FC<{
  label: string | ReactNode
  value?: string | number | ReactNode
  children?: ReactNode
  popper?: string
  popperWidth?: string
  loading?: boolean
  short?: boolean
}> = ({ label, value, children, popper, popperWidth, loading, short }) => {
  return (
    <div className={classNames('c-section-section-item', { short })}>
      <label>
        {/* {label}
        {popper && <Popper size="mini" content={popper} width={popperWidth}></Popper>} */}

        {popper ? (
          <Popper size="mini" content={popper} width={popperWidth}>
            {label}
          </Popper>
        ) : (
          label
        )}
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
    <div className="c-section-section-tip">
      <p>{children}</p>
    </div>
  )
}

export const SectionButtons: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="c-section-section-buttons">{children}</div>
}

export const SectionPercentageLine: FC<{ percent: number; remainPercent: string | number }> = ({
  percent,
  remainPercent
}) => {
  return (
    <div className="c-section-section-percent">
      <PercentageLine size="large" value={percent} />
      <p>
        <em>Current Vault NAV {percent}%</em>
        <span>Capacity Available {remainPercent}%</span>
      </p>
    </div>
  )
}
