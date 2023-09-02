import React, { FC, useState, useMemo, memo } from 'react'
import { min } from 'lodash'
import { formatNumber } from '@/utils/tools'
import { useManageFundList } from '@/hooks/useFund'

import TimeSelect from '@@/core/ChartTimeSelect'
import { AreaChart } from '@/components/common/Chart'
import Loading from '@@/common/Loading'

import { useProfile } from '@/hooks/useProfile'
import { calcManageFundDatasGql } from '@/gql/gqls'
import { useManageFundDatas } from '@/gql/useData'

const Chart: FC = () => {
  const { account } = useProfile()
  const [timeType, setTimeType] = useState<string>('DAY')
  const { manageFundList = [] } = useManageFundList()
  const startTime = useMemo(
    () => min(manageFundList.map((item) => item.createTime)),
    [manageFundList]
  )
  const gql = useMemo(
    () => calcManageFundDatasGql(account, timeType, startTime ?? 0),
    [account, timeType, startTime]
  )

  const { loading, data, count } = useManageFundDatas(gql)

  if (manageFundList.length === 0) {
    return (
      <section className="web-manage-manager-chart">
        <Loading show={true} type="float" />
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
            data={[]}
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
