import { FC } from 'react'
import Table from 'rc-table'
import ContentLoader from 'react-content-loader'
import Token from '@/class/Token'
import { AaveV3DetailTypes } from '@/types/vaultPositionDetail'

import { TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'

interface Props {
  data: AaveV3DetailTypes | null
  underlyingToken: Token
  loading: boolean
}

const AAVE: FC<Props> = ({ data, underlyingToken, loading }) => {
  const webColumns = [
    {
      title: 'Name',
      dataIndex: 'asset',
      render: (asset: any) => <>{asset.name}</>
    },
    {
      title: 'Amount',
      dataIndex: 'blances'
    },
    {
      title: 'Value',
      dataIndex: 'value',
      render: (value: number) => (
        <TokenValue value={value} token={underlyingToken} size="mini" format="0,0.00" />
      )
    }
  ]
  if (loading || (!loading && data)) return null
  if (data) {
    return (
      <>
        <h3>AAVE</h3>
        {data.collateral.length ? (
          <>
            <h4>Deposit</h4>
            <Table
              className="web-fund-detail-portfolio-table"
              columns={webColumns}
              emptyText={loading ? <TableLoading /> : <TableNoData />}
              data={data?.collateral ?? []}
              rowKey="id"
            />
          </>
        ) : null}
        {data.debt.length ? (
          <>
            <h4>Debt</h4>
            <Table
              className="web-fund-detail-portfolio-table"
              columns={webColumns}
              emptyText={loading ? <TableLoading /> : <TableNoData />}
              data={data?.debt ?? []}
              rowKey="id"
            />
          </>
        ) : null}
      </>
    )
  }
  return null
}

export default AAVE

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
