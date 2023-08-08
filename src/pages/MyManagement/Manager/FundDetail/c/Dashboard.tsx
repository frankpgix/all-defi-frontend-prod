import React, { FC, useState, useMemo } from 'react'

import { useFundData } from '@/graphql/useData'
import { calcFundDatasGql } from '@/graphql/calcGql'
// import { formatNumber } from '@/utils/tools'
import { getTokenByAddress } from '@/config/tokens'

import { FundDetailProps, FundBaseProps } from '@/class/help'

import TimeSelect from '@@/core/ChartTimeSelect'
import { AreaChart } from '@/components/common/Chart'
import Loading from '@@/common/Loading'
import TokenValue, { formatTokenValueString } from '@@/common/TokenValue'

interface Props {
  fundAddress: string
  data: FundDetailProps
  base: FundBaseProps
}

const Dashboard: FC<Props> = ({ fundAddress, data, base }) => {
  const [timeType, setTimeType] = useState<string>('DAY')
  const baseToken = useMemo(() => {
    return getTokenByAddress(data.baseToken)
  }, [data.baseToken])
  // console.log('chartData', baseToken.precision)
  // const { loading, data: chartData } = useFundHourData(fundAddress, timeType, baseToken.decimals)
  const areaValueFormatStr = useMemo(
    () => formatTokenValueString('a0,0.00', baseToken.precision),
    [baseToken.precision]
  )
  // console.log(areaValueFormatStr)
  const gql = useMemo(
    () => calcFundDatasGql(fundAddress, timeType, ~~(base.createTime / 1000)),
    [fundAddress, timeType, base.createTime]
  )
  const { loading, data: chartData } = useFundData(gql, baseToken.decimals, baseToken.precision)

  // console.log(chartData)
  return (
    <div className="web-manage-manager-dashboard">
      <header>
        <h4>Fund NAV</h4>
        <em>
          <TokenValue value={data.nav} token={baseToken} format="0,0.00" />
        </em>
      </header>
      <TimeSelect
        value={timeType}
        onChange={(val) => setTimeType(val)}
        startTime={base.createTime}
      />
      <div className="web-manage-manager-dashboard-chart">
        <AreaChart
          data={chartData ?? []}
          xKey="time"
          yKey="value"
          chartId="defi"
          yLabel="NAV"
          valueDecimal={baseToken.precision}
          valueFormatStr={areaValueFormatStr}
        />
      </div>
      <Loading type="float" show={loading} />
    </div>
  )
}

export default Dashboard
