import React, { FC, useMemo } from 'react'
import Table from 'rc-table'
import { useRequest } from 'ahooks'
import ContentLoader from 'react-content-loader'

import FundReader from '@/class/FundReader'
// import { formatNumber } from '@/utils/tools'
import { FundBaseProps } from '@/class/help'
import { getTokenByAddress } from '@/config/tokens'

import PercentageLine from '@@/common/PercentageLine'
import { TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'

interface Props {
  fundAddress: string | undefined
  base: FundBaseProps
}

const Portfolio: FC<Props> = ({ fundAddress, base }) => {
  const { getAssetComposition } = FundReader

  const { data, loading = true } = useRequest(
    () => getAssetComposition(fundAddress ?? '', base.baseToken ?? ''),
    {
      refreshDeps: [fundAddress, base.baseToken]
    }
  )
  const baseToken = useMemo(() => getTokenByAddress(base.baseToken), [base.baseToken])
  // console.log(11122222, data)
  const webColumns = [
    {
      title: 'Asset Name',
      dataIndex: 'symbol',
      width: 200
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      render: (value: number) => <PercentageLine size="mini" value={value} />
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      width: 240,
      render: (value: number, row: any) => {
        const token = getTokenByAddress(row.token)
        // console.log(row.token, token.name)
        return token.name !== 'UNKNOWN' ? (
          <TokenValue value={value} token={token} size="mini" format="0,0.00" noUnit />
        ) : (
          '-'
        )
        // return row.value > 0 && value === 0 ? (
        //   '-'
        // ) : (
        //   <TokenValue value={value} token={token} size="mini" format="0,0.00" noUnit />
        // )
      }
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: 240,
      render: (value: number) => (
        <TokenValue value={value} token={baseToken} size="mini" format="0,0.00" />
      )
    }
  ]
  return (
    <section className="web-fund-detail-portfolio">
      <h2>Portfolio</h2>
      {/* {loading ? (
        <TableLoading />
      ) : (
        
      )} */}
      <Table
        className="web-fund-detail-portfolio-table"
        columns={webColumns}
        emptyText={loading ? <TableLoading /> : <TableNoData />}
        // emptyText={<TableLoading />}
        data={data ?? []}
        rowKey="token"
      />
    </section>
  )
}

export default Portfolio

const TableLoading = () => {
  return (
    <ContentLoader
      width={1120}
      height={120}
      viewBox="0 0 1120 120"
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
