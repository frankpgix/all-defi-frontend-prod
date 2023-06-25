import React, { FC } from 'react'
import dayjs from 'dayjs'
import classNames from 'classnames'
import { FundBaseInfoProps, FundDetailProps } from '@/hooks/help'
import Popper from '@@/common/Popper'

interface Props {
  base: FundBaseInfoProps
  data: FundDetailProps
}

const StepLine: FC<Props> = ({ data }) => {
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
            <time>{dayjs(time).format('MMM DD, YYYY HH:mm:ss')}</time>
            {label && (
              <label>
                {label} {popper && <Popper size="mini" blue content={popper} />}
              </label>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default StepLine
