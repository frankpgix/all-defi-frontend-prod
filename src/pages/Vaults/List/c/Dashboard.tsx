import { FC } from 'react'
// import { useRequest } from 'ahooks'
import { formatNumber } from '@/utils/tools'

import { useGlobalAssetStats } from '@/hooks/Contracts/useAUMStats'

// import AUMStats from '@/class/AUMStats'
// import { GlobalAssetStatisticDefault } from '@/class/help'
import { CountItem, CountLayout } from '@@/core/Sestion'

const Dashboard: FC = () => {
  const { data, isLoading } = useGlobalAssetStats()
  // const { getGlobalAssetStats } = AUMStats
  // const { data = GlobalAssetStatisticDefault, loading } = useRequest(getGlobalAssetStats)
  return (
    <section className="web-fund-dashboard-layout">
      <div className="web-fund-dashboard">
        {/*<h3>WE ARE</h3>*/}
        <h2>
          {/* A Decentralized Asset Management <br /> Platform on Blockchain */}
          Treasury Allocation Platform <br /> &nbsp;
        </h2>
        <CountLayout col="3">
          <CountItem
            label="Current Overall AUM"
            popper="Total value of AC DAO, update after settlement"
            value={formatNumber(data?.overallAUMInUSD ?? 0, 2, '$0,0.00')}
            loading={isLoading}
          />
          <CountItem
            label="Current Vaults AUM"
            popper="Total AUM of all the Vaults, update after settlement"
            value={formatNumber(data?.vaultAUMInUSD ?? 0, 2, '$0,0.00')}
            loading={isLoading}
          />
          <CountItem
            label="Gross Profit"
            popper="Total historic profit and loss, update after settlement"
            value={formatNumber(data?.overallReturnInUSD ?? 0, 2, '$0,0.00')}
            loading={isLoading}
          />
        </CountLayout>
      </div>
      <div className="web-fund-dashboard-ball animate__animated animate__slideInRight" />
    </section>
  )
}

export default Dashboard
