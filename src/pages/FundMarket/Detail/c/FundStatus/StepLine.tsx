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
        'During Fund Open Period, you can request subscription, redemption for this fund or cancel these request accordingly.',
      time: data.epochStartTime,
      status: 1
    },
    {
      label: data.epochIndex === 0 ? 'Open Period' : 'Semi-open Period',
      time: data.subscribeRedeemEndTime,
      popper:
        'During Fund Semi-open Period, you can only request subscription for this fund, once requested, you can not cancel',
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
