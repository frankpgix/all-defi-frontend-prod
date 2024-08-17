// Allocation
import { FC } from 'react'

import dayjs from 'dayjs'
import Table from 'rc-table'

import { useVaultAllocationData } from '@/graphql/useFundData'
// import { formatNumber } from '@/utils/tools'
import HashLink from '@@/common/HashLink'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'

interface Props {
  vaultAddress: string
}

const Allocation: FC<Props> = ({ vaultAddress }) => {
  const webColumns = [
    {
      title: '# Hash',
      dataIndex: 'hash',
      render: (value: string) => <HashLink address={value} suffixLength={16} prefixLength={16} />
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (value: number, row: any) => (
        <TokenValue value={value} token={row.token} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Action',
      dataIndex: 'action'
    },
    {
      title: 'Address',
      dataIndex: 'investor',
      render: (value: string) => <HashLink address={value} />
    },
    {
      title: 'Time',
      dataIndex: 'time',
      render: (value: number) => dayjs(value).format('MMM DD, YYYY hh:mm:ss A')
    }
  ]

  const { loading, data } = useVaultAllocationData(vaultAddress)
  console.log(1211, data)
  return (
    <Table
      className="web-buy-table"
      columns={webColumns}
      emptyText={loading ? <TableLoading /> : <TableNoData />}
      data={data}
      rowKey="hash"
    />
  )
}

export default Allocation
