import { FC } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

// import ContentLoader from 'react-content-loader'
// import { FundDetailProps, FundUserDataProps, ShareCompositionProps } from '@/class/help'
import { VaultBaseInfoProps, VaultDetailProps, VaultUserDetailProps } from '@/types/vault'

import Allocate from './Allocate'
import Claim from './Claim'
import Withhold from './Withhold'

// import DrawShares from './DrawShares'

interface Props {
  userData: VaultUserDetailProps
  data: VaultDetailProps
  base: VaultBaseInfoProps
  getData: () => void
  loading: boolean
}

const Bench: FC<Props> = ({ userData, data, base, getData }) => {
  return (
    <>
      <section className="web-fund-detail-bench-layout">
        <Tabs>
          <TabList>
            {!data.isClosed && <Tab>Stake to vault</Tab>}
            <Tab>{!data.isClosed && <>Unstake from vault & </>}Claim</Tab>
          </TabList>
          {!data.isClosed && (
            <TabPanel>
              <Allocate data={data} base={base} getData={getData} />
            </TabPanel>
          )}
          <TabPanel>
            {!data.isClosed && <Withhold userData={userData} data={data} getData={getData} />}
            <Claim userData={userData} getData={getData} />
          </TabPanel>
        </Tabs>
      </section>
    </>
  )
}

export default Bench
