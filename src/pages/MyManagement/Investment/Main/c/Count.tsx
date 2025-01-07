import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import ContentLoader from 'react-content-loader'

import BN from 'bignumber.js'
import classNames from 'classnames'
import { isNaN } from 'lodash'
import { Cell, Pie, PieChart, Sector } from 'recharts'

import { useProfile } from '@/hooks/useProfile'

import { VaultUserListDataProps } from '@/types/vault'

import { getUserPoint } from '@/api/vault'
import Tag from '@/components/core/Tag'
import { formatNumber } from '@/utils/tools'
import Blank from '@@/common/Blank'
import TokenValue from '@@/common/TokenValue'
import { SectionItem } from '@@/core/Sestion'

const renderActiveShape = (props: any) => {
  const { cx, cy, outerRadius, innerRadius, startAngle, endAngle, fill } = props

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 4}
        outerRadius={outerRadius + 5}
        fill={fill}
      />
    </g>
  )
}

const CountLoading: FC = () => {
  return (
    <div className="web-manage-investment-count">
      <div className="web-manage-investment-count-chart">
        <div className="web-manage-investment-count-chart-layout">
          <div className="recharts-wrapper">
            <ContentLoader
              width={290}
              height={290}
              viewBox="0 0 290 290"
              backgroundColor="#4ADCB3"
              foregroundColor="#ffffff"
            >
              <path d="M0 145C0 65.9211 63.3037 1.62758 142 0.0303955V15.0339C71.5887 16.6283 15 74.2057 15 145C15 216.797 73.203 275 145 275C216.129 275 273.916 217.875 274.985 147H289.986C288.916 226.159 224.414 290 145 290C64.9187 290 0 225.081 0 145ZM289.946 141C287.854 63.7639 225.365 1.60056 148 0.0303955V15.0339C217.08 16.5982 272.856 72.049 274.94 141H289.946Z" />
            </ContentLoader>
          </div>
          <section>
            <ContentLoader
              width={120}
              height={60}
              viewBox="0 0 120 60"
              backgroundColor="#ddd"
              foregroundColor="#ffffff"
            >
              <rect x="0" y="0" rx="4" ry="4" width="120" height="30" />
              <rect x="30" y="45" rx="4" ry="4" width="60" height="15" />
            </ContentLoader>
          </section>
        </div>
        <div className="web-manage-investment-count-chart-labels">
          <ContentLoader
            width={600}
            height={14}
            viewBox="0 0 600 14"
            backgroundColor="#ddd"
            foregroundColor="#ffffff"
          >
            <rect x="0" y="0" rx="4" ry="4" width="120" height="14" />
            <rect x="260" y="0" rx="4" ry="4" width="120" height="14" />
          </ContentLoader>
        </div>
      </div>
      <div className="web-manage-investment-count-detail">
        <article>
          <label>Total Staking NAV</label>
          <ContentLoader
            width={200}
            height={40}
            viewBox="0 0 200 40"
            backgroundColor="#eaeced"
            foregroundColor="#ffffff"
          >
            <rect x="0" y="5" rx="4" ry="4" width="200" height="30" />
          </ContentLoader>
        </article>
        <ContentLoader
          width={200}
          height={45}
          viewBox="0 0 200 45"
          backgroundColor="#eaeced"
          foregroundColor="#ffffff"
        >
          <rect x="0" y="0" rx="4" ry="4" width="150" height="30" />
        </ContentLoader>
        <section>
          <SectionItem label="Net Asset Value" loading={true} />

          <SectionItem label="Current Share Price" loading={true} />

          <SectionItem
            label="Shares Holding"
            popper="Shares Holding includes a total of  Shares in your wallet, withholding from vaults, or staked in the mining pool"
            loading={true}
          />
          <SectionItem label="Epoch Beginning Share Price" loading={true} />
          {/* <SectionItem
            label="Fund AUM"
            popper="Fund's AUM, update after settlement"
            loading={true}
          /> */}
        </section>
      </div>
    </div>
  )
}
interface CountProps {
  loading: boolean
  data: VaultUserListDataProps[]
}
const Count: FC<CountProps> = ({ loading, data }) => {
  // const { loading, fundList } = useUserFundList()
  // const { data: baseTokenPriceList, isLoading } = useBaseTokenPriceUSD()
  if (loading) return <CountLoading />
  return (
    <>
      <CountDetail {...{ loading, data }} />
    </>
  )
}

