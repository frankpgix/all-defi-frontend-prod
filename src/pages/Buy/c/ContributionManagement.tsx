import { FC } from 'react'

import dayjs from 'dayjs'
import RelativeTime from 'dayjs/plugin/relativeTime'
import Table from 'rc-table'

import { useWithdraw } from '@/hooks/Contracts/useACProtocol'
import { useProfile } from '@/hooks/useProfile'

import { useUserDepositData } from '@/graphql/useFundData'
import { formatNumber } from '@/utils/tools'
import Button from '@@/common/Button'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'

import { Infinite } from './Bench'

dayjs.extend(RelativeTime)
const ContributionManagement: FC = () => {
  const { account: address } = useProfile()
  const { onWithdraw } = useWithdraw()
  const { data, loading, refetch } = useUserDepositData(address ?? '')
  const now = +new Date()
  const onItemUnLock = (item: any) => {
    if (address) {
      onWithdraw(item.underlying, item.depositId, address, refetch)
    }
  }
  const webColumns = [
    {
      title: 'Time',
      dataIndex: 'timestamp',
      render: (value: number) => dayjs(value).format('MMM DD, YYYY hh:mm:ss A')
    },
    {
      title: 'Value',
      dataIndex: 'amount',
      render: (value: number, row: any) => `${formatNumber(value, 4, '0,0.0000')} ${row.tokenName}`
    },
    {
      title: 'Lock Duration',
      dataIndex: 'lockDuration',
      render: (value: string) => {
        console.log(value.length, 'value.length')
        if (value.length === 78) {
          return <Infinite />
        }
        const time = Number(value) / 60 / 60 / 24

        return `${time > 1 ? ~~time : '< 1'} Days`
      }
    },
    // {
    //   title: 'Projected Rate of Return',
    //   dataIndex: 'lockDuration',
    //   render: () => `20%`
    // },
    {
      title: 'Unlock time',
      dataIndex: 'timestamp',
      render: (value: number, row: any) => {
        if (row.lockDuration.length === 78) {
          return <Infinite />
        }
        return dayjs().to(value + row.lockDuration * 1000)
      }
    },
    {
      title: 'Action',
      dataIndex: 'depositId',
      render: (_: string, row: any) => {
        const disabled =
          row.lockDuration.length === 78 || row.timestamp + row.lockDuration * 1000 > now
        return (
          <Button disabled={disabled} onClick={() => onItemUnLock(row)} size="mini" outline>
            unlock
          </Button>
        )
      }
    }
  ]
  return (
    <>
      <div className="web-buy-table-layout">
        <h2>My Deposit</h2>
        <Table
          className="web-buy-table"
          columns={webColumns}
          emptyText={loading ? <TableLoading /> : <TableNoData />}
          data={data}
          rowKey="hash"
        />
      </div>
    </>
  )
}
export default ContributionManagement
