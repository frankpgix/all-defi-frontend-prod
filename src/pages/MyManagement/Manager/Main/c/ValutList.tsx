import { FC } from 'react'
import ContentLoader from 'react-content-loader'
import { useNavigate } from 'react-router-dom'

import dayjs from 'dayjs'
import Table from 'rc-table'

import { useManageVaultListHook } from '@/hooks/useVaultList'

import { VaultDetailProps } from '@/types/vault'

// import { MANAGER_UPLODAD_HISTORICAL_DATA_URL } from '@/config'
import ValutSettleButton from '@/pages/MyManagement/Manager/VaultDetail/ValutSettleButton'
// import Button from '@@/common/Button'
import { FundName } from '@@/common/FundIcon'
// import RoeShow from '@@/common/RoeShow'
import { TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'

// import Badge from '@@/core/Badge'

const FundList: FC = () => {
  const navigate = useNavigate()
  const { manageVaultList, loading, getData } = useManageVaultListHook()
  console.log(manageVaultList, 'manageVaultList')
  const webColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string, row: VaultDetailProps) => (
        <FundName name={name} managerName={''} address={row.address} round size="mini" />
      )
    },
    {
      title: 'Net Asset Value',
      dataIndex: 'aum',
      width: 120,
      render: (value: number, row: VaultDetailProps) => (
        <TokenValue value={value} token={row.underlyingToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Cash Balance',
      dataIndex: 'underlyingBalance',
      width: 120,
      render: (value: number, row: VaultDetailProps) => (
        <TokenValue value={value} token={row.underlyingToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Pre-settlement Date',
      dataIndex: 'preSettleEndTime',
      width: 200,
      render: (value: number, row: VaultDetailProps) =>
        row.status === 0 ? '-' : dayjs(value).format('MMM DD, YYYY hh:mm:ss A')
    },
    {
      title: 'Confirming unstaking',
      dataIndex: 'redeemingShares',
      width: 180,
      render: (value: number, row: VaultDetailProps) => (
        <TokenValue value={value} token={row.underlyingToken} shares size="mini" format="0,0.00" />
      )
      // render: (value: number) => `${formatNumber(value, 2, '0,0.00 a')} Shares`
      // align: 'right'
    },
    // {
    //   title: "Last Epoch's Return",
    //   dataIndex: 'lastRoe',
    //   width: 130,
    //   render: (value: number) => <RoeShow value={value} />
    //   // align: 'right'
    // },
    {
      title: 'Action',
      dataIndex: 'address',
      width: 180,
      render: (_: string, record: VaultDetailProps) => {
        return (
          <div className="web-buy-table-action">
            {
              //   record.status === 0 ? (
              //   <Badge value="Under review">
              //     <Button to={MANAGER_UPLODAD_HISTORICAL_DATA_URL} size="mini">
              //       Upload data
              //     </Button>
              //   </Badge>
              // ) : (
              <ValutSettleButton
                disabled={![3].includes(record.status)}
                callback={getData}
                vaultAddress={record.address}
                outline
                size="mini"
                data={record}
              >
                {record.status != 4 ? 'settle' : 'Settling'}
              </ValutSettleButton>
              // )
            }
          </div>
        )
      }
      // align: 'left'
    }
  ]
  // cup
  const onRow = (record: VaultDetailProps) => ({
    onClick: (e: any) => {
      if (e.target?.tagName !== 'BUTTON' && record.status !== 0) {
        navigate(`/manage/manager/vault/${record.address}`)
      }
    }
  })

  const calcTableRowClassName = (record: VaultDetailProps) => {
    if (record.status !== 0) return 'cup'
    return ''
  }
  return (
    <>
      <div className="web-buy-table-layout">
        <h2>Vault List</h2>
        <Table
          className="web-buy-table"
          // @ts-ignore
          columns={webColumns}
          emptyText={loading ? <TableLoading /> : <TableNoData />}
          data={manageVaultList}
          rowKey="address"
          rowClassName={calcTableRowClassName}
          onRow={onRow}
        />
      </div>
    </>
  )
}
export default FundList

const TableLoading = () => {
  return (
    <ContentLoader
      width={1120}
      height={120}
      viewBox="0 0 1120 120"
      backgroundColor="#eaeced"
      foregroundColor="#ffffff"
    >
      <circle cx="16" cy="16" r="16" />
      <rect x="40" y="4" rx="4" ry="4" width="100" height="24" />
      <rect x="240" y="4" rx="4" ry="4" width="80" height="24" />
      <rect x="360" y="4" rx="4" ry="4" width="80" height="24" />
      <rect x="500" y="4" rx="4" ry="4" width="80" height="24" />
      <rect x="620" y="4" rx="4" ry="4" width="80" height="24" />
      <rect x="740" y="4" rx="4" ry="4" width="80" height="24" />
      <rect x="860" y="4" rx="4" ry="4" width="80" height="24" />
      <rect x="980" y="4" rx="4" ry="4" width="30" height="24" />
      <rect x="1060" y="4" rx="4" ry="4" width="50" height="24" />

      <circle cx="16" cy="76" r="16" />
      <rect x="40" y="64" rx="4" ry="4" width="100" height="24" />
      <rect x="240" y="64" rx="4" ry="4" width="80" height="24" />
      <rect x="360" y="64" rx="4" ry="4" width="80" height="24" />
      <rect x="500" y="64" rx="4" ry="4" width="80" height="24" />
      <rect x="620" y="64" rx="4" ry="4" width="80" height="24" />
      <rect x="740" y="64" rx="4" ry="4" width="80" height="24" />
      <rect x="860" y="64" rx="4" ry="4" width="80" height="24" />
      <rect x="980" y="64" rx="4" ry="4" width="30" height="24" />
      <rect x="1060" y="64" rx="4" ry="4" width="50" height="24" />
    </ContentLoader>
  )
}
