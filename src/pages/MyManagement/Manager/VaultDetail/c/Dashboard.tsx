import { FC, useState, useMemo } from 'react'

import TimeSelect from '@@/core/ChartTimeSelect'
import { AreaChart } from '@/components/common/Chart'
import Loading from '@@/common/Loading'
import TokenValue, { formatTokenValueString } from '@@/common/TokenValue'
import Select from '@@/common/Form/Select'

import { calcVaultDatasGql } from '@/graphql/calcGql'
import { useVaultData } from '@/graphql/useData'

import { VaultBaseInfoProps, VaultDetailProps } from '@/types/vault'
import { AddressType } from '@/types/base'

interface Props {
  vaultAddress: AddressType
  data: VaultDetailProps
  base: VaultBaseInfoProps
  loading: boolean
}

const Dashboard: FC<Props> = ({ vaultAddress, data, base, loading }) => {
  const [timeType, setTimeType] = useState<string>('DAY')
  const [chartType, setChartType] = useState<number | string>('nav')

  const baseToken = useMemo(() => data.underlyingToken, [data.underlyingToken])
  const areaValueFormatStr = useMemo(
    () => formatTokenValueString('a0,0.00', baseToken.precision),
    [baseToken.precision]
  )
  const gql = useMemo(
    () => calcVaultDatasGql(vaultAddress, timeType, ~~(base.createTime / 1000)),
    [vaultAddress, timeType, base.createTime]
  )
  const { loading: chartLoading, data: chartData } = useVaultData(
    gql,
    baseToken.decimals,
    baseToken.precision
  )
  console.log(123, data)
  if (loading) {
    return (
      <div className="web-manage-manager-dashboard">
        <header>
          <h4>Net Asset Value</h4>
          <em>
            <TokenValue value={0} token={baseToken} format="0,0.00" />
          </em>
        </header>
        <TimeSelect
          value={timeType}
          onChange={(val) => setTimeType(val)}
          startTime={base.createTime}
        />
        <div className="web-manage-manager-dashboard-chart">
          <AreaChart
            data={[]}
            xKey="time"
            yKey="value"
            chartId="defi"
            yLabel="NAV"
            valueDecimal={baseToken.precision}
            valueFormatStr={areaValueFormatStr}
          />
        </div>
        <Loading type="float" show={true} />
      </div>
    )
  }

  return (
    <div className="web-manage-manager-dashboard">
      <header>
        <h4>{chartType === 'nav' ? 'Net Asset Value' : 'Share Price'}</h4>
        <em>
          <TokenValue
            value={chartType === 'nav' ? data.nav : data.sharePrice}
            token={baseToken}
            format="0,0.00"
          />
        </em>
      </header>
      <TimeSelect
        value={timeType}
        onChange={(val) => setTimeType(val)}
        startTime={base.createTime}
      />
      <Select
        mini
        value={chartType}
        onChange={setChartType}
        objOptions={[
          { label: 'NAV', value: 'nav' },
          { label: 'Share Price', value: 'price' }
        ]}
      />
      <div className="web-manage-manager-dashboard-chart">
        <AreaChart
          data={chartData ?? []}
          xKey="time"
          yKey={chartType === 'nav' ? 'value' : 'price'}
          chartId="defi"
          yLabel={chartType === 'nav' ? 'NAV' : 'Share Price'}
          valueDecimal={baseToken.precision}
          valueFormatStr={areaValueFormatStr}
        />
      </div>
      <Loading type="float" show={loading || chartLoading} />
    </div>
  )
}

export default Dashboard
