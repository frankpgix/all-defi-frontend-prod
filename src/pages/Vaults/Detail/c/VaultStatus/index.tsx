import { FC, useMemo } from 'react'
import ContentLoader from 'react-content-loader'

import dayjs from 'dayjs'

import { VaultBaseInfoProps, VaultDetailProps } from '@/types/vault'

import BlueLineSection from '@@/web/BlueLineSection'

import StepLine from './StepLine'

interface Props {
  base: VaultBaseInfoProps
  data: VaultDetailProps
  loading: boolean
}

const VaultStatus: FC<Props> = ({ base, data, loading }) => {
  const currEpoch = useMemo(
    () => `${dayjs(data.epochStartTime).format('MMM DD, YYYY')} #${data.epochIndex}`,
    [data.epochStartTime, data.epochIndex]
  )

  return (
    <BlueLineSection
      className="web-fund-detail-status"
      title={`Current Epoch: ${loading ? '-' : currEpoch}`}
      // headerRight={`Next Epoch: ${dayjs(data.settleEndTime).format('MMM DD, YYYY')} #${data.epochIndex + 1}`}
    >
      {/* <Loading show={loading} type="float" /> */}
      <StepLine base={base} data={data} loading={loading} />
      <footer className="web-fund-detail-status-footer">
        <dl>
          <dt>
            Stake to vault:
            {loading ? (
              <ContentLoader
                width={120}
                height={18}
                viewBox="0 0 120 18"
                backgroundColor="#eaeced"
                foregroundColor="#ffffff"
              >
                <rect x="12" y="0" rx="4" ry="4" width="100" height="18" />
              </ContentLoader>
            ) : [0, 1, 2].includes(data.status) ? (
              <em className="rise">Stake</em>
            ) : (
              <em className="fall">Not Allowed</em>
            )}
          </dt>
          {/*<dd>{currEpoch}</dd>*/}
        </dl>
        <dl>
          <dt>
            Unstake from vault:
            {loading ? (
              <ContentLoader
                width={120}
                height={18}
                viewBox="0 0 120 18"
                backgroundColor="#eaeced"
                foregroundColor="#ffffff"
              >
                <rect x="12" y="0" rx="4" ry="4" width="100" height="18" />
              </ContentLoader>
            ) : data.status === 1 ? (
              <em className="rise">Unstake</em>
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

export default VaultStatus
