import React, { FC, useState, useMemo, memo } from 'react'
import { min } from 'lodash'
import { useManagerFundData } from '@/graphql/useData'
import { formatNumber } from '@/utils/tools'
// import { useProfile } from '@/hooks/useProfile'
import { useManageFundList } from '@/hooks/useFund'

import TimeSelect from '@@/core/ChartTimeSelect'
import { AreaChart } from '@/components/common/Chart'
import Loading from '@@/common/Loading'

import { calcManageFundDetailData } from '@/graphql/calcGql'

const Chart: FC = () => {
  const [timeType, setTimeType] = useState<string>('DAY')
  // const time = useMemo(() => timeType, [timeType])
  const { manageFundFist = [] } = useManageFundList()
  const funds = useMemo(() => manageFundFist.map((item) => item.address), [manageFundFist])
  const startTime = useMemo(
    () => min(manageFundFist.map((item) => item.createTime)),
    [manageFundFist]
  )
  const gql = useMemo(
    () => calcManageFundDetailData(JSON.stringify(funds), timeType, startTime ?? 0),
    [funds, timeType, startTime]
  )
  console.log(gql)
  // const fundsAddress = useMemo(() => manageFundFist.map((item) => item.address), [manageFundFist])
  // console.log(manageFundFist, startTime)

  const { loading, data, count } = useManagerFundData(gql, manageFundFist, startTime ?? 0, timeType)
  // const { loading, data, count } = { loading: true, data: [], count: 0 }
  return (
    <section className="web-manage-manager-chart">
      <Loading show={loading} type="float" />
      <header>
        <label>Total NAV</label>
        <em>{formatNumber(count, 2, '$0,0.00')}</em>
        <TimeSelect
          value={timeType}
          onChange={(val) => setTimeType(val)}
          startTime={startTime ?? 0}
        />
      </header>
      <main>
        <AreaChart
          data={data}
          xKey="time"
          yKey="value"
          chartId="defi"
          yLabel="NAV"
          valueFormatStr="$0,0.00"
        />
      </main>
    </section>
  )
}

export default memo(Chart)
