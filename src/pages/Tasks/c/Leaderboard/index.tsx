import { FC } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

import InvitationRanking from './InvitationRanking'
import PointsRanking from './PointsRanking'

const Leaderboard: FC = () => {
  return (
    <>
      <header className="p-task-header">Leaderboard</header>
      <section className="p-task-leaderboard">
        <Tabs className="web-manage-tab">
          <TabList>
            <Tab>Points Ranking</Tab>
            <Tab>Invitation Ranking</Tab>
          </TabList>
          <TabPanel className="web-manage-tab-panel">
            <PointsRanking />
          </TabPanel>
          <TabPanel className="web-manage-tab-panel">
            <InvitationRanking />
          </TabPanel>
        </Tabs>
      </section>
    </>
  )
}

export default Leaderboard
