import React, { FC, useMemo } from 'react'
import classNames from 'classnames'
// import { last, lastIndexOf } from 'lodash'
import BN from 'bignumber.js'

import { formatNumber } from '@/utils/tools'

import Image from '@/components/common/Image'
import { AreaChart } from '@/components/common/Chart'

interface Props {
  name: string
  subName: string
  yLabel?: string
  icon: string
  data: Record<string, any>[]
}
const Charts: FC<Props> = ({ name, subName, icon, data, yLabel = 'TVL' }) => {
  const amplitude = useMemo(() => {
    if (data.length < 2) return 0
    const dL = data.length
    const lV = data[dL - 1].value
    const yV = data[dL - 2].value
    return Number(formatNumber(BN(lV).minus(yV).div(yV).times(100).toNumber(), 2, '0.00'))
    // const lV = last(data)
    // console.log(last(data), lastIndexOf(data, 1))
  }, [data])
  return (
    <section className="web-fund-charts-item">
      <main>
        <h3>
          <Image src={icon} />
          {name}
        </h3>
        <p>{subName}</p>
        <em className={classNames({ up: amplitude >= 0, down: amplitude < 0 })}>{Math.abs(amplitude)}%</em>
      </main>
      <aside>
        <AreaChart data={data} xKey="time" yKey="value" chartId="defi" yLabel={yLabel} />
      </aside>
    </section>
  )
}

export default Charts
