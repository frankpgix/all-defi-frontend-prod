import { FC } from 'react'

import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import Table from 'rc-table'

import { useProfile } from '@/hooks/useProfile'

import { useUserDepositData } from '@/graphql/useFundData'
import { formatNumber } from '@/utils/tools'
import HashLink from '@@/common/HashLink'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'

dayjs.extend(RelativeTime)
const ContributionManagement: FC = () => {
  const { account: address } = useProfile()
  const { data, loading } = useUserDepositData(address ?? '')
  console.log(data, 111)
  const webColumns = [
    {
      title: 'Contribution Time',
      dataIndex: 'timestamp',
      render: (value: number) => dayjs(value).format('MMM DD, YYYY hh:mm:ss A')
    },
    {
      title: 'Lock-up Value',
      dataIndex: 'amount',
      render: (value: number, row: any) => `${formatNumber(value, 4, '0,0.0000')} ${row.tokenName}`
    },
    {
      title: 'Locking time',
      dataIndex: 'lockDuration',
      render: (value: number) => `${value / 60 / 60 / 24} Days`
    },
    {
      title: 'Projected Rate of Return',
      dataIndex: 'lockDuration',
      render: () => `20%`
    },
    {
      title: 'Unlock Countdown',
      dataIndex: 'timestamp',
      render: (value: number, row: any) => {
        return dayjs().to(value + row.lockDuration * 1000)
      }
    },
    {
      title: 'Action',
      dataIndex: 'depositId',
      render: (value: string) => value
    }
  ]
  return (
    <>
      <div className="web-buy-table-layout">
        <h2>Contribution Management</h2>
        <Table
          className="web-buy-table"
          columns={webColumns}
          emptyText={loading ? <TableLoading /> : <TableNoData />}
          data={data}
          rowKey="hash"
        />
      </div>
    </>
  )
}
export default ContributionManagement
