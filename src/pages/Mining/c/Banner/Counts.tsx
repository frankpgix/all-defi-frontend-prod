import { FC } from 'react'

import { formatNumber } from '@/utils/tools'
import DataItem from '@@/common/DataItem'
import { useRewardsALLBalance } from '@/hooks/Contracts/useRewardTracker'
interface Props {
  totalStakeValue: number
  stakeSharesValue: number
  loading: boolean
}

const Counts: FC<Props> = ({ totalStakeValue, loading }) => {
  const { data: sALL, isLoading: sALLLoading } = useRewardsALLBalance()

  return (
    <section className="web-mining-counts">
      <DataItem label="Global Staked Share Value" loading={loading}>
        <div className="web-mining-counts-roe">
          {formatNumber(totalStakeValue, 2, '$0,0.00')} <br />
          {/*<RoeShow value={0.2} subArrow />*/}
        </div>
      </DataItem>
      <DataItem label="Global Staked sALL Quantity" normalFont loading={sALLLoading}>
        <div className="web-mining-counts-roe">
          {formatNumber(sALL, 2, '0,0.00')} <br />
          {/*<RoeShow value={-0.2} subArrow />*/}
        </div>
      </DataItem>
      <DataItem label="Mining Return %">20%</DataItem>
    </section>
  )
}

export default Counts