const CountDetail: FC<CountProps> = ({ loading, data }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [userPoint, setUserPoint] = useState(0)
  const rawData = useMemo(
    () =>
      data.map(({ base, userDetail }) => ({
        name: base.underlying.name,
        // value: data.shares || data.navInUSD,
        value: userDetail.navInUSD === 0 ? 0.0001 : userDetail.navInUSD, // 使用非常小的值代替 0
        nav: userDetail.navInUSD
      })),
    [data]
  )

  const totalAsset = useMemo(
    () => rawData.map(({ nav }) => nav).reduce((a, b) => a + b, 0),
    [rawData]
  )
  const activeData = useMemo(() => data[activeIndex]?.userDetail, [data, activeIndex])
  const activeDetail = useMemo(() => data[activeIndex]?.detail, [data, activeIndex])
  const baseToken = useMemo(() => activeData?.underlying, [activeData])
  // console.log(data, rawData)
  const pieData = useMemo(
    () =>
      rawData
        // .filter((item) => item.value !== 0)
        .map((item) => {
          const p = Math.round(BN(item.value).div(totalAsset).times(100).toNumber())
          return {
            ...item,
            percent: `${isNaN(p) || p === Infinity || p === -Infinity ? 0 : p}%`
          }
        }),
    [rawData, totalAsset]
  )

  const onPieClick = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const COLORS = [
    '#BF99FF',
    '#4ADCB3',
    '#FFB663',
    '#A7BFFF',
    '#985EFF',
    '#13BC8B',
    '#FEA036',
    '#467AFF'
  ]
  // console.log(pieData, 'pieData')
  const navInUSD = useMemo(() => {
    const v = data[activeIndex].userDetail.navInUSD
    if (v >= 0.01 || v === 0) {
      return formatNumber(v, 2, '$0,0.00')
    } else {
      return '< $0.01'
    }
  }, [data, activeIndex])

  const { account } = useProfile()
  const getUserPointData = useCallback(async () => {
    const vid = data[activeIndex].detail.address
    const res = await getUserPoint(account ?? '', vid)
    setUserPoint(res.points ?? 0)
  }, [activeIndex, account, data])
  useEffect(() => {
    getUserPointData()
  }, [getUserPointData])
  return (
    <div className="web-manage-investment-count">
      <div className="web-manage-investment-count-chart">
        <div className="web-manage-investment-count-chart-layout">
          <PieChart width={300} height={300}>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={pieData}
              innerRadius={130}
              outerRadius={145}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              startAngle={90}
              endAngle={450}
              minAngle={5}
              labelLine={false}
              // label={renderCustomizedLabel}
              onClick={onPieClick}
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <section>
            <em>{navInUSD}</em>
            <span>{pieData[activeIndex]?.percent}</span>
          </section>
        </div>
        <div className="web-manage-investment-count-chart-labels">
          <ul>
            {pieData.map(({ name }, index) => (
              <li
                key={`${name}-${index}`}
                onClick={() => setActiveIndex(index)}
                className={classNames({ active: activeIndex === index })}
              >
                <i style={{ background: COLORS[index % COLORS.length] }} />
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="web-manage-investment-count-detail">
        <article>
          <label>Total Staking </label>
          <em>{formatNumber(totalAsset, 2, '$0,0.00')}</em>
        </article>
        <h3>{data[activeIndex].base.underlying.name}</h3>
        <section>
          <SectionItem label="Staking Value" loading={loading} short>
            <TokenValue value={activeData.nav} token={baseToken} size="mini" format="0,0.00" />
            {/*{formatNumber(data[activeIndex].data.nav, 2, '$0,0.00')}*/}
          </SectionItem>
          <SectionItem label="Current Share Price" short>
            <TokenValue
              value={activeData.sharePrice}
              token={baseToken}
              size="mini"
              format="0,0.00"
            />
            {/*{formatNumber(activeData.sharePrice, 2, '$0,0.00')}*/}
          </SectionItem>
          {/* <SectionItem label="Fund AUM" popper="Fund's AUM, update after settlement">
            <TokenValue value={activeData.aum} token={baseToken} size="mini" format="0,0.00" />
            {/*{formatNumber(activeData.aum, 2, '$0,0.00')}
          </SectionItem> */}
          <SectionItem
            label="Shares Holding"
            short
            popper="Shares Holding includes a total of  Shares in your wallet, Unstaking from vaults."
          >
            <TokenValue
              value={activeData.shares}
              token={baseToken}
              shares
              noUnit
              size="mini"
              format="0,0.00"
            />
            {/* {formatNumber(activeData.shares, 2, '0,0.00')} */}
          </SectionItem>
          <SectionItem label="Epoch Beginning Share Price" short>
            <TokenValue
              // value={BN(activeData.aum).div(activeData.shares).toNumber()}
              value={activeDetail.beginningSharePrice}
              // value={BN(activeData.aum).div(activeData.shares).toNumber()}
              token={baseToken}
              size="mini"
              format="0,0.00"
            />
          </SectionItem>
        </section>
        <Blank size="medium" />
        <h3>Additional Rewards</h3>
        <section>
          <SectionItem
            label="Rings earned"
            loading={loading}
            popper="Staking this vault can earn Rings"
            short
          >
            <Tag type="dark" icon="icon/bring.svg" name="Rings" />
            <TokenValue value={userPoint} size="mini" noUnit format="0,0.00" />
          </SectionItem>
        </section>
      </div>
    </div>
  )
}

export default Count
