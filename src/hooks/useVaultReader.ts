import { useReadContract } from 'wagmi'
import { sum, isNaN } from 'lodash'
import BN from 'bignumber.js'
import { useVaultReaderContract } from '@/hooks/useContract'
import { useProfile } from '@/hooks/useProfile'
import { AddressType } from '@/types/base'
import { VaultDetailDefault, VaultUserDetailDefault, ShareCompositionDefault } from '@/data/vault'
import {
  calcVaultBaseInfo,
  calcVaultDetail,
  calcVaultUserDetail,
  calcShareComposition,
  calcAssetComposition
} from '@/compute/vault'

import {
  AssetCompositionProps,
  // VaultUserDetailProps,
  VaultProps,
  VaultDetailProps,
  VaultUserListDataProps
} from '@/types/vault'

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
  const { account: address } = useProfile()
  // if (!address) {
  //   return { data: VaultUserDetailDefault, isLoading: false, isSuccess: false, refetch: () => {} }
  // }
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
  const { account: address } = useProfile()
  if (!address) {
    return { data: ShareCompositionDefault, isLoading: false, isSuccess: false, refetch: () => {} }
  }
  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'shareCompositionOf',
    args: [vaultAddress, address ?? '0x']
  })
  if (!isLoading && isSuccess && address) {
    // console.log(1111, data)
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

export const useUserVaultList = () => {
  const { account } = useProfile()

  // if (!account) {
  //   return {
  //     data: [] as VaultUserListDataProps[],
  //     isLoading: false,
  //     isSuccess: true,
  //     refetch: () => {}
  //   }
  // }

  const {
    data: sData,
    isSuccess,
    isLoading,
    refetch
  } = useReadContract({
    ...VaultReaderContract,
    functionName: 'userDetailList',
    args: [0, 999, false],
    account: account || undefined
  }) as { data: any[]; isSuccess: boolean; isLoading: boolean; refetch: () => void }

  if (account && !isLoading && isSuccess) {
    const [fundList, detailList] = sData

    const data: VaultUserListDataProps[] = fundList
      .map((item: any, index: number) => {
        const fund: VaultProps = calcVaultBaseInfo(item)
        fund.data = calcVaultUserDetail(detailList[index])
        fund.address = fund.data.address
        return fund
      })
      .filter(
        (item: VaultUserListDataProps) =>
          item.data.subscribingACToken + item.data.unclaimedACToken + item.data.shares !== 0
      )

    // console.log(data, 222)
    return { data, isSuccess, isLoading, refetch }
  }
  return { data: [] as VaultUserListDataProps[], isLoading, isSuccess, refetch }
}
export const useVaultList = () => {
  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'vaultDetailList',
    args: [0, 999, false]
  }) as { data: any[]; isSuccess: boolean; isLoading: boolean; refetch: () => void }

  if (!isLoading && isSuccess) {
    return { data: data.map((item) => calcVaultDetail(item)), isSuccess, isLoading, refetch }
  }
  return { data: [] as VaultDetailProps[], isLoading, isSuccess, refetch }
}

export const useManageVaultList = () => {
  const { account = '' } = useProfile()
  const { data, isSuccess, isLoading, refetch } = useVaultList()
  return {
    data: data.filter((item) => item.manager.toLowerCase() === account.toLowerCase()),
    isSuccess,
    isLoading,
    refetch
  }
}
