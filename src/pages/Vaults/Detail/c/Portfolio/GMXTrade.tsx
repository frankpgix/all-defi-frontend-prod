import { FC } from 'react'
import ContentLoader from 'react-content-loader'

import Table from 'rc-table'

import { TokenTypes } from '@/types/base'
import { GMXTradePositionTypes } from '@/types/vaultPositionDetail'

import { TableNoData } from '@@/common/TableEmpty'
import { TokenIcon } from '@@/common/TokenUnit'
import TokenValue from '@@/common/TokenValue'

interface Props {
  data: GMXTradePositionTypes[]
  underlyingToken: TokenTypes
  loading: boolean
}

const GMXTrade: FC<Props> = ({ data, underlyingToken, loading }) => {
  const webColumns = [
    {
      title: 'Symbol',
      dataIndex: 'indexToken',
      // width: 200,
      render: (token: any) => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <TokenIcon name={token.name} size="mini" /> {token.name}
        </div>
      )
    },
    {
      title: 'Size',
      dataIndex: 'size',
      // width: 200
      render: (value: number) => (
        <TokenValue value={value} token={underlyingToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Value',
      dataIndex: 'positionValue',
      // width: 200
      render: (value: number) => (
        <TokenValue value={value} token={underlyingToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Mark price',
      dataIndex: 'markPrice',
      // width: 200,
      render: (value: number) => (
        <TokenValue value={value} token={underlyingToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Floating PnL',
      dataIndex: 'unrealizedPnl',
      // width: 200,
      render: (value: number) => (
        <TokenValue value={value} token={underlyingToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Est. liq. price',
      dataIndex: 'entryPrice',
      // width: 200,
      render: (value: number) => (
        <TokenValue value={value} token={underlyingToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Fees',
      dataIndex: 'fundingFee',
      // width: 200,
      render: (value: number) => (
        <TokenValue value={value} token={underlyingToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Side',
      dataIndex: 'isLong',
      // width: 200,
      render: (value: boolean) => (
        <span className={value ? 'rise' : 'fall'}>Open {value ? 'Long' : 'Short'}</span>
      )
    }
  ]
  if (loading || (!loading && data?.length === 0)) return null
  return (
    <>
      <h3>GMX TRADE</h3>

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

export default GMXTrade

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
