import { FC } from 'react'

import dayjs from 'dayjs'
import Table from 'rc-table'

import { useProfile } from '@/hooks/useProfile'

import { useUserDepositData } from '@/graphql/useFundData'
import { formatNumber } from '@/utils/tools'
import HashLink from '@@/common/HashLink'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'

const History: FC = () => {
  const { account: userAddress } = useProfile()
  const { loading, data } = useUserDepositData(userAddress ?? '')
  console.log(data)
  // useEffect(() => void refetch(), [refetch])
  const webColumns = [
    {
      title: 'Time',
      dataIndex: 'timestamp',
      render: (value: number) => dayjs(value).format('MMM DD, YYYY hh:mm:ss A')
    },
    {
      title: 'Value',
      dataIndex: 'amount',
      render: (value: number, row: any) => `${formatNumber(value, 4, '0,0.0000')} ${row.tokenName}`
    },
    // {
    //   title: 'Projected Rate of Return',
    //   dataIndex: 'lockDuration',
    //   render: () => `20%`
    // },
    {
      title: 'Hash',
      dataIndex: 'hash',
      render: (value: string) => <HashLink address={value} />
    }
  ]

  return (
    <div className="web-manage-investment-history">
      <header>
        <h2>View Withdrawal History</h2>
      </header>
      <Table
        className="web-buy-table"
        columns={webColumns}
        emptyText={loading ? <TableLoading /> : <TableNoData />}
        data={data.withdrawals}
        rowKey="timestamp"
      />
    </div>
  )
}

export default History
