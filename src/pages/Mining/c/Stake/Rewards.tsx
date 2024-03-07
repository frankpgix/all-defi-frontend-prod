import { FC } from 'react'

import { formatNumber } from '@/utils/tools'
import { useProfile } from '@/hooks/useProfile'
import { useUserAccClaimedReward } from '@/hooks/useRewardTracker'

import Popper from '@@/common/Popper'

const Rewards: FC = () => {
  const { account } = useProfile()
  const { data: ALLAmount } = useUserAccClaimedReward(account)

  return (
    <div className="web-mining-rewards">
      <header>Rewards</header>
      <dl>
        <dt>
          <label>Total Earning</label>
          <Popper content="Total Earning" />
        </dt>
        <dd>{formatNumber(ALLAmount, 4, '0,0.00')} ALL</dd>
      </dl>
      <dl>
        <dt>
          <label>Total consumption of sALL</label>
        </dt>
        <dd>{formatNumber(ALLAmount, 4, '0,0.00')} sALL</dd>
      </dl>
    </div>
  )
}

export default Rewards
