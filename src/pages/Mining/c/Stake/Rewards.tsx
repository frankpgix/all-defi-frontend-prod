import React, { FC } from 'react'
import { useRequest } from 'ahooks'

import Reward from '@/class/Reward'
import { formatNumber } from '@/utils/tools'
import { useProfile } from '@/hooks/useProfile'

import Popper from '@@/common/Popper'

const Rewards: FC = () => {
  const { userAccClaimedReward } = Reward
  const { account: address } = useProfile()

  const { data: ALLAmount = 0 } = useRequest(() => userAccClaimedReward(address), {
    refreshDeps: [address]
  })
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
