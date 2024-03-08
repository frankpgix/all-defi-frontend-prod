import { FC } from 'react'

import { useRequest } from 'ahooks'

import { getEthIndexData, getBtcIndexData, getDefiTvlData } from '@/api'

import Item from './Item'

const Charts: FC = () => {
  const { data: btc } = useRequest(getBtcIndexData)
  const { data: eth } = useRequest(getEthIndexData)
  const { data: defiTvl } = useRequest(getDefiTvlData)

  return (
    <section className="web-fund-charts">
      <h2>On-chain Index</h2>
      <div className="web-fund-charts-group">
        <Item
          name="BTC Index"
          subName="Return (1D)"
          icon="icon/btc.svg"
          data={btc ?? []}
          yLabel="Price"
        />
        <Item
          name="ETH Index"
          subName="Return (1D)"
          icon="icon/eth-index.svg"
          data={eth ?? []}
          yLabel="Price"
        />
        <Item name="DeFi TVL" subName="TVL (1D)" icon="icon/defi-tvl.svg" data={defiTvl ?? []} />
      </div>
    </section>
  )
}

export default Charts
