import { FC } from 'react'

import dayjs from 'dayjs'
import Table from 'rc-table'

import { useProfile } from '@/hooks/useProfile'

import { useUserACBuyData } from '@/graphql/useFundData'
import { formatNumber } from '@/utils/tools'
import HashLink from '@@/common/HashLink'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'

const ContributionManagement: FC = () => {
  const { account: address } = useProfile()
  const { data, loading } = useUserACBuyData(address ?? '')
  // console.log(data)
  const webColumns = [
    {
      title: 'Time',
      dataIndex: 'timestamp',
      render: (value: number) => dayjs(value).format('MMM DD, YYYY hh:mm:ss A')
    },
    {
      title: 'Contribution Value',
      dataIndex: 'amount',
      render: (value: number, row: any) => `${formatNumber(value, 4, '0,0.0000')} ${row.tokenName}`
    },
    {
      title: 'sALL Token Amount',
      dataIndex: 'sallAmount',
      render: (value: number) => formatNumber(value, 3, '0,0.000')
    },
    {
      title: 'Hash',
      dataIndex: 'hash',
      render: (value: string) => <HashLink address={value} prefixLength={16} suffixLength={16} />
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
