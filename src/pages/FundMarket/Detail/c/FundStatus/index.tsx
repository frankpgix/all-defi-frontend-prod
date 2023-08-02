import React, { FC, useMemo } from 'react'
import dayjs from 'dayjs'
import ContentLoader from 'react-content-loader'

import { FundBaseProps, FundDetailProps } from '@/class/help'

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

  if (loading) return <FundStatusLoading />
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

const FundStatusLoading = () => {
  return (
    <div className="web">
      <ContentLoader
        width={1200}
        height={345}
        viewBox="0 0 1200 305"
        backgroundColor="#eaeced"
        foregroundColor="#ffffff"
      >
        <rect x="0" y="40" rx="4" ry="4" width="1200" height="4" />
        <rect x="40" y="80" rx="4" ry="4" width="400" height="30" />
        <rect x="40" y="140" rx="4" ry="4" width="1120" height="30" />
        <rect x="40" y="190" rx="4" ry="4" width="1120" height="10" />
        <rect x="40" y="220" rx="4" ry="4" width="250" height="30" />
        <rect x="40" y="260" rx="4" ry="4" width="250" height="30" />
      </ContentLoader>
    </div>
  )
}
