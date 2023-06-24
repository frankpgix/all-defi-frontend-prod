import React, { FC, useState, useEffect, useCallback } from 'react'

import { getEthIndexData, getBtcIndexData, getDefiTvlData } from '@/api'
// import FundManager, { FundGlobalAssetProps, FundGlobalAssetDefaultData } from '@/class/FundManager'

import Item from './Item'

const Charts: FC = () => {
  const [defiTvl, setDefiTvl] = useState<{ time: number; value: string }[]>([])
  const [btc, setBtc] = useState<{ time: number; value: string }[]>([])
  const [eth, setEth] = useState<{ time: number; value: string }[]>([])
  const getData = useCallback(async () => {
    const btc = await getBtcIndexData()
    const eth = await getEthIndexData()
    const defi = await getDefiTvlData()
    setBtc(btc)
    setEth(eth)
    setDefiTvl(defi)
  }, [])
  useEffect(() => void getData(), [])

  return (
    <section className="web-fund-charts">
      <h2>On-chain Index</h2>
      <div className="web-fund-charts-group">
        <Item name="BTC Index" subName="Return (1D)" icon="icon/btc.svg" data={btc} yLabel="Price" />
        <Item name="ETH Index" subName="Return (1D)" icon="icon/eth-index.svg" data={eth} yLabel="Price" />
        <Item name="DeFi TVL" subName="TVL (1D)" icon="icon/defi-tvl.svg" data={defiTvl} />
      </div>
    </section>
  )
}

export default Charts
