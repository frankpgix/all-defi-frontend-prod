import { FC } from 'react'
import { useParams } from 'react-router-dom'
import ContentLoader from 'react-content-loader'
// import { getTokenByAddress, baseTokens } from '@/config/tokens'
// import FundPool from '@/class/FundPool'
// import FundReader from '@/class/FundReader'
// import AllProtocol from '@/class/AllProtocol'
// import {
//   FundBaseProps,
//   FundBaseDefault,
//   FundDetailProps,
//   FundDetailDefault,
//   FundStakeProps,
//   FundStakeDefault,
//   FundBreachDetailProps,
//   FundBreachDetailDefault
// } from '@/class/help'

// import { useProfile } from '@/hooks/useProfile'
// import { useVaultStakedALL } from '@/hooks/useAllProtocol'
import { useVaultManageDetails } from '@/hooks/Contracts/useVaultDetails'
// import { useVaultBreachDetail, useVaultUpdatingData } from '@/hooks/useVaultReader'
import { AddressType } from '@/types/base'
import Blank from '@@/common/Blank'

import ManageDetail from './c/ManageDetail'
import DataTab from './c/DataTab'
import Dashboard from './c/Dashboard'
import VerifiedDialog from './c/VerifiedDialog'

const VaultDetail: FC = () => {
  const { vaultAddress } = useParams() as { vaultAddress: AddressType }

  // const { account } = useProfile()
  const {
    data: { baseInfo, vaultDetail, vaultBreachDetail, vaultStakedALL },
    isLoading: loading,
    refetch: getData
  } = useVaultManageDetails(vaultAddress)
  console.log(baseInfo, vaultDetail, vaultBreachDetail, vaultStakedALL)

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
      {!loading && <VerifiedDialog vaultAddress={vaultAddress} name={baseInfo.name} />}
    </div>
  )
}

export default VaultDetail
