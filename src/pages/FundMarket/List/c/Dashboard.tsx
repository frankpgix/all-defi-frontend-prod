import React, { FC } from 'react'

import { useGlobalAssetStatistic } from '@/hooks/useFundReader'
import { formatNumber } from '@/utils/tools'

const Dashboard: FC = () => {
  const { data } = useGlobalAssetStatistic()
  return (
    <section className="web-fund-dashboard-layout">
      <div className="web-fund-dashboard">
        {/*<h3>WE ARE</h3>*/}
        <h2>
          A Decentralized Asset Management <br /> Platform on Blockchain
        </h2>
        <ul>
          <li>
            <label>Current Overall AUM</label>
            <em>{formatNumber(data.aum, 2, '$0,0.00')}</em>
          </li>
          <li>
            <label>Current Fund AUM</label>
            <em>{formatNumber(data.assetInFunds, 2, '$0,0.00')}</em>
          </li>
          <li>
            <label>Gross Profit</label>
            <em>{formatNumber(data.historyReturn, 2, '$0,0.00')}</em>
          </li>
        </ul>
      </div>
      <div className="web-fund-dashboard-ball animate__animated animate__slideInRight" />
    </section>
  )
}

export default Dashboard
