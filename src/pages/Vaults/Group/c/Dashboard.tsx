import { FC, ReactNode, useMemo, useState } from 'react'
// import { floor } from 'lodash'
import ContentLoader from 'react-content-loader'

import BN from 'bignumber.js'
import dayjs from 'dayjs'

import { useAssetLatestPrices } from '@/hooks/Contracts/usePriceAggregator'
import { useChainToken, useUnderlyingTokens } from '@/hooks/useToken'

// import { FundBaseProps, FundDetailProps } from '@/class/help'
import { VaultDetailProps } from '@/types/vault'

import { calcVaultGroupChartGQL } from '@/graphql/calcGql'
import { useVaultGroupChartData } from '@/graphql/useData'
// import Loading from '@@/common/Loading'
import { AreaChart } from '@@/common/Chart'
import TimeSelect from '@@/common/Chart/TimeSelect'
import FundIcon from '@@/common/FundIcon'
import Image from '@@/common/Image'
import Popper from '@@/common/Popper'
import RoeShow from '@@/common/RoeShow'
import TokenValue from '@@/common/TokenValue'

interface Props {
  data: VaultDetailProps[]
  loading: boolean
  fundAddress: string
}

type optionProps = 'current epoch' | '3 Epochs' | 'all'
const Dashboard: FC<Props> = ({ data: list, loading, fundAddress }) => {
  const { chainToken } = useChainToken()
  const assetTokenList = useUnderlyingTokens()
  const { data: price } = useAssetLatestPrices([...assetTokenList, chainToken])

  const data = list[0]
  const [timeType, setTimeType] = useState<optionProps>('all')
  const timeOptions: optionProps[] = ['current epoch', '3 Epochs', 'all']
  const underlyingToken = useMemo(() => data.underlyingToken, [data.underlyingToken])
  // console.log(timeType, 'timeType')
  const chartType = 'aum'
  const gql = useMemo(
    () =>
      calcVaultGroupChartGQL(
        list.map((item) => item.address.toLocaleLowerCase()),
        data.epochIndex,
        timeType
      ),
    [fundAddress, data.epochIndex, timeType]
  )

  const { loading: chartLoading, data: chartData } = useVaultGroupChartData(gql)
  // console.log(JSON.stringify(gql), 'gql')
  // const { loading: chartLoading, data: chartData } = useVaultGroupChartData(gql, underlyingToken)
  // console.log(data.roe, 'data.data.roe')

  const totalAum = useMemo(
    () =>
      list?.reduce((acc, item) => {
        return acc + price[item.underlyingToken.address] * item.aum
      }, 0) || 0,
    [price, underlyingToken.address]
  )

  const totalHistoricalReturn = useMemo(
    () =>
      list?.reduce((acc, item) => {
        return acc + price[item.underlyingToken.address] * item.historicalReturn
      }, 0) || 0,
    [price, underlyingToken.address]
  )
  const totalRoe = useMemo(() => {
    if (totalAum === 0) return 0
    const totalProfit = list
      .map((item) =>
        BN(item.beginningAUM)
          .times(item.grossRoe)
          .times(price[item.underlyingToken.address] ?? 1)
          .toNumber()
      )
      .reduce((acc, cur) => BN(acc).plus(cur).toNumber(), 0)
    return BN(totalProfit).div(totalAum).times(100).toNumber()
  }, [list, price, totalAum])
  // console.log(data.historicalReturn, historicalReturn, 'data.historicalReturn')
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
              <FundIcon name="Core Crypto Index" size="large" />
              <h4>Core Crypto Index</h4>
              <p>
                This vault will use a very safe capital preservation strategy to bring benefits to
                users, mainly based on the BTC price to sell high and buy low strategy,welcome to
                experience the experience.If you have any questions, please feel free to contact the
                CCI team. <br />
                Our email: cciteam@gmail.com <br />
                Our Telegram: cciteam@tel
              </p>
            </article>
          )}
          <section>
            <h5>Protocols Allowed</h5>
            <main>
              <Image src={`/products/BRINGTRADE.svg`} alt={'BRINGTRADE'} />
            </main>
          </section>

          <footer>
            <DashboardItem label="AUM" loading={loading}>
              <TokenValue value={totalAum} size="mini" format="$0,0.00" noUnit />
            </DashboardItem>
            <DashboardItem label="Vault Inception Date" loading={loading}>
              {dayjs(data.createTime).format('MMM DD, YYYY')}
            </DashboardItem>
            <DashboardItem
              label="Current Epoch return %"
              popper="The vault's profit and loss on real-time basis, which will be reset to zero after the end of each epoch"
              loading={loading}
            >
              <RoeShow value={totalRoe} subArrow />
            </DashboardItem>
            <DashboardItem
              label="Historical return"
              popper="Cumulated profit and loss since the inception of this vault"
              loading={loading}
            >
              {/* demo */}
              <TokenValue value={totalHistoricalReturn} format="$0,0.00" noUnit size="mini" />
            </DashboardItem>

            {/* <DashboardItem label="Denomination Asset" loading={loading}>
              {underlyingToken.name}
            </DashboardItem> */}
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
            <h3>{chartType === 'aum' ? 'AUM' : 'Share Price'}</h3>
            <aside>
              <TimeSelect
                value={timeType}
                options={timeOptions}
                // @ts-ignore
                onChange={(val) => setTimeType(val)}
              />
            </aside>
            {/* <Select
              value={chartType}
              onChange={setChartType}
              objOptions={[
                { label: 'AUM', value: 'aum' },
                { label: 'Share Price', value: 'price' }
              ]}
              mini
            /> */}
          </header>
          <section>
            <AreaChart
              data={chartData}
              loading={chartLoading || loading}
              xKey="time"
              yKey="value"
              chartId="defi"
              valueFormatStr={`$0,0.00`}
              valueDecimal={4}
              yLabel={chartType === 'aum' ? 'AUM' : 'Price'}
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
