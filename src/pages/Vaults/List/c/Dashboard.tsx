import { FC, useMemo } from 'react'

import { useAssetLatestPrices } from '@/hooks/Contracts/usePriceAggregator'
// import { useGlobalAssetStats } from '@/hooks/Contracts/useAUMStats'
import { useVaultList } from '@/hooks/Contracts/useVaultReader'
import { useUnderlyingTokens } from '@/hooks/useToken'

// import { useRequest } from 'ahooks'
// import { formatNumber } from '@/utils/tools'
// import AUMStats from '@/class/AUMStats'
// import { GlobalAssetStatisticDefault } from '@/class/help'
import { CountItem, CountLayout } from '@@/core/Sestion'

const Dashboard: FC = () => {
  // const { assetsPrice, update } = useAssetsPriceStore((i) => ({ ...i }))
  const { data, isLoading } = useVaultList()

  // const AUM = data?.reduce((acc, item) => acc + item.aum, 0) || 0
  // const GP = data?.reduce((acc, item) => acc + item.historicalReturn, 0) || 0
  const underlyingTokens = useUnderlyingTokens()
  const {
    data: price,
    isSuccess: priceSuccess,
    isLoading: priceLoading
  } = useAssetLatestPrices(underlyingTokens)

  const AUM = useMemo(() => {
    return (
      data?.reduce((acc, item) => {
        return acc + price[item.underlyingToken.address] * item.aum
      }, 0) || 0
    )
  }, [data, price, priceSuccess, priceLoading])

  const GP = useMemo(() => {
    return (
      data?.reduce((acc, item) => {
        return acc + price[item.underlyingToken.address] * item.historicalReturn
      }, 0) || 0
    )
  }, [data, price, priceSuccess, priceLoading])

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
            label="Current Vaults AUM"
            popper="Total AUM of all the Vaults, update after settlement"
            countUp={{ value: AUM, prefix: '$', decimals: 2 }}
            loading={isLoading || priceLoading}
          />
          <CountItem
            label="Gross Profit"
            popper="Total historic profit and loss, update after settlement"
            countUp={{ value: GP, prefix: '$', decimals: 2 }}
            loading={isLoading || priceLoading}
          />
          <CountItem
            label="Current Vaults"
            popper="Total value of AC DAO, update after settlement"
            countUp={{ value: data.length, prefix: '', decimals: 0 }}
            loading={isLoading}
          />
        </CountLayout>
      </div>
      <div className="web-fund-dashboard-ball animate__animated animate__slideInRight" />
    </section>
  )
}

export default Dashboard
