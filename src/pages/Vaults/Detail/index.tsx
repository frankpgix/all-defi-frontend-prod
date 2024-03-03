import { FC, useMemo } from 'react'
import { AddressType } from '@/types/base'
import { useParams } from 'react-router-dom'
import Alert from '@@/common/Alert'
import Blank from '@@/common/Blank'

import { useBaseInfo } from '@/hooks/useVault'
import { useVaultDetail, useUserVaultDetail, useShareCompositionOf } from '@/hooks/useVaultReader'

import Dashboard from './c/Dashboard'
import VaultStatus from './c/VaultStatus'
import Portfolio from './c/Portfolio'
// import Bench from './c/Bench'
import RoeHistory from './c/RoeHistory'

const Detail: FC = () => {
  // console.log(base, 'base')
  const { fundAddress = '0x' } = useParams() as { fundAddress: AddressType }
  const { data: baseInfo, isLoading: baseInfoLoading } = useBaseInfo(fundAddress)
  console.log('baseInfo', baseInfo, baseInfoLoading)

  const {
    data: vaultDetail,
    isLoading: vaultDetailLoading,
    refetch: getVaultDetail
  } = useVaultDetail(fundAddress)
  console.log('vaultDetail', vaultDetail, vaultDetailLoading)

  const {
    data: vaultUserDetail,
    isLoading: vaultUserDetailLoading,
    refetch: getVaultUserDetail
  } = useUserVaultDetail(fundAddress)
  console.log('vaultUserDetail', vaultUserDetail, vaultUserDetailLoading)

  const {
    data: vaultShareComposition,
    isLoading: vaultShareCompositionLoading,
    refetch: getVaultShareComposition
  } = useShareCompositionOf(fundAddress)
  console.log('vaultShareComposition', vaultShareComposition, vaultShareCompositionLoading)

  const getData = () => {
    getVaultDetail()
    getVaultUserDetail()
    getVaultShareComposition()
  }

  const loading = useMemo(
    () =>
      baseInfoLoading ||
      vaultDetailLoading ||
      vaultUserDetailLoading ||
      vaultShareCompositionLoading,
    [baseInfoLoading, vaultDetailLoading, vaultUserDetailLoading, vaultShareCompositionLoading]
  )
  return (
    <>
      {!loading && vaultDetail.status === 6 && (
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
      {/* <Bench userData={userData} data={data} share={share} loading={loading} getData={getData} /> */}
    </>
  )
}

export default Detail
