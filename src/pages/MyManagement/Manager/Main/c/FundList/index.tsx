import React, { FC, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from 'rc-table'
import dayjs from 'dayjs'

// import FundManager, { FundDetailProps } from '@/class/FundManager'
import FundReader from '@/class/FundReader'
import { FundDetailProps } from '@/class/help'
// import { formatNumber } from '@/utils/tools'
import { useProfile } from '@/hooks/useProfile'

import FundSettleButton from '@/pages/MyManagement/Manager/FundDetail/c/FundSettleButton'

import RoeShow from '@@/common/RoeShow'
import { FundName } from '@@/common/FundIcon'
import TokenValue from '@@/common/TokenValue'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'

const FundList: FC = () => {
  const { account: address } = useProfile()
  const navigate = useNavigate()
  const { getManagerFundList } = FundReader

  const [list, setList] = useState<FundDetailProps[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getData = useCallback(async () => {
    if (address) {
      setLoading(true)
      const res = await getManagerFundList(address)
      // console.log(2222, res)
      if (res) setList(res)
      setLoading(false)
    }
  }, [address, getManagerFundList])

  useEffect(() => void getData(), [getData])

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
      render: (value: number) => dayjs(value).format('MMM DD, YYYY hh:mm:ss A')
    },
    {
      title: 'Assets To Be Redeemed',
      dataIndex: 'redeemingShares',
      width: 180,
      render: (value: number, row: any) => (
        <TokenValue value={value} token={row.baseTokenObj} shares size="mini" format="0,0.00" />
      )
      // render: (value: number) => `${formatNumber(value, 2, '0,0.00 a')} Shares`
      // align: 'right'
    },
    {
      title: 'Last Epoch Return',
      dataIndex: 'lastRoe',
      width: 130,
      render: (value: number) => <RoeShow value={value} />
      // align: 'right'
    },
    {
      title: 'Action',
      dataIndex: 'address',
      width: 150,
      render: (fundAddress: string, record: FundDetailProps) => {
        return (
          <div className="web-buy-table-action">
            <FundSettleButton
              disabled={![5, 4].includes(record.status)}
              callback={getData}
              fundAddress={fundAddress}
              outline
              size="mini"
            >
              settle
            </FundSettleButton>
          </div>
        )
      }
      // align: 'left'
    }
  ]

  const onRow = (record: FundDetailProps) => ({
    onClick: (e: any) => {
      if (e.target?.tagName !== 'BUTTON') {
        navigate(`/manage/manager/fund/${record.address}`)
      }
    }
  })
  return (
    <>
      <div className="web-buy-table-layout">
        <h2>Fund List</h2>
        {loading ? (
          <TableLoading />
        ) : (
          <Table
            className="web-buy-table"
            // @ts-ignore
            columns={webColumns}
            emptyText={<TableNoData />}
            data={list}
            rowKey="address"
            rowClassName="cup"
            onRow={onRow}
          />
        )}
      </div>
    </>
  )
}
export default FundList
