import { FC } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
// import ContentLoader from 'react-content-loader'

// import { FundDetailProps, FundUserDataProps, ShareCompositionProps } from '@/class/help'

import { VaultDetailProps, VaultUserDetailProps, ShareCompositionProps } from '@/types/vault'

import Allocate from './Allocate'
import Withhold from './Withhold'
import Claim from './Claim'
// import DrawShares from './DrawShares'

interface Props {
  userData: VaultUserDetailProps
  data: VaultDetailProps
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
            <Allocate data={data} getData={getData} />
          </TabPanel>
          <TabPanel>
            <Withhold userData={userData} data={data} share={share} getData={getData} />
            <Claim userData={userData} getData={getData} />
          </TabPanel>
        </Tabs>
      </section>
    </>
  )
}

export default Bench
