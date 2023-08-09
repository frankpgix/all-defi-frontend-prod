import React, { FC, useState, useEffect, useMemo, useCallback } from 'react'
import { last, min } from 'lodash'
import { sum, formatNumber } from '@/utils/tools'
import { useMiningData } from '@/graphql/useData'
import { calcMiningData } from '@/graphql/calcGql'

import DataItem from '@@/common/DataItem'
import TimeSelect from '@@/core/ChartTimeSelect'
import { useFundList } from '@/hooks/useFund'
import Chart from './Chart'
import Counts from './Counts'

const Banner: FC = () => {
  const [timeType, setTimeType] = useState<string>('DAY')
  const [total, setTotal] = useState(0)
  // const { data: chartData = [], loading: chartLoading } = useMiningData(timeType)
  // const { chartData, loading: chartLoading } = { chartData: [], loading: true }
  // console.log(chartData)
  const { fundList, loading } = useFundList()
  const funds = useMemo(() => fundList.map((item) => item.address), [fundList])
  const fundsName = useMemo(() => fundList.map((item) => item.name), [fundList])
  const startTime = useMemo(() => min(fundList.map((item) => item.createTime)), [fundList])

  const gql = useMemo(
    () => calcMiningData(JSON.stringify(funds), timeType, startTime ?? 0),
    [funds, timeType, startTime]
  )
  // console.log(gql.loc?.source.body)
  const { data: chartData, loading: chartLoading } = useMiningData(gql, fundsName, timeType)
  const chartDataStr = useMemo(() => JSON.stringify(chartData), [chartData])
  const setTotalFunc = useCallback(async () => {
    if (timeType === 'DAY') {
      const o = last(chartData)
      if (o) {
        const totalSum = sum(
          Object.keys(o).map((key: string) => {
            if (key !== 'time') return o[key]
            return 0
          })
        )
        console.log(totalSum)
        setTotal(totalSum)
      }
    }
  }, [timeType, chartDataStr])
  console.log(chartData)
  // const { data } = useMiningTotalData()
  useEffect(() => {
    void setTotalFunc()
    // if (timeType === 'DAY') {
    //   const o = last(chartData)
    //   if (o) {
    //     const totalSum = sum(
    //       Object.keys(o).map((key: string) => {
    //         if (key !== 'time') return o[key]
    //         return 0
    //       })
    //     )
    //     setTotal(totalSum)
    //   }
    // }
  }, [setTotalFunc])
  // return null
  return (
    <section className="web-mining-banner-layout">
      <div className="web-mining-banner-chart">
        <header>
          <DataItem label="Total Staked value">
            <em>{formatNumber(total, 2, '$0,0.00')}</em>
          </DataItem>
          <TimeSelect
            value={timeType}
            onChange={(val) => setTimeType(val)}
            startTime={startTime ?? 0}
          />
        </header>
        <section>
          <Chart data={chartData} loading={loading || chartLoading} />
        </section>
      </div>
      <Counts totalStakeValue={total} />
    </section>
  )
}

export default Banner
