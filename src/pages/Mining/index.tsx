import React, { FC, useMemo, useState } from 'react'
import { useRequest } from 'ahooks'
import BN from 'bignumber.js'
import ContentLoader from 'react-content-loader'

import { sum } from '@/utils/tools'

import Reward from '@/class/Reward'
import { useProfile } from '@/hooks/useProfile'

// import Loading from '@@/common/Loading'
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
    return sum(
      (poolList ?? []).map((item) => BN(item.stakeAmount).times(item.aumPerShare).toNumber())
    )
  }, [poolList])

  return (
    <>
      <header className="web-mining-header">All Mining</header>
      <Help />

      <Banner loading={loading} stakeSharesValue={stakeSharesValue} />
      <Dashboard stakeSharesValue={stakeSharesValue} loading={loading} />
      <Tab activeIndex={tabActiveIndex} onChange={setTabActiveIndex} />
      {tabActiveIndex === 0 && <Stake list={stakeList ?? []} getData={getData} />}
      {tabActiveIndex === 1 && <UnStake list={stakeList ?? []} getData={getData} />}

      {/* <Loading type="fixed" show={loading} /> */}
    </>
  )
}

export default Mining

const MiningLoading = () => {
  return (
    <div className="web">
      <ContentLoader
        width={1200}
        height={1200}
        viewBox="0 0 1200 1200"
        backgroundColor="#eaeced"
        foregroundColor="#ffffff"
      >
        <rect x="0" y="0" rx="4" ry="4" width="300" height="30" />
        <path d="M890.531 4.04402C890.909 3.29819 891.232 2.65646 891.5 2.12328V399.5H0.691918C0.708503 399.45 0.72604 399.398 0.744529 399.343C0.924165 398.806 1.19364 398.008 1.55257 396.968C2.27044 394.887 3.34609 391.834 4.77643 387.948C7.63712 380.176 11.9164 369.07 17.5892 355.743C28.9355 329.087 45.8537 293.549 68.1429 258.016C112.749 186.905 178.744 116 264.5 116C350.253 116 389.735 171.146 426.705 226.714C427.992 228.649 429.275 230.583 430.558 232.517C466.086 286.059 500.732 338.273 573.848 339C611.755 339.377 650.618 318.313 687.549 286.622C724.492 254.921 759.571 212.525 789.92 170.103C820.27 127.678 845.902 85.2092 863.945 53.3479C872.966 37.4168 880.092 24.1365 884.962 14.8384C887.397 10.1894 889.268 6.53575 890.531 4.04402Z" />
        <rect x="915" y="0" rx="4" ry="4" width="285" height="4" />
        <rect x="935" y="30" rx="4" ry="4" width="200" height="16" />
        <rect x="935" y="60" rx="4" ry="4" width="100" height="26" />
        <rect x="935" y="100" rx="4" ry="4" width="200" height="16" />
        <rect x="935" y="130" rx="4" ry="4" width="100" height="26" />
        <rect x="935" y="170" rx="4" ry="4" width="200" height="16" />
        <rect x="935" y="200" rx="4" ry="4" width="100" height="26" />

        <rect x="0" y="440" rx="4" ry="4" width="1200" height="4" />
        <rect x="40" y="470" rx="4" ry="4" width="200" height="16" />
        <rect x="40" y="500" rx="4" ry="4" width="100" height="26" />
        <rect x="340" y="470" rx="4" ry="4" width="200" height="16" />
        <rect x="340" y="500" rx="4" ry="4" width="100" height="26" />
        <rect x="640" y="470" rx="4" ry="4" width="200" height="16" />
        <rect x="640" y="500" rx="4" ry="4" width="100" height="26" />

        <rect x="1000" y="470" rx="30" ry="30" width="160" height="60" />
        <rect x="0" y="580" rx="4" ry="4" width="300" height="60" />
        <rect x="0" y="680" rx="4" ry="4" width="690" height="300" />
        <rect x="720" y="680" rx="4" ry="4" width="480" height="300" />
      </ContentLoader>
    </div>
  )
}
