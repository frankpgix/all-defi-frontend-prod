import React, { FC, useMemo } from 'react'
import dayjs from 'dayjs'

import { FundBaseProps, FundDetailProps } from '@/hooks/help'

import BlueLineSection from '@@/web/BlueLineSection'
import Loading from '@@/common/Loading'

import StepLine from './StepLine'

interface Props {
  base: FundBaseProps
  data: FundDetailProps
  loading: boolean
}

const FundStatus: FC<Props> = ({ base, data, loading }) => {
  const currEpoch = useMemo(
    () => `${dayjs(data.epochStartTime).format('MMM DD, YYYY')} #${data.epochIndex}`,
    [data.epochStartTime, data.epochIndex]
  )
  // console.log(1111222, data.epochStartTime)
  return (
    <BlueLineSection
      className="web-fund-detail-status"
      title={`Current Epoch: ${currEpoch}`}
      // headerRight={`Next Epoch: ${dayjs(data.settleEndTime).format('MMM DD, YYYY')} #${data.epochIndex + 1}`}
    >
      <Loading show={loading} type="float" />
      <StepLine base={base} data={data} />
      <footer className="web-fund-detail-status-footer">
        <dl>
          <dt>
            Subscribing Funds:
            {[0, 1, 2].includes(data.status) ? (
              <em className="rise">Allowed</em>
            ) : (
              <em className="fall">Not Allowed</em>
            )}
          </dt>
          {/*<dd>{currEpoch}</dd>*/}
        </dl>
        <dl>
          <dt>
            Redeeming Funds:
            {data.status === 1 ? (
              <em className="rise">Allowed</em>
            ) : (
              <em className="fall">Not Allowed</em>
            )}
          </dt>
          {/*<dd>{currEpoch}</dd>*/}
        </dl>
      </footer>
    </BlueLineSection>
  )
}

export default FundStatus
