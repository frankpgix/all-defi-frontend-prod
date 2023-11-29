import React, { FC } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ContentLoader from 'react-content-loader'

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

const Bench: FC<Props> = ({ userData, data, getData, share, loading }) => {
  return (
    <>
      <section className="web-fund-detail-bench-layout">
        <Tabs>
          <TabList>
            <Tab>Allocate to vault</Tab>
            <Tab>Withhold from vault & Claim</Tab>
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
    </>
  )
}

export default Bench

// <Tab>Draw Shares</Tab>
// <TabPanel>
//   <DrawShares getData={getData} share={share} />
// </TabPanel>

// const BenchLoading = () => {
//   return (
//     <div className="web">
//       <ContentLoader
//         width={1200}
//         height={550}
//         viewBox="0 0 1200 515"
//         backgroundColor="#eaeced"
//         foregroundColor="#ffffff"
//       >
//         <rect x="0" y="40" rx="4" ry="4" width="400" height="30" />
//         <rect x="0" y="80" rx="4" ry="4" width="1200" height="4" />
//         <rect x="40" y="124" rx="4" ry="4" width="300" height="30" />
//         <rect x="40" y="184" rx="4" ry="4" width="500" height="50" />
//         <rect x="40" y="250" rx="4" ry="4" width="200" height="16" />
//         <rect x="40" y="280" rx="4" ry="4" width="200" height="16" />
//         <rect x="40" y="330" rx="4" ry="4" width="1100" height="16" />
//         <rect x="950" y="370" rx="30" ry="30" width="200" height="60" />
//       </ContentLoader>
//     </div>
//   )
// }
