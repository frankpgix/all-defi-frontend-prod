import React, { FC, useState, useMemo } from 'react'

import { useFundHourData } from '@/graphql/useFundData'
import { useFundData } from '@/graphql/useData'
// import { formatNumber } from '@/utils/tools'
import { getTokenByAddress } from '@/config/tokens'

import { FundDetailProps, FundBaseProps } from '@/class/help'

import TimeSelect from '@@/common/Chart/TimeSelect'
import { AreaChart } from '@/components/common/Chart'
import Loading from '@@/common/Loading'
import TokenValue, { formatTokenValueString } from '@@/common/TokenValue'

interface Props {
  fundAddress: string
  data: FundDetailProps
  base: FundBaseProps
}

const Dashboard: FC<Props> = ({ fundAddress, data, base }) => {
  const [timeType, setTimeType] = useState<string>('ALL')
  // console.log(base, 'base')
  // console.log('chartData', chartData)
  const baseToken = useMemo(() => {
    return getTokenByAddress(data.baseToken)
  }, [data.baseToken])
  // const { loading, data: chartData } = useFundHourData(fundAddress, timeType, baseToken.decimals)
  const areaValueFormatStr = useMemo(
    () => formatTokenValueString('a0,0.00', baseToken.precision),
    [baseToken.precision]
  )
  const { loading, data: chartData } = useFundData(
    fundAddress,
    timeType,
    baseToken.decimals,
    ~~(base.createTime / 1000)
  )
  return (
    <div className="web-manage-manager-dashboard">
      <header>
        <h4>Fund NAV</h4>
        <em>
          <TokenValue value={data.nav} token={baseToken} format="0,0.00" />
        </em>
      </header>
      <TimeSelect value={timeType} onChange={(val) => setTimeType(val)} />
      <div className="web-manage-manager-dashboard-chart">
        <AreaChart
          data={chartData ?? []}
          xKey="time"
          yKey="value"
          chartId="defi"
          yLabel="NAV"
          valueFormatStr={areaValueFormatStr}
        />
      </div>
      <Loading type="float" show={loading} />
    </div>
  )
}

export default Dashboard
