import { FC } from 'react'
import ContentLoader from 'react-content-loader'

import Table from 'rc-table'

import { TokenTypes } from '@/types/base'
import { GMXEarnDetailTypes } from '@/types/vaultPositionDetail'

import { TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'

interface Props {
  data: GMXEarnDetailTypes[]
  underlyingToken: TokenTypes
  loading: boolean
}

const GMXEarn: FC<Props> = ({ data, underlyingToken, loading }) => {
  const webColumns = [
    {
      title: 'Blance',
      dataIndex: 'glpBlance',
      width: '400px'
      // width: 200,
      // render: (asset: any) => <>{asset}</>
    },
    {
      title: 'Value',
      dataIndex: 'glpValue',
      // width: 200
      render: (value: number) => (
        <TokenValue value={value} token={underlyingToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Pending Reward',
      dataIndex: 'pendingReward',
      width: '300px',
      // width: 200,
      render: (value: number) => (
        <TokenValue value={value} token={underlyingToken} size="mini" format="0,0.00" />
      )
    }
  ]
  if (loading || (!loading && data?.length === 0)) return null
  if (data[0].glpBlance === '0') return null
  return (
    <>
      <h3>GMX EARN</h3>

      <Table
        className="web-fund-detail-portfolio-table"
        columns={webColumns}
        emptyText={loading ? <TableLoading /> : <TableNoData />}
        // emptyText={<TableLoading />}
        data={data ?? []}
        rowKey="id"
      />
    </>
  )
}

export default GMXEarn

const TableLoading = () => {
  return (
    <ContentLoader
      width={972}
      height={120}
      viewBox="0 0 972 120"
      backgroundColor="#eaeced"
      foregroundColor="#ffffff"
    >
      <rect x="0" y="0" rx="4" ry="4" width="100" height="18" />
      <rect x="160" y="0" rx="4" ry="4" width="450" height="18" />
      <rect x="690" y="0" rx="4" ry="4" width="100" height="18" />
      <rect x="920" y="0" rx="4" ry="4" width="100" height="18" />
      <rect x="0" y="40" rx="4" ry="4" width="100" height="18" />
      <rect x="160" y="40" rx="4" ry="4" width="450" height="18" />
      <rect x="690" y="40" rx="4" ry="4" width="100" height="18" />
      <rect x="920" y="40" rx="4" ry="4" width="100" height="18" />

      <rect x="0" y="80" rx="4" ry="4" width="100" height="18" />
      <rect x="160" y="80" rx="4" ry="4" width="450" height="18" />
      <rect x="690" y="80" rx="4" ry="4" width="100" height="18" />
      <rect x="920" y="80" rx="4" ry="4" width="100" height="18" />
    </ContentLoader>
  )
}
