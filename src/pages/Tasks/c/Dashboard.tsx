import { FC } from 'react'

import { formatNumber } from '@/utils/tools'
import { CountItem, CountLayout } from '@@/core/Sestion'

const Dashboard: FC = () => {
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
            value={formatNumber(12344.78, 2, '0,0.00')}
            unit="Pts"
            loading={false}
          />
          <CountItem
            label="Today number of points distributed"
            value={formatNumber(234567.89, 2, '0,0.00')}
            unit="Pts"
            loading={false}
          />
          <CountItem
            label="Number of all addresses"
            value={formatNumber(2, 2, '0,0.00')}
            loading={false}
          />
          <CountItem
            label="Number of new addresses today"
            value={formatNumber(3, 2, '0,0.00')}
            loading={false}
          />
        </CountLayout>
      </div>
    </section>
  )
}

export default Dashboard
