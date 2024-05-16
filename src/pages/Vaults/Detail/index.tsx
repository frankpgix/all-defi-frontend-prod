import { FC } from 'react'
import { useParams } from 'react-router-dom'

import { useVaultDetails } from '@/hooks/Contracts/useVaultDetails'
import { useProfile } from '@/hooks/useProfile'
import { useVaultHashHook } from '@/hooks/useVaultList'

import { AddressType } from '@/types/base'

import Alert from '@@/common/Alert'
import Blank from '@@/common/Blank'

import Bench from './c/Bench'
import Dashboard from './c/Dashboard'
// import Portfolio from './c/Portfolio'
import RoeHistory from './c/RoeHistory'
import VaultStatus from './c/VaultStatus'

const Detail: FC<{ fundAddress: AddressType }> = ({ fundAddress }) => {
  // const { fundAddress = '0x' } = useParams() as { fundAddress: AddressType }
  const { account } = useProfile()

  const {
    data: { baseInfo, vaultDetail, vaultUserDetail },
    isLoading: loading,
    refetch: getData
  } = useVaultDetails(fundAddress, account ?? '0x')
  console.log(baseInfo)
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
      {/* <Portfolio base={baseInfo} fundAddress={fundAddress} /> */}
      {!loading && (
        <Bench
          userData={vaultUserDetail}
          base={baseInfo}
          data={vaultDetail}
          loading={loading}
          getData={getData}
        />
      )}
    </>
  )
}

export const DetailInit = () => {
  const { fundAddress = '' } = useParams()
  const { getVaultAddressByHash } = useVaultHashHook()
  const address = getVaultAddressByHash(fundAddress)
  if (address) {
    return <Detail fundAddress={address} />
  }
  return null
}
export default DetailInit
