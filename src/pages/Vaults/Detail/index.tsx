import { FC } from 'react'
import { AddressType } from '@/types/base'
import { useParams } from 'react-router-dom'
import Alert from '@@/common/Alert'
import Blank from '@@/common/Blank'

import { useVaultDetails } from '@/hooks/Contracts/useVaultDetails'
import { useProfile } from '@/hooks/useProfile'

import Dashboard from './c/Dashboard'
import VaultStatus from './c/VaultStatus'
import Portfolio from './c/Portfolio'
import Bench from './c/Bench'
import RoeHistory from './c/RoeHistory'

const Detail: FC = () => {
  const { fundAddress = '0x' } = useParams() as { fundAddress: AddressType }
  const { account } = useProfile()

  const {
    data: { baseInfo, vaultDetail, vaultUserDetail, vaultShareComposition },
    isLoading: loading,
    refetch: getData
  } = useVaultDetails(fundAddress, account ?? '0x')

  return (
    <>
      {!loading && vaultDetail.isClosed && (
        <div className="web">
          <Alert show type="error">
            {baseInfo.name} has submitted an exit application to the platform. If approved, the
            vault will cease operations at any time.
          </Alert>
          <Blank />
        </div>
      )}
      <Dashboard base={baseInfo} fundAddress={fundAddress} data={vaultDetail} loading={loading} />
      <RoeHistory fundAddress={fundAddress} />
      <VaultStatus base={baseInfo} data={vaultDetail} loading={loading} />
      <Portfolio base={baseInfo} fundAddress={fundAddress} />
      {!loading && (
        <Bench
          userData={vaultUserDetail}
          base={baseInfo}
          data={vaultDetail}
          share={vaultShareComposition}
          loading={loading}
          getData={getData}
        />
      )}
    </>
  )
}

export default Detail
