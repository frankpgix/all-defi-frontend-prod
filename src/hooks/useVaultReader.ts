import { useReadContract, useAccount } from 'wagmi'
import { sum, isNaN } from 'lodash'
import BN from 'bignumber.js'
import { useVaultReaderContract } from '@/hooks/useContract'
import { AddressType } from '@/types/base'
import { VaultDetailDefault, VaultUserDetailDefault, ShareCompositionDefault } from '@/data/vault'
import {
  calcVaultDetail,
  calcVaultUserDetail,
  calcShareComposition,
  calcAssetComposition
} from '@/compute/vault'

import { AssetCompositionProps } from '@/types/vault'

const VaultReaderContract = useVaultReaderContract()

export const useVaultDetail = (vaultAddress: AddressType) => {
  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'vaultDetail',
    args: [vaultAddress]
  })
  if (!isLoading && isSuccess) {
    return { data: calcVaultDetail(data), isLoading, isSuccess, refetch }
  }
  return { data: VaultDetailDefault, isLoading, isSuccess, refetch }
}

export const useUserVaultDetail = (vaultAddress: AddressType) => {
  const { address } = useAccount()
  if (!address) {
    return { data: VaultUserDetailDefault, isLoading: false, isSuccess: false, refetch: () => {} }
  }
  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'userDetail',
    args: [vaultAddress, address ?? '0x']
  })
  if (!isLoading && isSuccess && address) {
    return { data: calcVaultUserDetail(data), isLoading, isSuccess, refetch }
  }
  return { data: VaultUserDetailDefault, isLoading, isSuccess, refetch }
}

export const useShareCompositionOf = (vaultAddress: AddressType) => {
  const { address } = useAccount()
  if (!address) {
    return { data: ShareCompositionDefault, isLoading: false, isSuccess: false, refetch: () => {} }
  }
  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'shareCompositionOf',
    args: [vaultAddress, address ?? '0x']
  })
  if (!isLoading && isSuccess && address) {
    console.log(1111, data)
    return { data: calcShareComposition(data), isLoading, isSuccess, refetch }
  }
  return { data: ShareCompositionDefault, isLoading, isSuccess, refetch }
}

// assetComposition

export const useAssetComposition = (
  vaultAddress: AddressType,
  underlyingTokenAddress: AddressType
) => {
  const {
    data: sData,
    isSuccess,
    isLoading
  } = useReadContract({
    ...VaultReaderContract,
    functionName: 'assetComposition',
    args: [vaultAddress]
  }) as { data: any[]; isSuccess: boolean; isLoading: boolean }
  if (!isLoading && isSuccess) {
    const tempData = sData
      .map((item) => calcAssetComposition(item, underlyingTokenAddress))
      .filter((item: AssetCompositionProps) => item.value > 0)
    const sumValue = sum(tempData.map((item: AssetCompositionProps) => item.value))

    const data = tempData.map((item: AssetCompositionProps) => {
      const percentage = BN(item.value).div(sumValue).times(100).toNumber()
      item.percentage = isNaN(percentage) ? 0 : percentage
      return item
    })

    return {
      data,
      isLoading,
      isSuccess
    }
  }
  return { data: [], isLoading, isSuccess }
}
