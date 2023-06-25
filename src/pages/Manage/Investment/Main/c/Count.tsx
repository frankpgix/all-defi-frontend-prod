import React, { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import classNames from 'classnames'
import { FundUserListDataProps } from '@/class/help'
import { formatNumber } from '@/utils/tools'
import { PieChart, Pie, Cell, Sector } from 'recharts'
import NoData from '@@/common/NoData'
import TokenValue from '@@/common/TokenValue'
import { getTokenByAddress } from '@/config/tokens'

import { SectionItem } from '@@/web/Section'
interface Props {
  data: FundUserListDataProps[]
}

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

const Count: FC<Props> = ({ data }) => {
  // console.log(1122233, data)
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
  const activeData = useMemo(() => data[activeIndex].data, [data, activeIndex])
  const baseToken = useMemo(() => getTokenByAddress(activeData.baseToken), [activeData])

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

  if (data.length === 0) {
    return (
      <div className="web-manage-investment-dashboard">
        <NoData show />
      </div>
    )
  }

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
          <label>Total Fund NAV</label>
          <em>{formatNumber(totalAsset, 2, '$0,0.00')}</em>
        </article>
        <h3>{data[activeIndex].name}</h3>
        <section>
          <SectionItem label="Fund NAV">
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
          <SectionItem label="Fund AUM">
            <TokenValue value={activeData.aum} token={baseToken} size="mini" format="0,0.00" />
            {/*{formatNumber(activeData.aum, 2, '$0,0.00')}*/}
          </SectionItem>
          <SectionItem
            label="Shares Holding"
            popper="Shares Holding includes a total of Fund Shares in your wallet, redeemable from AllDefi, and staked in the mining pool"
          >
            {formatNumber(activeData.shares, 2, '0,0.00')}
          </SectionItem>
        </section>
      </div>
    </div>
  )
}

export default Count
