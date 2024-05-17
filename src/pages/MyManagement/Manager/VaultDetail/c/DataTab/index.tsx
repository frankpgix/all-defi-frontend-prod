import { FC } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import { AddressType } from '@/types/base'

import Allocation from './Allocation'
// import Record from './Record'
import Withholding from './Withholding'

interface Props {
  vaultAddress: AddressType
}

const DataTab: FC<Props> = ({ vaultAddress }) => {
  return (
    <Tabs className="web-manage-tab">
      <TabList>
        {/* <Tab>record</Tab> */}
        <Tab>Stake</Tab>
        <Tab>Unstake</Tab>
      </TabList>
      {/* <TabPanel className="web-manage-tab-panel">
        <Record vaultAddress={vaultAddress} />
      </TabPanel> */}
      <TabPanel className="web-manage-tab-panel">
        <Allocation vaultAddress={vaultAddress} />
      </TabPanel>
      <TabPanel className="web-manage-tab-panel">
        <Withholding vaultAddress={vaultAddress} />
      </TabPanel>
    </Tabs>
  )
}

export default DataTab
