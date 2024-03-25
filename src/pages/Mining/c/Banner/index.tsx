import { FC, useState, useEffect, useMemo, useCallback } from 'react'
import { last, min } from 'lodash'
import { sum, formatNumber } from '@/utils/tools'
import { useMiningData } from '@/graphql/useData'
import { calcMiningData } from '@/graphql/calcGql'

import DataItem from '@@/common/DataItem'
import TimeSelect from '@@/core/ChartTimeSelect'
import { useVaultList } from '@/hooks/Contracts/useVaultList'
import Chart from './Chart'
import Counts from './Counts'

const Banner: FC<{ loading: boolean; stakeSharesValue: number }> = ({
  loading,
  stakeSharesValue
}) => {
  const [timeType, setTimeType] = useState<string>('DAY')
  const [total, setTotal] = useState(0)

  const { vaultList, loading: listLoading } = useVaultList()
  const funds = useMemo(() => vaultList.map((item) => item.address), [vaultList])
  const fundsName = useMemo(() => vaultList.map((item) => item.name), [vaultList])
  const startTime = useMemo(() => min(vaultList.map((item) => item.createTime)), [vaultList])

  const gql = useMemo(
    () => calcMiningData(JSON.stringify(funds), timeType, startTime ?? 0),
    [funds, timeType, startTime]
  )
  const { data: chartData, loading: chartLoading } = useMiningData(gql, fundsName, timeType)
  // console.log('chartData', chartData)
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
        setTotal(totalSum)
      }
    }
  }, [timeType, chartDataStr])

  useEffect(() => {
    void setTotalFunc()
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
          <Chart data={chartData} loading={listLoading || chartLoading} />
        </section>
      </div>
      <Counts
        totalStakeValue={total}
        stakeSharesValue={stakeSharesValue}
        loading={chartLoading || loading}
      />
    </section>
  )
}

export default Banner
