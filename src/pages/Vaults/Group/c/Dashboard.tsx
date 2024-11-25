import { FC, ReactNode, useMemo, useState } from 'react'
// import { floor } from 'lodash'
import ContentLoader from 'react-content-loader'

import BN from 'bignumber.js'
import dayjs from 'dayjs'

// import { FundBaseProps, FundDetailProps } from '@/class/help'
import { VaultDetailProps } from '@/types/vault'

import { calcVaultDetailChartGQL } from '@/graphql/calcGql'
import { useVaultDetailChartData } from '@/graphql/useData'
// import Loading from '@@/common/Loading'
import { AreaChart } from '@@/common/Chart'
import TimeSelect from '@@/common/Chart/TimeSelect'
import FundIcon from '@@/common/FundIcon'
import Image from '@@/common/Image'
import Popper from '@@/common/Popper'
import RoeShow from '@@/common/RoeShow'
import TokenValue from '@@/common/TokenValue'

interface Props {
  data: VaultDetailProps
  loading: boolean
  fundAddress: string
}

type optionProps = 'current epoch' | '3 Epochs' | 'all'
const Dashboard: FC<Props> = ({ data, loading, fundAddress }) => {
  const [timeType, setTimeType] = useState<optionProps>('all')
  const timeOptions: optionProps[] = ['current epoch', '3 Epochs', 'all']
  const underlyingToken = useMemo(() => data.underlyingToken, [data.underlyingToken])
  // console.log(timeType, 'timeType')
  const chartType = 'aum'

  const gql = useMemo(
    () => calcVaultDetailChartGQL(fundAddress, data.epochIndex, timeType),
    [fundAddress, data.epochIndex, timeType]
  )
  // console.log(JSON.stringify(gql), 'gql')
  const { loading: chartLoading, data: chartData } = useVaultDetailChartData(gql, underlyingToken)
  // console.log(data.roe, 'data.data.roe')
  const currentEpochReturn = useMemo(
    () => (data.roe > 0 ? BN(data.roe).times(10).div(7).toNumber() : data.roe) * 100,
    [data.roe]
  )
  // data.historicalReturn + data.platFee + data.managerFee
  // console.log(currentEpochReturn, data.roe)
  const historicalReturn = useMemo(
    () => BN(data.historicalReturn).toNumber(),
    [data.historicalReturn]
  )
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
              <FundIcon name="AllDeFi Vault" size="large" />
              <h4>AllDeFi Vault</h4>
              <p>AllDeFi Vault, Let's Be Rich</p>
            </article>
          )}
          <section>
            <h5>Protocols Allowed</h5>
            <main>
              <Image src={`/products/BRINGTRADE.svg`} alt={'BRINGTRADE'} />
            </main>
          </section>
          {/* <section>
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
                {base.derivativesInfo.map(({ name }, index: number) => (
                  <Image key={index} src={`/products/${name}.png`} alt={name} />
                ))}
              </main>
            )}
          </section> */}
          <footer>
            <DashboardItem label="AUM" loading={loading}>
              <TokenValue value={data.aum} token={underlyingToken} size="mini" format="0,0.00" />
            </DashboardItem>
            <DashboardItem label="Vault Inception Date" loading={loading}>
              {dayjs(data.createTime).format('MMM DD, YYYY')}
            </DashboardItem>
            {/* <DashboardItem label="Capacity Available" loading={loading}>
              <TokenValue
                value={Math.max(
                  BN(data.aum).minus(data.beginningAUM).minus(data.stakingACToken).toNumber(),
                  0
                )}
                token={underlyingToken}
                size="mini"
                format="0,0.00"
              />
            </DashboardItem> */}
            <DashboardItem
              label="Current Epoch return %"
              popper="The vault's profit and loss on real-time basis, which will be reset to zero after the end of each epoch"
              loading={loading}
            >
              {/* demo */}
              <RoeShow value={currentEpochReturn} subArrow />
            </DashboardItem>
            <DashboardItem
              label="Historical return"
              popper="Cumulated profit and loss since the inception of this vault"
              loading={loading}
            >
              {/* demo */}
              <TokenValue
                value={historicalReturn}
                format="0,0.00"
                token={underlyingToken}
                size="mini"
              />
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
              yKey={chartType === 'aum' ? 'aum' : 'value'}
              chartId="defi"
              valueFormatStr={`0,0.0000`}
              valueDecimal={4}
              valueSuffix={underlyingToken.name}
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
