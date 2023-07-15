import React, { FC } from 'react'
import Table from 'rc-table'
import dayjs from 'dayjs'

import { useFundRedeemsData } from '@/graphql/useFundData'
// import { formatNumber } from '@/utils/tools'
import HashLink from '@@/common/HashLink'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'

interface Props {
  fundAddress: string
}

const Redemption: FC<Props> = ({ fundAddress }) => {
  const webColumns = [
    {
      title: '# Hash',
      dataIndex: 'hash',
      render: (value: string) => <HashLink address={value} suffixLength={16} prefixLength={16} />
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      // render: (value: number) => <span>{formatNumber(value, 2, '0,0.00')} USDC</span>
      render: (value: number, row: any) => <TokenValue value={value} token={row.token} size="mini" format="0,0.00" />
    },
    {
      title: 'Address',
      dataIndex: 'investor',
      render: (value: string) => <HashLink address={value} />
    },
    {
      title: 'Time',
      dataIndex: 'timestamp',
      render: (value: number) => dayjs(value).format('MMM DD, YYYY hh:mm:ss A')
    }
  ]

  const { loading, data } = useFundRedeemsData(fundAddress)

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

export default Redemption
