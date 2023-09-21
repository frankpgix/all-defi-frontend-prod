import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from 'rc-table'
import dayjs from 'dayjs'
import ContentLoader from 'react-content-loader'

// import FundManager, { FundDetailProps } from '@/class/FundManager'
// import FundReader from '@/class/FundReader'
import { FundDetailProps } from '@/class/help'
import { MANAGER_UPLODAD_HISTORICAL_DATA_URL } from '@/config'
// import { formatNumber } from '@/utils/tools'
// import { useProfile } from '@/hooks/useProfile'
import { useManageFundList } from '@/hooks/useFund'

import FundSettleButton from '@/pages/MyManagement/Manager/FundDetail/c/FundSettleButton'

import RoeShow from '@@/common/RoeShow'
import Button from '@@/common/Button'
import { FundName } from '@@/common/FundIcon'
import TokenValue from '@@/common/TokenValue'
import Badge from '@@/core/Badge'
import { TableNoData } from '@@/common/TableEmpty'

const FundList: FC = () => {
  // const { account: address } = useProfile()
  const navigate = useNavigate()
  const { manageFundList, loading, getData } = useManageFundList()

  const webColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string, row: any) => (
        <FundName name={name} managerName={''} address={row.address} round size="mini" />
      )
    },
    {
      title: 'Fund NAV',
      dataIndex: 'nav',
      width: 120,
      render: (value: number, row: any) => (
        <TokenValue value={value} token={row.baseTokenObj} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Cash Balance',
      dataIndex: 'unusedAsset',
      width: 120,
      render: (value: number, row: any) => (
        <TokenValue value={value} token={row.baseTokenObj} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Pre-settlement Date',
      dataIndex: 'preSettleEndTime',
      width: 200,
      render: (value: number, row: FundDetailProps) =>
        row.status === 0 ? '-' : dayjs(value).format('MMM DD, YYYY hh:mm:ss A')
    },
    {
      title: 'Assets To Be Redeemed',
      dataIndex: 'redeemingShares',
      width: 180,
      render: (value: number, row: FundDetailProps) => (
        <TokenValue value={value} token={row.baseTokenObj} shares size="mini" format="0,0.00" />
      )
      // render: (value: number) => `${formatNumber(value, 2, '0,0.00 a')} Shares`
      // align: 'right'
    },
    {
      title: "Last Epoch's Return",
      dataIndex: 'lastRoe',
      width: 130,
      render: (value: number) => <RoeShow value={value} />
      // align: 'right'
    },
    {
      title: 'Action',
      dataIndex: 'address',
      width: 180,
      render: (fundAddress: string, record: FundDetailProps) => {
        return (
          <div className="web-buy-table-action">
            {record.status === 0 ? (
              <Badge value="Under review">
                <Button to={MANAGER_UPLODAD_HISTORICAL_DATA_URL} size="mini">
                  Upload data
                </Button>
              </Badge>
            ) : (
              <FundSettleButton
                disabled={![5, 4].includes(record.status)}
                callback={getData}
                fundAddress={fundAddress}
                outline
                size="mini"
              >
                settle
              </FundSettleButton>
            )}
          </div>
        )
      }
      // align: 'left'
    }
  ]
  // cup
  const onRow = (record: FundDetailProps) => ({
    onClick: (e: any) => {
      if (e.target?.tagName !== 'BUTTON' && record.status !== 0) {
        navigate(`/manage/manager/fund/${record.address}`)
      }
    }
  })

  const calcTableRowClassName = (record: FundDetailProps) => {
    if (record.status !== 0) return 'cup'
    return ''
  }
  return (
    <>
      <div className="web-buy-table-layout">
        <h2>Fund List</h2>
        <Table
          className="web-buy-table"
          // @ts-ignore
          columns={webColumns}
          emptyText={loading ? <TableLoading /> : <TableNoData />}
          data={manageFundList}
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
