import React, { FC, useState } from 'react'

import { useManagerFundData } from '@/graphql/useData'
import { formatNumber } from '@/utils/tools'
import { useProfile } from '@/hooks/useProfile'

import TimeSelect from '@@/common/Chart/TimeSelect'
import { AreaChart } from '@/components/common/Chart'
import Loading from '@@/common/Loading'

const Chart: FC = () => {
  const { account: address } = useProfile()
  const [timeType, setTimeType] = useState<string>('ALL')

  const { loading, data, count } = useManagerFundData(address ?? '', timeType)
  // console.log(data)
  return (
    <section className="web-manage-manager-chart">
      <Loading show={loading} type="float" />
      <header>
        <label>Total NAV</label>
        <em>{formatNumber(count, 2, '$0,0.00')}</em>
        <TimeSelect value={timeType} onChange={(val) => setTimeType(val)} />
      </header>
      <main>
        <AreaChart data={data} xKey="time" yKey="value" chartId="defi" yLabel="NAV" valueFormatStr="$0,0.00" />
      </main>
    </section>
  )
}

export default Chart
