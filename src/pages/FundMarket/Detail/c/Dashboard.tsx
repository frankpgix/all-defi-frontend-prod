import React, { FC, useState, useMemo } from 'react'
import dayjs from 'dayjs'
import BN from 'bignumber.js'
// import { floor } from 'lodash'
import { getTokenByAddress } from '@/config/tokens'
import ContentLoader from 'react-content-loader'

import { FundBaseProps, FundDetailProps } from '@/class/help'

import { useFundDetailChartData } from '@/graphql/useData'

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

type optionProps = 'current epoch' | '3 Epochs' | 'all'
const Dashboard: FC<Props> = ({ base, data, loading, derivatives = [], fundAddress }) => {
  const [timeType, setTimeType] = useState<optionProps>('all')
  const timeOptions: optionProps[] = ['current epoch', '3 Epochs', 'all']
  const baseToken = useMemo(() => getTokenByAddress(base.baseToken), [base.baseToken])
  // console.log('realtimeAUMLimit', data.realtimeAUMLimit, 'aum', data.aum, 'subscribingACToken', data.subscribingACToken)
  // console.log(data)
  const { loading: chartLoading, data: chartData } = useFundDetailChartData(
    fundAddress ?? '',
    timeType,
    data
  )

  if (loading) return <DashboardLoading />

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
                  content="Fund's max AUM minus current AUM, which shows the available capacity of this fund from this data."
                />
              </dt>
              <dd>
                <TokenValue
                  value={Math.max(
                    BN(data.realtimeAUMLimit)
                      .minus(data.aum)
                      .minus(data.subscribingACToken)
                      .toNumber(),
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
                <Popper
                  size="mini"
                  content="Cumulated profit and loss since the inception of this fund"
                />
              </dt>
              <dd>
                <TokenValue value={data.historyReturn} token={baseToken} size="mini" />
              </dd>
            </dl>
            <dl>
              <dt>
                Incentive Rate
                <Popper size="mini" content="Highest incentive fee ratio managers can get" />
              </dt>
              <dd>20%</dd>
            </dl>
          </footer>
        </section>
        <section className="web-fund-detail-dashboard-chart">
          <header>
            <h3>Share Price</h3>
            <aside>
              <TimeSelect
                value={timeType}
                options={timeOptions}
                // @ts-ignore
                onChange={(val) => setTimeType(val)}
              />
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

const DashboardLoading = () => {
  return (
    <div className="web">
      <ContentLoader
        width={1200}
        height={482}
        viewBox="0 0 1200 482"
        backgroundColor="#eaeced"
        foregroundColor="#ffffff"
      >
        <rect x="0" y="0" rx="4" ry="4" width="300" height="30" />

        <rect x="0" y="52" rx="4" ry="4" width="590" height="430" />
        <rect x="610" y="52" rx="4" ry="4" width="590" height="430" />
      </ContentLoader>
    </div>
  )
}
