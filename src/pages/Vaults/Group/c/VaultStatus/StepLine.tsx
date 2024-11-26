import { FC } from 'react'
import ContentLoader from 'react-content-loader'

import classNames from 'classnames'
import dayjs from 'dayjs'

import { VaultDetailProps } from '@/types/vault'

import Popper from '@@/common/Popper'

interface Props {
  data: VaultDetailProps
  loading?: boolean
}

const StepLine: FC<Props> = ({ data, loading }) => {
  let activeIndex = data.status
  // console.log(activeIndex)
  // console.log(data.status, ' data.status', data)
  const now = +new Date()
  if (now > data.settleEndTime && data.status === 3) {
    activeIndex = 4
  }
  if (now < data.settleEndTime && data.status === 4) {
    activeIndex = 3
  }
  if (data.status > 4) {
    activeIndex = 4
  }
  const step1Popper = "During the vault's open period, you can stake to vault or unstake from it"
  const step2Popper = "During the vault's semi-open period, you can only stake to vault"
  const steps = [
    {
      label: 'Open Period',
      popper: step1Popper,
      time: data.epochStartTime,
      status: 0
    },
    {
      label: 'Semi-open Period',
      time: data.subscribeRedeemEndTime,
      popper: step2Popper,
      status: 1
    },
    {
      label: 'Pre-Settlement Period',
      time: data.subscribeEndTime,
      status: 2
    },
    {
      label: 'Settlement Period',
      time: data.preSettleEndTime,
      status: 3
    },
    {
      time: data.settleEndTime,
      status: 4
    }
  ]
  return (
    <section className="web-fund-detail-status-setpline">
      <ul className={classNames({ 'new-zero': data.epochIndex <= 0 })}>
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