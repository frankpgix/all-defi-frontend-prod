import React, { FC } from 'react'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { FundBaseProps, FundDetailProps } from '@/class/help'
import Popper from '@@/common/Popper'
import ContentLoader from 'react-content-loader'

interface Props {
  base: FundBaseProps
  data: FundDetailProps
  loading?: boolean
}

const StepLine: FC<Props> = ({ data, loading }) => {
  const activeIndex = data.status === 0 ? 1 : data.status
  const steps = [
    {
      label: 'Open Period',
      popper:
        "During the fund's open period, you can request subscription to or redemption from this fund, or cancel these requests.",
      time: data.epochStartTime,
      status: 1
    },
    {
      label: data.epochIndex === 0 ? 'Open Period' : 'Semi-open Period',
      time: data.subscribeRedeemEndTime,
      popper:
        "During the fund's semi-open period, you can only request subscription to this fund. Once requested, you cannot cancel.",
      status: 2
    },
    {
      label: 'Pre-Settlement Period',
      time: data.subscribeEndTime,
      status: 3
    },
    {
      label: 'Settlement Period',
      time: data.preSettleEndTime,
      status: 4
    },
    {
      time: data.settleEndTime,
      status: 5
    }
  ]
  return (
    <section className="web-fund-detail-status-setpline">
      <ul className={classNames({ zero: data.epochIndex === 0 })}>
        {steps.map(({ label, time, status, popper }, index) => (
          <li
            key={index}
            className={classNames({ finish: status < activeIndex, active: status === activeIndex })}
          >
            <time>
              {loading ? (
                <ContentLoader
                  width={120}
                  height={15}
                  viewBox="0 0 120 15"
                  backgroundColor="#eaeced"
                  foregroundColor="#ffffff"
                >
                  <rect x="0" y="0" rx="4" ry="4" width="120" height="15" />
                </ContentLoader>
              ) : (
                dayjs(time).format('MMM DD, YYYY HH:mm:ss')
              )}
            </time>
            {label && (
              <label>
                {loading ? (
                  <ContentLoader
                    width={120}
                    height={15}
                    viewBox="0 0 120 15"
                    backgroundColor="#eaeced"
                    foregroundColor="#ffffff"
                  >
                    <rect x="0" y="0" rx="4" ry="4" width="120" height="15" />
                  </ContentLoader>
                ) : (
                  <>
                    {label} {popper && <Popper size="mini" blue content={popper} />}
                  </>
                )}
              </label>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default StepLine
