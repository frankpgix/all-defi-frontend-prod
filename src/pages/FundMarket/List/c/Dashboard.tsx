import React, { FC } from 'react'
import { useRequest } from 'ahooks'
import { formatNumber } from '@/utils/tools'

import FundReader from '@/class/FundReader'
import { GlobalAssetStatisticDefault } from '@/class/help'
import Popper from '@@/common/Popper'

const Dashboard: FC = () => {
  const { getGlobalAssetStatistic } = FundReader
  const { data = GlobalAssetStatisticDefault } = useRequest(getGlobalAssetStatistic)
  return (
    <section className="web-fund-dashboard-layout">
      <div className="web-fund-dashboard">
        {/*<h3>WE ARE</h3>*/}
        <h2>
          A Decentralized Asset Management <br /> Platform on Blockchain
        </h2>
        <ul>
          <li>
            <label>
              Current Overall AUM <Popper content="Total value of acDAO, update after settlement" white />
            </label>
            <em>{formatNumber(data.aum, 2, '$0,0.00')}</em>
          </li>
          <li>
            <label>
              Current Fund AUM <Popper content="Total AUM of all the funds, update after settlement" white />
            </label>
            <em>{formatNumber(data.assetInFunds, 2, '$0,0.00')}</em>
          </li>
          <li>
            <label>
              Gross Profit <Popper content="Total historic profit and loss, update after settlement" white />
            </label>
            <em>{formatNumber(data.historyReturn, 2, '$0,0.00')}</em>
          </li>
        </ul>
      </div>
      <div className="web-fund-dashboard-ball animate__animated animate__slideInRight" />
    </section>
  )
}

export default Dashboard
