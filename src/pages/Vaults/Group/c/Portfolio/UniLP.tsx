import { FC } from 'react'
import ContentLoader from 'react-content-loader'

import classNames from 'classnames'
import Table from 'rc-table'

import { TokenTypes } from '@/types/base'
import { UniLPDetailTypes } from '@/types/vaultPositionDetail'

import { TableNoData } from '@@/common/TableEmpty'
import { IconGroup } from '@@/common/TokenUnit'
import TokenValue from '@@/common/TokenValue'

interface Props {
  data: UniLPDetailTypes[]
  underlyingToken: TokenTypes
  loading: boolean
}

const UniLP: FC<Props> = ({ data, underlyingToken, loading }) => {
  const webColumns = [
    {
      title: 'POOL',
      dataIndex: 'id',
      width: 200,
      render: (_: number, row: any) => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <IconGroup list={[row.token0.name, row.token1.name]} /> {row.token0.name}/
          {row.token1.name}
        </div>
      )
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: 200,
      render: (value: number) => (
        <TokenValue value={value} token={underlyingToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Unclaimed Fees',
      dataIndex: 'unclaimedFees',
      width: 200,
      render: (value: number) => (
        <TokenValue value={value} token={underlyingToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Status',
      dataIndex: 'inRange',
      width: 100,
      render: (value: boolean) => (
        <span className={classNames({ rise: value, fall: !value })}>
          {value ? 'IN RANGE' : 'Not within Range'}
        </span>
      )
    }
  ]
  if (loading || (!loading && data?.length === 0)) return null

  return (
    <>
      <h3>UNISWAP V3</h3>
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

export default UniLP

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
