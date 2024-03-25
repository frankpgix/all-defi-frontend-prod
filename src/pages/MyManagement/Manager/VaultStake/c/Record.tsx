import { FC } from 'react'

import BN from 'bignumber.js'
import Table from 'rc-table'

import { TokenTypes } from '@/types/base'
import { VaultStakeProps } from '@/types/vault'

import { formatNumber } from '@/utils/tools'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'

interface Props {
  stakeData: VaultStakeProps
  multiple: number
  loading: boolean
  underlyingToken: TokenTypes
}
// 这里是有问题的
const Record: FC<Props> = ({ stakeData, multiple, loading, underlyingToken }) => {
  // console.log(underlyingToken)
  const webColumns = [
    {
      title: 'ALL Token Staked Amount',
      dataIndex: 'stakedALL',
      render: (value: number) => formatNumber(value, 2, '0,0.00')
    },
    {
      title: 'Updated Max AUM Limit',
      dataIndex: 'stakedALL',
      render: (value: number) => {
        const num = BN(value).times(multiple).toNumber()
        return <TokenValue value={num} token={underlyingToken} size="mini" format="0,0.00" />
      }
    }
  ]

  return (
    <Table
      className="web-buy-table"
      columns={webColumns}
      emptyText={loading ? <TableLoading /> : <TableNoData />}
      data={[stakeData]}
      rowKey="value"
    />
  )
}

export default Record
