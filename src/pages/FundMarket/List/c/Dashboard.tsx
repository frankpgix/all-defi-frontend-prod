import React, { FC } from 'react'
import { useRequest } from 'ahooks'
import { formatNumber } from '@/utils/tools'

import FundReader from '@/class/FundReader'
import { GlobalAssetStatisticDefault } from '@/class/help'
import { CountItem, CountLayout } from '@/pages/MyManagement/Manager/FundDetail/c/ManageDetail/C'

const Dashboard: FC = () => {
  const { getGlobalAssetStatistic } = FundReader
  const { data = GlobalAssetStatisticDefault, loading } = useRequest(getGlobalAssetStatistic)
  return (
    <section className="web-fund-dashboard-layout">
      <div className="web-fund-dashboard">
        {/*<h3>WE ARE</h3>*/}
        <h2>
          A Decentralized Asset Management <br /> Platform on Blockchain
        </h2>
        <CountLayout col="3">
          <CountItem
            label="Current Overall AUM"
            popper="Total value of AC DAO, update after settlement"
            value={formatNumber(data.aum, 2, '$0,0.00')}
            loading={loading}
          />
          <CountItem
            label="Current Fund AUM"
            popper="Total AUM of all the funds, update after settlement"
            value={formatNumber(data.assetInFunds, 2, '$0,0.00')}
            loading={loading}
          />
          <CountItem
            label="Gross Profit"
            popper="Total historic profit and loss, update after settlement"
            value={formatNumber(data.historyReturn, 2, '$0,0.00')}
            loading={loading}
          />
        </CountLayout>
      </div>
      <div className="web-fund-dashboard-ball animate__animated animate__slideInRight" />
    </section>
  )
}

export default Dashboard
