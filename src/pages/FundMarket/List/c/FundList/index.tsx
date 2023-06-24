import React, { FC, useEffect } from 'react'
import Table from 'rc-table'
import { useNavigate } from 'react-router-dom'

import { FundDetailProps } from '@/class/help'
import { useFundListData } from '@/graphql/useFundData'
// import { formatNumber } from '@/utils/tools'

import { useAppDispatch } from '@/store'
import { updateFundsList } from '@/store/funds'

import RoeShow from '@@/common/RoeShow'
import { FundName } from '@@/common/FundIcon'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'

const FundList: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { loading, data } = useFundListData()
  // console.log(data, 2233)
  useEffect(() => {
    if (data.length) {
      dispatch(updateFundsList(data))
      console.log(data)
    }
  }, [data]) // eslint-disable-line
  const webColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string, row: any) => (
        <FundName name={name} managerName={row.managerName} address={row.address} round size="mini" />
      )
    },
    {
      title: 'Fund AUM',
      dataIndex: 'aum',
      render: (value: number, row: any) => (
        <TokenValue value={value} token={row.baseToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: 'Capacity Available',
      dataIndex: 'capacityAvailable',
      render: (value: number, row: any) => (
        <TokenValue value={value} token={row.baseToken} size="mini" format="0,0.00" />
      )
    },
    {
      title: '1 D',
      dataIndex: 'dayReturn',
      render: (value: number) => <RoeShow value={value * 100} />
    },
    {
      title: '1 Week',
      dataIndex: 'weekReturn',
      render: (value: number) => <RoeShow value={value * 100} />
    },
    {
      title: '1 Month',
      dataIndex: 'monthReturn',
      render: (value: number) => <RoeShow value={value * 100} />
    },
    {
      title: '1 Year',
      dataIndex: 'yearReturn',
      render: (value: number) => <RoeShow value={value * 100} />
    },
    // {
    //   title: 'APR',
    //   dataIndex: 'apr',
    //   render: (value: number) => <RoeShow value={value} />
    // },
    {
      title: 'Epoch',
      dataIndex: 'epoch',
      render: (value: number) => <span>{value}</span>,
      align: 'right'
    },
    {
      title: 'Incentive',
      render: () => `20%`,
      align: 'right'
    }
  ]

  const onRow = (record: FundDetailProps) => ({
    onClick: () => navigate(`/fund-market/detail/${record.address}`)
  })

  return (
    <div className="web-fund-list-layout">
      <h2>Fund Market</h2>
      <Table
        // @ts-ignore
        columns={webColumns}
        emptyText={loading ? <TableLoading /> : <TableNoData />}
        data={data}
        rowKey="address"
        rowClassName="cup"
        onRow={onRow}
      />
    </div>
  )
}
export default FundList
