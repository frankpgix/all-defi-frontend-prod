import React, { FC, useState, useMemo } from 'react'
import dayjs from 'dayjs'
import BN from 'bignumber.js'
// import { floor } from 'lodash'
import { getTokenByAddress } from '@/config/tokens'

import { FundBaseProps, FundDetailProps } from '@/class/help'

import { useFundDetailChartData } from '@/graphql/useFundData'
import { createArrayByNumber } from '@/utils/tools'

import Image from '@@/common/Image'
import RoeShow from '@@/common/RoeShow'
import Loading from '@@/common/Loading'
import { AreaChart } from '@@/common/Chart'
import TimeSelect from '@@/common/Chart/TimeSelect'
import Popper from '@@/common/Popper'
import FundIcon from '@@/common/FundIcon'
import TokenValue from '@@/common/TokenValue'

interface Props {
  base: FundBaseProps
  data: FundDetailProps
  derivatives?: string[]
  loading: boolean
  fundAddress: string
}

const Dashboard: FC<Props> = ({ base, data, loading, derivatives = [], fundAddress }) => {
  const [timeType, setTimeType] = useState<string>('all')
  const timeOptions = ['current epoch', '3 Epochs', 'all']
  const currEpochIndex = useMemo(() => {
    if (timeType === 'current epoch') return [data.epochIndex]
    if (timeType === '3 Epochs')
      return Array.from(new Set([Math.max(data.epochIndex - 2, 0), Math.max(data.epochIndex - 1, 0), data.epochIndex]))
    return createArrayByNumber(data.epochIndex)
  }, [data.epochIndex, timeType])
  const baseToken = useMemo(() => getTokenByAddress(base.baseToken), [base.baseToken])
  console.log('realtimeAUMLimit', data.realtimeAUMLimit, 'aum', data.aum, 'subscribingACToken', data.subscribingACToken)

  const { loading: chartLoading, data: chartData } = useFundDetailChartData(fundAddress ?? '', currEpochIndex)

  return (
    <>
      <header className="web-fund-detail-header">Fund Overview</header>
      <section className="web-fund-detail-dashboard">
        <section className="web-fund-detail-dashboard-base">
          <Loading type="float" show={loading} />
          <article>
            <FundIcon name={base.name} size="large" />
            <h4>{base.name}</h4>
            <p>{base.desc}</p>
          </article>
          <section>
            <h5>protocol allowed</h5>
            <main>
              {derivatives.map((item: string, index: number) => (
                <Image key={index} src={`/products/${item}.png`} alt={item} />
              ))}
            </main>
          </section>
          <footer>
            <dl>
              <dt>Fund NAV</dt>
              <dd>
                <TokenValue value={data.nav} token={baseToken} size="mini" format="0,0.00" />
              </dd>
            </dl>
            <dl>
              <dt>Fund Inception Date</dt>
              <dd>{dayjs(data.createTime).format('MMM DD, YYYY')}</dd>
            </dl>
            <dl>
              <dt>
                Capacity Available
                <Popper
                  size="mini"
                  white
                  content="Fund's max AUM minus current AUM, which shows the available capacity of this fund from this data."
                />
              </dt>
              <dd>
                <TokenValue
                  value={Math.max(
                    BN(data.realtimeAUMLimit).minus(data.aum).minus(data.subscribingACToken).toNumber(),
                    0
                  )}
                  token={baseToken}
                  size="mini"
                  format="0,0.00"
                />
              </dd>
            </dl>

            <dl>
              <dt>
                Current Epoch return %
                <Popper
                  size="mini"
                  white
                  content="The fund's profit and loss on real-time basis, which will be reset to zero after the end of each epoch"
                />
              </dt>
              <dd>
                <RoeShow value={data.roe} subArrow />
              </dd>
            </dl>
            <dl>
              <dt>
                Historical return
                <Popper size="mini" white content="Cumulated profit and loss since the inception of this fund" />
              </dt>
              <dd>
                <TokenValue value={data.historyReturn} token={baseToken} size="mini" />
              </dd>
            </dl>
            <dl>
              <dt>Incentive Rate</dt>
              <dd>20%</dd>
            </dl>
          </footer>
        </section>
        <section className="web-fund-detail-dashboard-chart">
          <header>
            <h3>Share Price</h3>
            <aside>
              <TimeSelect value={timeType} options={timeOptions} onChange={(val) => setTimeType(val)} />
            </aside>
          </header>
          <section>
            <AreaChart
              data={chartData}
              loading={chartLoading || loading}
              xKey="time"
              yKey="value"
              chartId="defi"
              valueFormatStr={`0,0.00`}
              valueSuffix={baseToken.name}
              yLabel="Price"
            />
          </section>
        </section>
      </section>
    </>
  )
}

export default Dashboard
// <dl>
//   <dt>Last Epoch return %</dt>
//   <dd>
//     <RoeShow value={data.lastRoe} subArrow />
//   </dd>
// </dl>
