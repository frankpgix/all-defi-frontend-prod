import React, { FC } from 'react'
import Table from 'rc-table'
import BN from 'bignumber.js'

import { FundDetailProps, FundStakeProps } from '@/class/help'

import { formatNumber } from '@/utils/tools'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'

interface Props {
  data: FundStakeProps
  fundData: FundDetailProps
  multiple: number
  loading: boolean
  baseToken: any
}
// 这里是有问题的
const Record: FC<Props> = ({ data, multiple, loading, baseToken }) => {
  console.log(baseToken)
  const webColumns = [
    {
      title: 'ALL Token Staked Amount',
      dataIndex: 'stakeAmount',
      render: (value: number) => formatNumber(value, 2, '0,0.00')
    },
    {
      title: 'Updated Fund Max AUM Limit',
      dataIndex: 'stakeAmount',
      render: (value: number) => {
        const num = BN(value).times(multiple).toNumber()
        return <TokenValue value={num} token={baseToken} size="mini" format="0,0.00" />
      }
    }
  ]

  return (
    <Table
      className="web-buy-table"
      columns={webColumns}
      emptyText={loading ? <TableLoading /> : <TableNoData />}
      data={[data]}
      rowKey="valueInUSD"
    />
  )
}

export default Record
