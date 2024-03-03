import { FC, useMemo } from 'react'
import Table from 'rc-table'
import ContentLoader from 'react-content-loader'

import { useRequest } from 'ahooks'

import PositionDetail from '@/class/PositionDetail'
import { getTokenByAddress } from '@/config/tokens'

import { TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'

interface Props {
  fundAddress?: string
  baseTokenAddress: string
}

const AAVE: FC<Props> = ({ fundAddress, baseTokenAddress }) => {
  const { getAaveV3Position } = PositionDetail
  const baseToken = useMemo(() => getTokenByAddress(baseTokenAddress), [baseTokenAddress])

  const { data, loading = true } = useRequest(
    () => getAaveV3Position(fundAddress ?? '', baseTokenAddress),
    {
      refreshDeps: [fundAddress]
    }
  )
  const webColumns = [
    {
      title: 'Name',
      dataIndex: 'asset',
      // width: 200,
      render: (asset: any) => <>{asset.name}</>
    },
    {
      title: 'Amount',
      dataIndex: 'blances'
      // width: 200
      // render: (value: number) => (
      //   <TokenValue value={value} token={baseToken} size="mini" format="0,0.00" />
      // )
    },
    {
      title: 'Value',
      dataIndex: 'value',
      // width: 200,
      render: (value: number) => (
        <TokenValue value={value} token={baseToken} size="mini" format="0,0.00" />
      )
    }
  ]
  if (loading || (!loading && !data)) return null

  return (
    <>
      <h3>AAVE</h3>
      {data?.collateral && data?.collateral?.length ? (
        <>
          <h4>Deposit</h4>
          <Table
            className="web-fund-detail-portfolio-table"
            columns={webColumns}
            emptyText={loading ? <TableLoading /> : <TableNoData />}
            // emptyText={<TableLoading />}
            data={data?.collateral ?? []}
            rowKey="id"
          />
        </>
      ) : null}
      {data?.debt && data?.debt?.length ? (
        <>
          <h4>Debt</h4>
          <Table
            className="web-fund-detail-portfolio-table"
            columns={webColumns}
            emptyText={loading ? <TableLoading /> : <TableNoData />}
            // emptyText={<TableLoading />}
            data={data?.debt ?? []}
            rowKey="id"
          />
        </>
      ) : null}
    </>
  )
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
