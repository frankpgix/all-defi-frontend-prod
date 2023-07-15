import React, { FC } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import { FundDetailProps, FundUserDataProps, ShareCompositionProps } from '@/class/help'

import SubscribeFunds from './SubscribeFunds'
import RedeemFunds from './RedeemFunds'
import Claim from './Claim'
// import DrawShares from './DrawShares'

interface Props {
  userData: FundUserDataProps
  data: FundDetailProps
  share: ShareCompositionProps
  getData: () => void
  loading: boolean
}

const Bench: FC<Props> = ({ userData, data, getData, share }) => {
  return (
    <section className="web-fund-detail-bench-layout">
      <Tabs>
        <TabList>
          <Tab>Subscribe funds</Tab>
          <Tab>redeem funds & claim</Tab>
        </TabList>
        <TabPanel>
          <SubscribeFunds data={data} getData={getData} />
        </TabPanel>
        <TabPanel>
          <RedeemFunds userData={userData} data={data} share={share} getData={getData} />
          <Claim userData={userData} getData={getData} />
        </TabPanel>
      </Tabs>
    </section>
  )
}

export default Bench

// <Tab>Draw Shares</Tab>
// <TabPanel>
//   <DrawShares getData={getData} share={share} />
// </TabPanel>
