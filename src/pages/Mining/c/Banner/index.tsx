import React, { FC, useState, useEffect } from 'react'
import { last } from 'lodash'
import { sum, formatNumber } from '@/utils/tools'
import { useMiningData } from '@/graphql/useData'

import DataItem from '@@/common/DataItem'
import TimeSelect from '@@/common/Chart/TimeSelect'

import Chart from './Chart'
import Counts from './Counts'

const Banner: FC = () => {
  const [timeType, setTimeType] = useState<string>('DAY')
  const [total, setTotal] = useState(0)
  const { data: chartData = [], loading: chartLoading } = useMiningData(timeType)
  console.log(chartData)
  // const { data } = useMiningTotalData()
  useEffect(() => {
    if (timeType === 'DAY') {
      const o = last(chartData)
      if (o) {
        const totalSum = sum(
          Object.keys(o).map((key: string) => {
            if (key !== 'time') return o[key]
            return 0
          })
        )
        setTotal(totalSum)
      }
    }
  }, [timeType, chartData])
  return (
    <section className="web-mining-banner-layout">
      <div className="web-mining-banner-chart">
        <header>
          <DataItem label="Total Staked value">
            <em>{formatNumber(total, 2, '$0,0.00')}</em>
          </DataItem>
          <TimeSelect value={timeType} onChange={(val) => setTimeType(val)} />
        </header>
        <section>
          <Chart data={chartData} loading={chartLoading} />
        </section>
      </div>
      <Counts totalStakeValue={total} />
    </section>
  )
}

export default Banner
