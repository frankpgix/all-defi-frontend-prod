import { FC, useMemo } from 'react'
import Table from 'rc-table'
import ContentLoader from 'react-content-loader'

import { useRequest } from 'ahooks'

import PositionDetail from '@/class/PositionDetail'
import { getTokenByAddress } from '@/config/tokens'

import { TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'
import Button from '@@/common/Button'
interface Props {
  fundAddress?: string
  baseTokenAddress: string
}

const UniLP: FC<Props> = ({ fundAddress, baseTokenAddress }) => {
  const { getUniV3NonfungiblePosition } = PositionDetail
  const baseToken = useMemo(() => getTokenByAddress(baseTokenAddress), [baseTokenAddress])

  const { data, loading = true } = useRequest(
    () => getUniV3NonfungiblePosition(fundAddress ?? '', baseTokenAddress),
    {
      refreshDeps: [fundAddress]
    }
  )
  // console.log(data)
  const webColumns = [
    {
      title: 'POOL',
      dataIndex: 'id',
      width: 200,
      render: (value: number, row: any) => (
        <>
          {row.token0.name}/{row.token1.name}
        </>
      )
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: 200,
      render: (value: number) => (
        <TokenValue value={value} token={baseToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Unclaimed Fees',
      dataIndex: 'unclaimedFees',
      width: 200,
      render: (value: number) => (
        <TokenValue value={value} token={baseToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Status',
      dataIndex: 'inRange',
      width: 100,
      render: (value: boolean) => (
        <Button size="mini" outline nohand>
          {value ? 'IN RANGE' : 'Not within Range'}
        </Button>
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
