import { FC, useEffect, useMemo, useState } from 'react'
import ContentLoader from 'react-content-loader'
import { useNavigate } from 'react-router-dom'

import Table from 'rc-table'

// import { formatNumber } from '@/utils/tools'
// import { useVaultHashHook } from '@/hooks/useVaultList'
import { VaultDetailProps } from '@/types/vault'

// import { calcVaultHash } from '@/compute/vault'
// import { VaultDetailProps } from '@/class/help'
import { useVaultListData } from '@/graphql/useData'
import { FundName } from '@@/common/FundIcon'
// import { useAppDispatch } from '@/store'
// import { updateFundsList } from '@/store/funds'
import RoeShow from '@@/common/RoeShow'
import { TableNoData } from '@@/common/TableEmpty'
import TokenValue from '@@/common/TokenValue'

const FundList: FC = () => {
  const navigate = useNavigate()
  // const { getVaultAddressByHash } = useVaultHashHook()
  // const dispatch = useAppDispatch()
  const { loading, data } = useVaultListData()
  const [isShowEndVault, setIsShowEndVault] = useState(false)
  useEffect(() => {
    if (data.length) {
      // dispatch(updateFundsList(data))
      console.log(data)
    }
  }, [data]) // eslint-disable-line
  const showData = useMemo(() => {
    if (isShowEndVault) {
      return data.filter((item: any) => item.status === 6)
    }
    return data.filter((item: any) => item.status !== 6)
  }, [data, isShowEndVault])
  const webColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string, row: any) => (
        <FundName
          name={name}
          managerName={row.managerName}
          address={row.address}
          round
          size="mini"
        />
      )
    },
    {
      title: 'Asset Under Management',
      dataIndex: 'aum',
      render: (value: number, row: any) => (
        <TokenValue value={value} token={row.baseToken} size="mini" format="0,0.00" />
      )
    },
    // {
    //   title: 'Capacity Available',
    //   dataIndex: 'capacityAvailable',
    //   render: (value: number, row: any) => (
    //     <TokenValue value={value} token={row.baseToken} size="mini" format="0,0.00" />
    //   )
    // },
    {
      title: '1 Day',
      dataIndex: 'dayReturn',
      render: (value: number) => <RoeShow value={(value * 1000) / 7} />
    },
    {
      title: '1 Week',
      dataIndex: 'weekReturn',
      render: (value: number) => <RoeShow value={(value * 1000) / 7} />
    },
    {
      title: '1 Month',
      dataIndex: 'monthReturn',
      render: (value: number) => <RoeShow value={(value * 1000) / 7} />
    },
    {
      title: '1 Year',
      dataIndex: 'yearReturn',
      render: (value: number) => <RoeShow value={(value * 1000) / 7} />
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
  // calcVaultHash
  const onRow = (record: VaultDetailProps) => {
    // const { hash } = calcVaultHash(record.address)
    return {
      onClick: () => navigate(`/vaults/detail/${record.address}`)
    }
  }

  return (
    <div className="web-fund-list-layout">
      <header>
        <h2>Vaults</h2>
        {/* <aside>
          <label>
            <input type="checkbox" onChange={(e) => setIsShowEndVault(e.target.checked)} />
            Show closed vaults
          </label>
        </aside> */}
      </header>
      <Table
        // @ts-ignore
        columns={webColumns}
        emptyText={loading ? <TableLoading /> : <TableNoData />}
        data={showData}
        rowKey="address"
        rowClassName="cup"
        onRow={onRow}
      />
    </div>
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
