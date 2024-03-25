import { FC, useState, useMemo, memo } from 'react'
import { min } from 'lodash'
import { formatNumber } from '@/utils/tools'
import { useManageVaultListHook } from '@/hooks/Contracts/useVaultList'

import TimeSelect from '@@/core/ChartTimeSelect'
import { AreaChart } from '@/components/common/Chart'
import Loading from '@@/common/Loading'

import { useProfile } from '@/hooks/useProfile'
import { calcManageVaultDatasGql } from '@/graphql/calcGql'
import { useManageValutDatas } from '@/graphql/useData'

const Chart: FC = () => {
  const { account } = useProfile()
  const [timeType, setTimeType] = useState<string>('DAY')
  const { manageVaultList = [] } = useManageVaultListHook()
  const startTime = useMemo(
    () => min(manageVaultList.map((item) => item.createTime)),
    [manageVaultList]
  )
  const gql = useMemo(
    () => calcManageVaultDatasGql(account ?? '0x', timeType, startTime ?? 0),
    [account, timeType, startTime]
  )

  const { loading, data, count } = useManageValutDatas(gql)
  // console.log(11, data)
  if (manageVaultList.length === 0) {
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
