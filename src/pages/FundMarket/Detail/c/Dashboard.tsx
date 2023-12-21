import React, { FC, useState, useMemo, ReactNode } from 'react'
import dayjs from 'dayjs'
import BN from 'bignumber.js'
// import { floor } from 'lodash'
import { getTokenByAddress } from '@/config/tokens'
import ContentLoader from 'react-content-loader'

import { FundBaseProps, FundDetailProps } from '@/class/help'

import { calcFundDetailChartGQL } from '@/gql/gqls'
import { useFundDetailChartData } from '@/gql/useData'

import Image from '@@/common/Image'
import RoeShow from '@@/common/RoeShow'
// import Loading from '@@/common/Loading'
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

  const gql = useMemo(
    () => calcFundDetailChartGQL(fundAddress, data.epochIndex, timeType),
    [fundAddress, data.epochIndex, timeType]
  )
  const { loading: chartLoading, data: chartData } = useFundDetailChartData(gql)
  // console.log(data.historyReturn, 'data.historyReturn')
  return (
    <>
      <header className="web-fund-detail-header">Vault Overview</header>
      <section className="web-fund-detail-dashboard">
        <section className="web-fund-detail-dashboard-base">
          {loading ? (
            <ContentLoader
              width={530}
              height={130}
              viewBox="0 0 530 130"
              backgroundColor="#eaeced"
              foregroundColor="#ffffff"
            >
              <rect x="0" y="0" rx="12" ry="12" width="90" height="90" />
              <rect x="110" y="5" rx="4" ry="4" width="100" height="30" />
              <rect x="110" y="45" rx="4" ry="4" width="420" height="15" />
              <rect x="110" y="70" rx="4" ry="4" width="200" height="15" />
            </ContentLoader>
          ) : (
            <article>
              <FundIcon name={base.name} size="large" />
              <h4>{base.name}</h4>
              <p>{base.desc}</p>
            </article>
          )}
          <section>
            <h5>Protocols Allowed</h5>
            {loading ? (
              <ContentLoader
                width={530}
                height={56}
                viewBox="0 0 530 56"
                backgroundColor="#eaeced"
                foregroundColor="#ffffff"
              >
                <rect x="0" y="0" rx="8" ry="8" width="56" height="56" />
                <rect x="66" y="0" rx="8" ry="8" width="56" height="56" />
                <rect x="132" y="0" rx="8" ry="8" width="56" height="56" />
                <rect x="198" y="0" rx="8" ry="8" width="56" height="56" />
              </ContentLoader>
            ) : (
              <main>
                {derivatives.map((item: string, index: number) => (
                  <Image key={index} src={`/products/${item}.png`} alt={item} />
                ))}
              </main>
            )}
          </section>
          <footer>
            <DashboardItem label="Net Asset Value" loading={loading}>
              <TokenValue value={data.nav} token={baseToken} size="mini" format="0,0.00" />
            </DashboardItem>
            <DashboardItem label="Vault Inception Date" loading={loading}>
              {dayjs(data.createTime).format('MMM DD, YYYY')}
            </DashboardItem>
            <DashboardItem label="Capacity Available" loading={loading}>
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
            </DashboardItem>
            <DashboardItem
              label="Current Epoch return %"
              popper="The vault's profit and loss on real-time basis, which will be reset to zero after the end of each epoch"
              loading={loading}
            >
              <RoeShow value={data.roe} subArrow />
            </DashboardItem>
            <DashboardItem
              label="Historical return"
              popper="Cumulated profit and loss since the inception of this vault"
              loading={loading}
            >
              <TokenValue
                value={data.historyReturn}
                format="0,0.00"
                token={baseToken}
                size="mini"
              />
            </DashboardItem>

            <DashboardItem label="Denomination Asset" loading={loading}>
              {baseToken.name}
            </DashboardItem>
            {/* <DashboardItem
              label="Incentive Rate"
              popper="Highest incentive fee ratio managers can get"
              loading={loading}
            >
              20%
            </DashboardItem> */}
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

const DashboardItem: FC<{
  label: string
  popper?: string
  children: ReactNode
  loading?: boolean
}> = ({ label, popper, children, loading }) => {
  return (
    <dl>
      <dt>
        {popper ? (
          <Popper size="mini" content={popper}>
            {label}
          </Popper>
        ) : (
          label
        )}
      </dt>
      <dd>
        {loading ? (
          <ContentLoader
            width={100}
            height={32}
            viewBox="0 0 100 32"
            backgroundColor="#eaeced"
            foregroundColor="#ffffff"
          >
            <rect x="0" y="5" rx="4" ry="4" width="100" height="20" />
          </ContentLoader>
        ) : (
          children
        )}
      </dd>
    </dl>
  )
}
