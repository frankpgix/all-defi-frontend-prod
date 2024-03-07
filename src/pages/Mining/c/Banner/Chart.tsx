import { FC, useMemo, memo } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import dayjs from 'dayjs'
import { last } from 'lodash'
// import utc from 'dayjs/plugin/utc'
import { formatNumber } from '@/utils/tools'
// dayjs.extend(utc)

const toPercent = (decimal: number, fixed = 0) => `${(decimal * 100).toFixed(fixed)}%`

const renderTooltipContent = (o: any) => {
  const { payload, label } = o
  return (
    <div className="chart-tooltip-content">
      <time>{dayjs(label).format('MMM.DD.YYYY HH:mm')}</time>
      <ul>
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`}>
            <label>
              <i style={{ background: entry.color }} />
              {entry.name}
            </label>
            <strong>{formatNumber(entry.value, 2, '$0.00')}</strong>
          </li>
        ))}
      </ul>
    </div>
  )
}

const colors = ['#7B39F3', '#4ADCB3', '#FF7701', '#1036E6', '#FEA036', '#7FA2FF', '#467AFF']

interface Props {
  data: Record<string, any>[]
  loading: boolean
}

const Chart: FC<Props> = ({ data, loading }) => {
  const areaKeys = useMemo(() => {
    if (!data.length) return []
    return Object.keys(last(data) ?? {}).filter((item) => item !== 'time')
  }, [data])

  loading = loading || areaKeys.length === 0
  // console.log(data, areaKeys)
  const initData = JSON.parse(
    `[{"time": 1, "x": 0.5}, {"time": 2, "x": 1}, {"time": 3, "x": 0.5}, {"time": 4, "x":1}]`
  )
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={loading ? initData : data}
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0
        }}
      >
        <defs>
          <linearGradient id="love" x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="5%" stopColor="#E1E1E1" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        {colors.map((color: string) => (
          <defs key={color}>
            <linearGradient id={color.replace('#', '')} x1="0" y1="0" x2="0.5" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0.1} />
            </linearGradient>
          </defs>
        ))}

        <XAxis dataKey="time" hide />
        <YAxis
          tickFormatter={toPercent}
          hide
          domain={[(dataMin: number) => dataMin * 0.9, (dataMax: number) => dataMax * 1.1]}
        />
        {!loading && data.length && <Tooltip content={renderTooltipContent} active />}
        {areaKeys.map((key, index) => {
          const color = colors[index % 4]
          // console.log(color, 'color')
          return (
            <Area
              type="monotone"
              key={key}
              stroke={color}
              dataKey={key}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(${color})`}
            />
          )
        })}
        {loading && (
          <Area
            type="monotone"
            stroke={'#efefef'}
            dataKey="x"
            strokeWidth={2}
            fill={`url(#love)`}
          />
        )}
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default memo(Chart)
