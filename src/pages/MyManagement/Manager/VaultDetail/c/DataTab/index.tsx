import { FC } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Record from './Record'
import Allocation from './Allocation'
import Withholding from './Withholding'
import { AddressType } from '@/types/base'

interface Props {
  vaultAddress: AddressType
}

const DataTab: FC<Props> = ({ vaultAddress }) => {
  return (
    <Tabs className="web-manage-tab">
      <TabList>
        <Tab>record</Tab>
        <Tab>Allocation</Tab>
        <Tab>Withholding</Tab>
      </TabList>
      <TabPanel className="web-manage-tab-panel">
        <Record vaultAddress={vaultAddress} />
      </TabPanel>
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
