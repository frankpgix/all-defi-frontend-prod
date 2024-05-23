import { FC } from 'react'

// import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import InvitationRanking from './InvitationRanking'
import PointsRanking from './PointsRanking'

const Leaderboard: FC = () => {
  return (
    <>
      <header className="p-task-header">Leaderboard</header>
      <section className="p-task-leaderboard">
        <PointsRanking />
        <InvitationRanking />
      </section>
    </>
  )
}

export default Leaderboard
