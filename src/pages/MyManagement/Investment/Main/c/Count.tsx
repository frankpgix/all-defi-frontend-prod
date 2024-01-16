import React, { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import classNames from 'classnames'
import ContentLoader from 'react-content-loader'
// import { FundUserListDataProps } from '@/class/help'
import { formatNumber } from '@/utils/tools'
import { PieChart, Pie, Cell, Sector } from 'recharts'
// import NoData from '@@/common/NoData'
import TokenValue from '@@/common/TokenValue'
import { getTokenByAddress } from '@/config/tokens'
// import Popper from '@@/common/Popper'
import { useUserFundList } from '@/hooks/useFund'

import { SectionItem } from '@/pages/MyManagement/Manager/FundDetail/c/ManageDetail/C'

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
          <label>Total Allocation NAV</label>
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

const Count: FC = () => {
  const { loading, fundList } = useUserFundList()
  if (loading || fundList.length === 0) return <CountLoading />
  return (
    <>
      <CountDetail />
    </>
  )
}
const CountDetail: FC = () => {
  // console.log(1122233, data)
  const { loading, fundList: data } = useUserFundList()

  const [activeIndex, setActiveIndex] = useState(0)
  const rawData = useMemo(
    () =>
      data.map(({ name, data }) => ({
        name,
        // value: data.shares || data.navInUSD,
        value: data.navInUSD,
        nav: data.navInUSD
      })),
    [data]
  )

  const totalAsset = useMemo(
    () => rawData.map(({ nav }) => nav).reduce((a, b) => a + b, 0),
    [rawData]
  )
  const activeData = useMemo(() => data[activeIndex]?.data, [data, activeIndex])
  const baseToken = useMemo(() => getTokenByAddress(activeData?.baseToken), [activeData])

  const pieData = useMemo(
    () =>
      rawData
        .filter((item) => item.value !== 0)
        .map((item) => ({
          ...item,
          percent: `${Math.round(BN(item.value).div(totalAsset).times(100).toNumber())}%`
        })),
    [rawData, totalAsset]
  )

  const onPieClick = (e: any, index: number) => {
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
              minAngle={3}
              labelLine={false}
              // label={renderCustomizedLabel}
              onClick={onPieClick}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <section>
            <em>{formatNumber(data[activeIndex].data.navInUSD, 2, '$0,0.00')}</em>
            <span>{pieData[activeIndex].percent}</span>
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
          <label>Total Allocation </label>
          <em>{formatNumber(totalAsset, 2, '$0,0.00')}</em>
        </article>
        <h3>{data[activeIndex].name}</h3>
        <section>
          <SectionItem label="Allocation Value" loading={loading}>
            <TokenValue value={activeData.nav} token={baseToken} size="mini" format="0,0.00" />
            {/*{formatNumber(data[activeIndex].data.nav, 2, '$0,0.00')}*/}
          </SectionItem>
          <SectionItem label="Current Share Price">
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
            popper="Shares Holding includes a total of  Shares in your wallet, withholding from vaults, or staked in the mining pool"
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
          <SectionItem label="Epoch Beginning Share Price">
            <TokenValue
              // value={BN(activeData.aum).div(activeData.shares).toNumber()}
              value={activeData.beginSharePrice}
              // value={BN(activeData.aum).div(activeData.shares).toNumber()}
              token={baseToken}
              size="mini"
              format="0,0.00"
            />
          </SectionItem>
        </section>
      </div>
    </div>
  )
}

export default Count
