import { FC } from 'react'
import ContentLoader from 'react-content-loader'
import { useParams } from 'react-router-dom'

import { useInterval } from 'ahooks'

import { useVaultManageDetails } from '@/hooks/Contracts/useVaultDetails'

import { AddressType } from '@/types/base'

import Blank from '@@/common/Blank'

import Dashboard from './c/Dashboard'
import DataTab from './c/DataTab'
import ManageDetail from './c/ManageDetail'

// import VerifiedDialog from './c/VerifiedDialog'

const VaultDetail: FC = () => {
  const { vaultAddress } = useParams() as { vaultAddress: AddressType }

  const {
    data: { baseInfo, vaultDetail, vaultBreachDetail, vaultStakedALL },
    isLoading: loading,
    refetch: getData
  } = useVaultManageDetails(vaultAddress)
  console.log(1111, baseInfo, vaultDetail, vaultBreachDetail, vaultStakedALL)
  useInterval(() => {
    console.log('1分钟更新数据')
    getData()
  }, 60000)
  return (
    <div className="web-manage">
      <h2>
        {loading ? (
          <ContentLoader
            width={200}
            height={32}
            viewBox="0 0 200 32"
            backgroundColor="#eaeced"
            foregroundColor="#ffffff"
          >
            <rect x="0" y="0" rx="4" ry="4" width="200" height="30" />
          </ContentLoader>
        ) : (
          baseInfo.name
        )}
      </h2>
      <Dashboard vaultAddress={vaultAddress} loading={loading} data={vaultDetail} base={baseInfo} />
      <Blank />
      <ManageDetail
        loading={loading}
        vaultAddress={vaultAddress}
        base={baseInfo}
        data={vaultDetail}
        stake={vaultStakedALL}
        breach={vaultBreachDetail}
        getData={getData}
      />

      <DataTab vaultAddress={vaultAddress} />
      {/* {!loading && <VerifiedDialog vaultAddress={vaultAddress} name={baseInfo.name} />} */}
    </div>
  )
}

export default VaultDetail
