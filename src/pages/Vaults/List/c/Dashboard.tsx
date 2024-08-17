import { FC } from 'react'

// import { useGlobalAssetStats } from '@/hooks/Contracts/useAUMStats'
import { useVaultList } from '@/hooks/Contracts/useVaultReader'

// import { useRequest } from 'ahooks'
// import { formatNumber } from '@/utils/tools'
// import AUMStats from '@/class/AUMStats'
// import { GlobalAssetStatisticDefault } from '@/class/help'
import { CountItem, CountLayout } from '@@/core/Sestion'

const Dashboard: FC = () => {
  const { data, isLoading } = useVaultList()

  const AUM = data?.reduce((acc, item) => acc + item.aum, 0) || 0
  const GP = data?.reduce((acc, item) => acc + item.historicalReturn, 0) || 0
  console.log(data)
  // const { getGlobalAssetStats } = AUMStats
  // const { data = GlobalAssetStatisticDefault, loading } = useRequest(getGlobalAssetStats)
  return (
    <section className="web-fund-dashboard-layout">
      <div className="web-fund-dashboard">
        {/*<h3>WE ARE</h3>*/}
        <h2>
          {/* A Decentralized Asset Management <br /> Platform on Blockchain */}
          Treasury Staking Platform <br /> &nbsp;
        </h2>
        <CountLayout col="3">
          <CountItem
            label="Current Overall AUM"
            popper="Total value of AC DAO, update after settlement"
            countUp={{ value: AUM ?? 0, prefix: '', decimals: 2 }}
            loading={isLoading}
          />
          <CountItem
            label="Current Vaults AUM"
            popper="Total AUM of all the Vaults, update after settlement"
            countUp={{ value: AUM, prefix: '', decimals: 2 }}
            loading={isLoading}
          />
          <CountItem
            label="Gross Profit"
            popper="Total historic profit and loss, update after settlement"
            countUp={{ value: GP, prefix: '', decimals: 2 }}
            loading={isLoading}
          />
        </CountLayout>
      </div>
      <div className="web-fund-dashboard-ball animate__animated animate__slideInRight" />
    </section>
  )
}

export default Dashboard
