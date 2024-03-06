import { FC } from 'react'
import Table from 'rc-table'
import dayjs from 'dayjs'

import { useFundActionAssetData } from '@/graphql/useFundData'
// import { FundActionAssetProps } from '@/graphql/types'
// import { formatNumber } from '@/utils/tools'
import { TableLoading, TableNoData } from '@@/common/TableEmpty'
import Image from '@@/common/Image'
import HashLink from '@@/common/HashLink'
import { AddressType } from '@/types/base'

interface Props {
  vaultAddress: AddressType
}

const Record: FC<Props> = ({ vaultAddress }) => {
  const webColumns = [
    {
      title: 'Category',
      dataIndex: 'derivative'
    },
    {
      title: 'Out',
      dataIndex: 'out',
      width: 200,
      render: (list: any[]) => (
        <>
          {list.map((item, index) => (
            <div className="asset-item fall" key={index}>
              <Image src={item.token.icon} /> - {item.value} {item.token.name}
            </div>
          ))}
        </>
      )
    },
    {
      title: 'In',
      dataIndex: 'income',
      width: 200,
      render: (list: any[]) => (
        <>
          {list.map((item, index) => (
            <div className="asset-item rise" key={index}>
              <Image src={item.token.icon} /> + {item.value} {item.token.name}
            </div>
          ))}
        </>
      )
    },
    {
      title: '# Hash',
      dataIndex: 'id',
      render: (value: string) => <HashLink address={value} suffixLength={12} prefixLength={12} />,
      width: 260
    },
    {
      title: 'Time',
      dataIndex: 'timestamp',
      width: 240,
      render: (value: number) => dayjs(value).format('MMM DD, YYYY hh:mm:ss A')
    }
  ]

  // const list = [{ id: 1, category: 'Uniswap', out: 100000, in: 1000000, time: 123456 }]
  const { loading, data } = useFundActionAssetData(vaultAddress)
  // console.log(JSON.stringify(data, null, '  '))
  return (
    <Table
      className="web-buy-table"
      columns={webColumns}
      emptyText={loading ? <TableLoading /> : <TableNoData />}
      data={data}
      rowKey="id"
    />
  )
}

export default Record
