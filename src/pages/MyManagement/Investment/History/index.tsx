import { FC } from 'react'
import Table from 'rc-table'
import dayjs from 'dayjs'

import { useUserVaultHistoryData } from '@/graphql/useFundData'
import { UserFundHistoryDataProps } from '@/graphql/help'
import { formatNumber } from '@/utils/tools'
import { useProfile } from '@/hooks/useProfile'

import HashLink from '@@/common/HashLink'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'

interface AmountShowProps {
  value: number
  action: string
  row: UserFundHistoryDataProps
}
const AmountShow: FC<AmountShowProps> = ({ value, action, row }) => {
  // console.log(row.token, 222)
  if (action.includes('Redeem')) return <>{formatNumber(value, 4, '0,0.0000')} Shares</>
  return <TokenValue value={value} token={row.token} size="mini" format="0,0.00" />
}

const History: FC = () => {
  const { account: userAddress } = useProfile()
  const { loading, data } = useUserVaultHistoryData(userAddress ?? '')
  // console.log(data)
  // useEffect(() => void refetch(), [refetch])
  const webColumns = [
    {
      title: 'Fund Name',
      dataIndex: 'name'
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (value: number, row: UserFundHistoryDataProps) => (
        <AmountShow value={value} action={row.action} row={row} />
      )
    },
    {
      title: 'Action',
      dataIndex: 'action'
    },
    {
      title: 'Hash',
      dataIndex: 'hash',
      render: (hash: string) => <HashLink address={hash} />
    },
    {
      title: 'Time',
      dataIndex: 'time',
      render: (value: number) => dayjs(value).format('MMM DD, YYYY hh:mm:ss A')
    }
  ]

  return (
    <div className="web-manage-investment-history">
      <header>
        <h2>View Transaction History</h2>
      </header>
      <Table
        className="web-buy-table"
        columns={webColumns}
        emptyText={loading ? <TableLoading /> : <TableNoData />}
        data={data}
        rowKey="time"
      />
    </div>
  )
}

export default History
