import { FC } from 'react'

import { useTaskProfile } from '@/hooks/useTasks'

import { formatNumber } from '@/utils/tools'
import { CountItem, CountLayout } from '@@/core/Sestion'

const Dashboard: FC = () => {
  const { dashboard } = useTaskProfile()
  return (
    <section className="web-task-dashboard-layout">
      <div className="web-task-dashboard">
        {/*<h3>WE ARE</h3>*/}
        <h2>
          Get Points by Completing Tasks <br /> &nbsp;
        </h2>
        <CountLayout col="4">
          <CountItem
            label="Total number of points distributed"
            value={formatNumber(dashboard.totalPoints, 2, '0,0.00')}
            unit="Pts"
            loading={false}
          />
          <CountItem
            label="Today number of points distributed"
            value={formatNumber(dashboard.pointsToday, 2, '0,0.00')}
            unit="Pts"
            loading={false}
          />
          <CountItem
            label="Number of all addresses"
            value={formatNumber(dashboard.totalUsers, 0, '0,0')}
            loading={false}
          />
          <CountItem
            label="Number of new addresses today"
            value={formatNumber(dashboard.newUsersToday, 0, '0,0')}
            loading={false}
          />
        </CountLayout>
      </div>
    </section>
  )
}

export default Dashboard
