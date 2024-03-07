import { FC, useMemo, useState } from 'react'
import BN from 'bignumber.js'

import { sum } from '@/utils/tools'
import { usePoolList } from '@/hooks/useRewardTracker'
import { useProfile } from '@/hooks/useProfile'

import OnceYouBuy from './c/OnceYouBuy'
import Banner from './c/Banner'
import Dashboard from './c/Dashboard'
import Tab from './c/Tab'
import Stake from './c/Stake'
import UnStake from './c/UnStake'

const Mining: FC = () => {
  const { account } = useProfile()
  const { data: poolList, isLoading, refetch: getData } = usePoolList(account)
  const [tabActiveIndex, setTabActiveIndex] = useState(0)
  // console.log(data)

  const stakeList = useMemo(() => poolList?.filter((item) => item.shareBalance !== 0), [poolList])
  // console.log(poolList, stakeList, 'stakeList')
  const unStakeList = useMemo(() => poolList?.filter((item) => item.stakedShare !== 0), [poolList])
  const stakeSharesValue = useMemo(() => {
    return sum(
      (poolList ?? []).map((item) => BN(item.stakedShare).times(item.sharePriceInUSD).toNumber())
    )
  }, [poolList])

  if (isLoading) return null
  return (
    <>
      <header className="web-mining-header">All Mining</header>
      <OnceYouBuy />

      <Banner loading={isLoading} stakeSharesValue={stakeSharesValue} />
      <Dashboard stakeSharesValue={stakeSharesValue} loading={isLoading} />
      <Tab activeIndex={tabActiveIndex} onChange={setTabActiveIndex} />
      {tabActiveIndex === 0 && <Stake list={stakeList ?? []} getData={getData} />}
      {tabActiveIndex === 1 && <UnStake list={unStakeList ?? []} getData={getData} />}
    </>
  )
}
export default Mining
