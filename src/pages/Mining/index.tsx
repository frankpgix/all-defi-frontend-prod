import React, { FC, useMemo, useState } from 'react'
import { useRequest } from 'ahooks'
import BN from 'bignumber.js'
import { sum } from '@/utils/tools'

import Reward from '@/class/Reward'
import { useProfile } from '@/hooks/useProfile'

import Loading from '@@/common/Loading'
import Help from './c/Help'
import Banner from './c/Banner'
import Dashboard from './c/Dashboard'
import Tab from './c/Tab'
import Stake from './c/Stake'
import UnStake from './c/UnStake'

const Mining: FC = () => {
  const { getPoolList } = Reward
  const { signer } = useProfile()

  const [tabActiveIndex, setTabActiveIndex] = useState(0)

  const {
    data: poolList,
    run: getData,
    loading
  } = useRequest(() => getPoolList(signer), {
    refreshDeps: [signer]
  })

  const stakeList = useMemo(
    () => poolList?.filter((item) => item.shareBalance !== 0 || item.stakeAmount !== 0),
    [poolList]
  )
  // const unStakeList = useMemo(() => poolList?.filter((item) => item.stakeAmount !== 0), [poolList])
  const stakeSharesValue = useMemo(() => {
    return sum((poolList ?? []).map((item) => BN(item.stakeAmount).times(item.aumPerShare).toNumber()))
  }, [poolList])

  return (
    <>
      <header className="web-mining-header">All Mining</header>
      <Help />
      <Banner />
      <Dashboard stakeSharesValue={stakeSharesValue} />
      <Tab activeIndex={tabActiveIndex} onChange={setTabActiveIndex} />
      {tabActiveIndex === 0 && <Stake list={stakeList ?? []} getData={getData} />}
      {tabActiveIndex === 1 && <UnStake list={stakeList ?? []} getData={getData} />}
      <Loading type="fixed" show={loading} />
    </>
  )
}

export default Mining
