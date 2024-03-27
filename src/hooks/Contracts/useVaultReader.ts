import BN from 'bignumber.js'
import { isNaN, sum } from 'lodash'
import { useReadContract } from 'wagmi'

import { useVaultReaderContract } from '@/hooks/Contracts/useContract'
import { useProfile } from '@/hooks/useProfile'
import { useToken } from '@/hooks/useToken'

import { AddressType, TokenTypes } from '@/types/base'
import {
  AssetCompositionProps,
  VaultDetailProps, // VaultUserDetailProps,
  VaultProps,
  VaultUserListDataProps
} from '@/types/vault'

import {
  calcAssetComposition,
  calcShareComposition,
  calcVaultBaseInfo,
  calcVaultBreachDetail,
  calcVaultDetail,
  calcVaultUpdatingData,
  calcVaultUserDetail
} from '@/compute/vault'
import {
  ShareCompositionDefault,
  VaultBreachDetailDataDefault,
  VaultDetailDefault,
  VaultUpdatingDataDefault,
  VaultUserDetailDefault
} from '@/data/vault'

export const useVaultDetail = (vaultAddress: AddressType) => {
  const VaultReaderContract = useVaultReaderContract()
  const { getTokenByAddress } = useToken()
  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'vaultDetail',
    args: [vaultAddress]
  })
  if (!isLoading && isSuccess) {
    return { data: calcVaultDetail(data, getTokenByAddress), isLoading, isSuccess, refetch }
  }
  return { data: VaultDetailDefault, isLoading, isSuccess, refetch }
}

export const useUserVaultDetail = (vaultAddress: AddressType) => {
  const VaultReaderContract = useVaultReaderContract()
  const { getTokenByAddress } = useToken()
  const { account } = useProfile()
  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'userDetail',
    args: [vaultAddress, account ?? '0x']
  })
  if (!isLoading && isSuccess && account) {
    return { data: calcVaultUserDetail(data, getTokenByAddress), isLoading, isSuccess, refetch }
  }
  return { data: VaultUserDetailDefault, isLoading, isSuccess, refetch }
}

export const useShareCompositionOf = (vaultAddress: AddressType) => {
  const VaultReaderContract = useVaultReaderContract()
  const { account } = useProfile()

  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'shareCompositionOf',
    args: [vaultAddress, account ?? '0x']
  })
  if (!isLoading && isSuccess && account) {
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
  const VaultReaderContract = useVaultReaderContract()
  const { getTokenByAddress } = useToken()
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
      .map((item) => calcAssetComposition(item, underlyingTokenAddress, getTokenByAddress))
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
  const VaultReaderContract = useVaultReaderContract()
  const { getTokenByAddress } = useToken()
  const { account } = useProfile()

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
        const fund: VaultProps = calcVaultBaseInfo(item, getTokenByAddress)
        fund.data = calcVaultUserDetail(detailList[index], getTokenByAddress)
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
  const VaultReaderContract = useVaultReaderContract()
  const { getTokenByAddress } = useToken()
  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'vaultDetailList',
    args: [0, 999, false]
  }) as { data: any[]; isSuccess: boolean; isLoading: boolean; refetch: () => void }

  if (!isLoading && isSuccess) {
    return {
      data: data.map((item) => calcVaultDetail(item, getTokenByAddress)),
      isSuccess,
      isLoading,
      refetch
    }
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

export const useVaultBreachDetail = (vaultAddress: AddressType) => {
  const VaultReaderContract = useVaultReaderContract()
  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'vaultBreachDetail',
    args: [vaultAddress]
  }) as { data: any; isSuccess: boolean; isLoading: boolean; refetch: () => void }

  if (!isLoading && isSuccess) {
    return { data: calcVaultBreachDetail(data), isSuccess, isLoading, refetch }
  }
  return { data: VaultBreachDetailDataDefault, isSuccess, isLoading, refetch }
}

export const useVaultUpdatingData = (vaultAddress: AddressType, underlyingToken: TokenTypes) => {
  const VaultReaderContract = useVaultReaderContract()
  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'vaultUpdatingData',
    args: [vaultAddress]
  }) as { data: [AddressType, BigInt]; isSuccess: boolean; isLoading: boolean; refetch: () => void }
  if (!isLoading && isSuccess) {
    // console.log(data, 'data')
    return { data: calcVaultUpdatingData(data, underlyingToken), isSuccess, isLoading, refetch }
  }
  return { data: VaultUpdatingDataDefault, isSuccess, isLoading, refetch }
}
