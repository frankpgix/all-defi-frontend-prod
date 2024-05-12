import { FC, useMemo } from 'react'
import ContentLoader from 'react-content-loader'

import Table from 'rc-table'

import { useAssetComposition } from '@/hooks/Contracts/useVaultReader'
import { useToken } from '@/hooks/useToken'

import { AddressType } from '@/types/base'
import { VaultBaseInfoProps } from '@/types/vault'

import PercentageLine from '@@/common/PercentageLine'
import { TableNoData } from '@@/common/TableEmpty'
import { TokenIcon } from '@@/common/TokenUnit'
import TokenValue from '@@/common/TokenValue'

interface Props {
  fundAddress: AddressType
  base: VaultBaseInfoProps
}

const Portfolio: FC<Props> = ({ fundAddress, base }) => {
  const { getTokenByAddress } = useToken()
  const { data, isLoading: loading } = useAssetComposition(fundAddress, base.underlying.address)

  const list = useMemo(
    () =>
      (data ?? []).filter(
        (item) => !['UNIV3-LP', 'AAVEV3', 'GMX-EARN', 'GMX-TRADE'].includes(item.symbol)
      ) ?? [],
    [data]
  )

  const webColumns = [
    {
      title: 'Asset Name',
      dataIndex: 'symbol',
      width: 200,
      render: (token: any) => (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <TokenIcon name={token} size="mini" /> {token}
        </div>
      )
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
        console.log(row.token, token.name)
        return token.name !== 'UNKNOWN' ? (
          <TokenValue value={value} token={token} size="mini" format="0,0.00" noUnit />
        ) : (
          '-'
        )
      }
    },
    {
      title: 'Value',
      dataIndex: 'value',
      width: 240,
      render: (value: number) => (
        <TokenValue value={value} token={base.underlyingToken} size="mini" format="0,0.00" />
      )
    }
  ]
  return (
    <>
      <h3>Tokens</h3>

      <Table
        className="web-fund-detail-portfolio-table"
        columns={webColumns}
        emptyText={loading ? <TableLoading /> : <TableNoData />}
        // emptyText={<TableLoading />}
        data={list ?? []}
        rowKey="token"
      />
    </>
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
