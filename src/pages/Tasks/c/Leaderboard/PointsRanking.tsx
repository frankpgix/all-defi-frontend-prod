// Allocation
import { FC } from 'react'

import Table from 'rc-table'

import HashLink from '@@/common/HashLink'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'

const PointsRanking: FC = () => {
  const webColumns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      width: 100
    },

    {
      title: 'Address',
      dataIndex: 'address',
      render: (value: string) => <HashLink address={value} nolink />
    },
    {
      title: 'Total Points',
      dataIndex: 'total',
      width: 200,
      render: (value: number) => value
    }
  ]

  const data = [...new Array(10)].map((_, index) => ({
    rank: index + 1,
    address: '0x1234567890123456789012345678901234567890',
    total: 1234
  }))
  // console.log(1211, data)
  return (
    <Table
      className="web-buy-table"
      columns={webColumns}
      emptyText={false ? <TableLoading /> : <TableNoData />}
      data={data}
      rowKey="hash"
    />
  )
}

export default PointsRanking
