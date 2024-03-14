import { FC, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import dayjs from 'dayjs'
import { formatNumber } from '@/utils/tools'

interface Props {
  data: any[]
  chartId: string
  xKey: string
  yKey: string
  yLabel: string
  timeFormatStr?: string
  valueFormatStr?: string
  valueDecimal?: number
  valueSuffix?: string
  className?: string
  loading?: boolean
}

const AreaC: FC<Props> = ({
  chartId,
  data,
  xKey,
  yKey,
  yLabel,
  timeFormatStr = 'MMM DD, YYYY HH:mm:ss',
  valueDecimal = 2,
  valueFormatStr = 'a0,0.00',
  valueSuffix,
  className,
  loading
}) => {
  const formatTime = (time: number) => {
    return dayjs(time).format(timeFormatStr)
  }
  const formatTip = (value: number) => [
    `${formatNumber(value, valueDecimal, valueFormatStr)} ${valueSuffix ? valueSuffix : ''}`,
    yLabel
  ]
  const toolTipStyle = {
    borderWidth: 0,
    backgroundColor: '#1036E6',
    color: '#fff',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
    fontSize: '14px'
  }
  // const isZeroData = useMemo(
  //   () => !Boolean(data.find((item: any) => item[yKey] !== 0)),
  //   [data, yKey]
  // )
  // const isLoading = useMemo(() => loading || data.length < 2 || isZeroData, [loading, data.length, isZeroData])

  const isLoading = useMemo(() => loading || data.length < 2, [loading, data.length])
  const initData = JSON.parse(
    `[{"${xKey}": 0, "${yKey}": 0.5}, {"${xKey}": 0, "${yKey}": 0.9}, {"${xKey}": 0, "${yKey}": 0.1}, {"${xKey}": 0, "${yKey}": 0.5}]`
  )

  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <AreaChart
        data={isLoading ? initData : data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
        <defs>
          <linearGradient id={chartId} x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="5%" stopColor={isLoading ? '#E1E1E1' : '#A7BFFF'} stopOpacity={0.3} />
            <stop offset="95%" stopColor="#A7BFFF" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <XAxis dataKey={xKey} hide />
        <YAxis
          dataKey={yKey}
          hide
          domain={[(dataMin: number) => dataMin * 0.9, (dataMax: number) => dataMax * 1.1]}
        />
        {!isLoading && (
          <Tooltip
            formatter={formatTip}
            labelFormatter={formatTime}
            contentStyle={toolTipStyle}
            isAnimationActive={true}
            position={{ y: 10 }}
            itemStyle={{ color: '#fff' }}
          />
        )}
        <Area
          type="monotone"
          dataKey={yKey}
          stroke={isLoading ? '#efefef' : '#1137E6'}
          fillOpacity={1}
          strokeWidth={2}
          fill={`url(#${chartId})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
// 2px solid #1137E6
export default AreaC
