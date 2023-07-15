import React, { FC } from 'react'
import { useRequest } from 'ahooks'
// import BN from 'bignumber.js'
import Reward from '@/class/Reward'
// import AllProtocol from '@/class/AllProtocol'
import { formatNumber } from '@/utils/tools'
import DataItem from '@@/common/DataItem'
// import RoeShow from '@@/common/RoeShow'

interface Props {
  totalStakeValue: number
}

const Counts: FC<Props> = ({ totalStakeValue }) => {
  const { getRewardsALLBalance } = Reward
  // const { allTokenPrice } = AllProtocol
  // const { data: globalALLAmount = 0 } = useRequest(globalAccClaimedReward)
  // const { data: allPrice = 0 } = useRequest(allTokenPrice)
  const { data: sALL = 0 } = useRequest(getRewardsALLBalance)
  // const globalRewardALLValue = useMemo(
  //   () => BN(globalALLAmount).times(allPrice).toNumber(),
  //   [allPrice, globalALLAmount]
  // )
  return (
    <section className="web-mining-counts">
      <DataItem label="Global Staked Share Value">
        <div className="web-mining-counts-roe">
          {formatNumber(totalStakeValue, 2, '$0,0.00')} <br />
          {/*<RoeShow value={0.2} subArrow />*/}
        </div>
      </DataItem>
      <DataItem label="Global Staked sALL Quantity" normalFont>
        <div className="web-mining-counts-roe">
          {formatNumber(sALL, 2, '0,0.00')} <br />
          {/*<RoeShow value={-0.2} subArrow />*/}
        </div>
      </DataItem>
      <DataItem label="Mining Return %">20%</DataItem>
      {/*<DataItem label="Total Value">{formatNumber(globalRewardALLValue, 2, '$0,0.00')}</DataItem>*/}
    </section>
  )
}

export default Counts
// globalAccClaimedReward
