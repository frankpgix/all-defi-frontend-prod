import React, { FC } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Record from './Record'
import Subscription from './Subscription'
import Redemption from './Redemption'

interface Props {
  fundAddress: string
}

const DataTab: FC<Props> = ({ fundAddress }) => {
  return (
    <Tabs className="web-manage-tab">
      <TabList>
        <Tab>record</Tab>
        <Tab>Allocation</Tab>
        <Tab>Withholding</Tab>
      </TabList>
      <TabPanel className="web-manage-tab-panel">
        <Record fundAddress={fundAddress} />
      </TabPanel>
      <TabPanel className="web-manage-tab-panel">
        <Subscription fundAddress={fundAddress} />
      </TabPanel>
      <TabPanel className="web-manage-tab-panel">
        <Redemption fundAddress={fundAddress} />
      </TabPanel>
    </Tabs>
  )
}

export default DataTab
