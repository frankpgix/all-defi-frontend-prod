import { FC } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
// import ContentLoader from 'react-content-loader'

// import { FundDetailProps, FundUserDataProps, ShareCompositionProps } from '@/class/help'

import {
  VaultBaseInfoProps,
  VaultDetailProps,
  VaultUserDetailProps,
  ShareCompositionProps
} from '@/types/vault'

import Allocate from './Allocate'
import Withhold from './Withhold'
import Claim from './Claim'
// import DrawShares from './DrawShares'

interface Props {
  userData: VaultUserDetailProps
  data: VaultDetailProps
  base: VaultBaseInfoProps
  share: ShareCompositionProps
  getData: () => void
  loading: boolean
}

const Bench: FC<Props> = ({ userData, data, base, getData, share }) => {
  return (
    <>
      <section className="web-fund-detail-bench-layout">
        <Tabs>
          <TabList>
            {!data.isClosed && <Tab>Allocate to vault</Tab>}
            <Tab>{!data.isClosed && <>Withhold from vault & </>}Claim</Tab>
          </TabList>
          {!data.isClosed && (
            <TabPanel>
              <Allocate data={data} base={base} getData={getData} />
            </TabPanel>
          )}
          <TabPanel>
            {!data.isClosed && (
              <Withhold userData={userData} data={data} share={share} getData={getData} />
            )}
            <Claim userData={userData} getData={getData} />
          </TabPanel>
        </Tabs>
      </section>
    </>
  )
}

export default Bench
