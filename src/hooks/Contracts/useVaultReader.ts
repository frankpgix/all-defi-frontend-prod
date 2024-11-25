import BN from 'bignumber.js'
import { isNaN, sum } from 'lodash'
// import { base } from 'viem/chains'
import { useReadContract, useReadContracts } from 'wagmi'

import VaultABI from '@/config/abi/VaultSimple.json'

import { useVaultReaderContract } from '@/hooks/Contracts/useContract'
import { useAssetLatestPrices } from '@/hooks/Contracts/usePriceAggregator'
import { useProfile } from '@/hooks/useProfile'
import { useToken, useUnderlyingTokens } from '@/hooks/useToken'
import { useVaultList as useVaultListHook } from '@/hooks/useVaultList'

import { AddressType, TokenTypes } from '@/types/base'
import {
  AssetCompositionProps,
  VaultDetailProps, // VaultUserDetailProps,
  // VaultProps,
  VaultUserListDataProps
} from '@/types/vault'

import {
  calcAssetComposition, // calcGlobalAUMStats,
  calcShareComposition,
  calcVaultBaseInfo,
  calcVaultBreachDetail,
  calcVaultDetail,
  calcVaultHash,
  calcVaultUpdatingData,
  calcVaultUserDetail
} from '@/compute/vault'
import {
  // GlobalAUMStatsDataDefault,
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
  console.log(data, 'useVaultDetail')
  if (!isLoading && isSuccess) {
    return { data: calcVaultDetail(data, getTokenByAddress), isLoading, isSuccess, refetch }
  }
  return { data: VaultDetailDefault, isLoading, isSuccess, refetch }
}

export const useVaultBaseAddressList = () => {
  // vaultList
  const VaultReaderContract = useVaultReaderContract()
  const { data, isSuccess, isLoading, isRefetching } = useReadContract({
    ...VaultReaderContract,
    functionName: 'vaultList'
  }) as { data: AddressType[]; isSuccess: boolean; isLoading: boolean; isRefetching: boolean }
  if (!isLoading && isSuccess) {
    return { data, isLoading, isSuccess, isRefetching }
  }
  return { data: [], isLoading, isSuccess, isRefetching }
}

export const useVaultBaseList = () => {
  // vaultList
  const { data: address, isLoading: loading, isSuccess: success } = useVaultBaseAddressList()
  const { getTokenByAddress } = useToken()
  const contracts = address.map((item) => ({
    address: item,
    abi: VaultABI as any,
    functionName: 'baseInfo'
  }))
  // console.log(11122, contracts)
  const { data, isSuccess, isLoading } = useReadContracts({ contracts })
  console.log(11122, data, isSuccess, isLoading)
  if (!isLoading && isSuccess && !loading && success) {
    // console.log(data, 1234, isSuccess, isLoading)
    const res = data.map((item, index) =>
      calcVaultBaseInfo(item.result, getTokenByAddress, contracts[index].address)
    )
    // console.log(res)
    return { data: res, isLoading, isSuccess }
  }
  return { data: [], isLoading, isSuccess }
}

export const useUserVaultDetail = (vaultAddress: AddressType) => {
  const VaultReaderContract = useVaultReaderContract()
  const { getTokenByAddress } = useToken()
  const { account } = useProfile()
  const { vaultList } = useVaultListHook()
  // console.log('vaultList', vaultList)
  const { data, isSuccess, isLoading, refetch, isRefetching } = useReadContract({
    ...VaultReaderContract,
    functionName: 'userDetail',
    args: [vaultAddress, account ?? '0x']
  })
  if (!isLoading && isSuccess && account) {
    const valut = vaultList.find(
      (vault) => vault.address.toLocaleLowerCase() === vaultAddress.toLocaleLowerCase()
    )
    return {
      data: calcVaultUserDetail(data, getTokenByAddress, valut?.underlyingPriceInUSD ?? 1),
      isLoading,
      isSuccess,
      isRefetching,
      refetch
    }
  }
  return { data: VaultUserDetailDefault, isLoading, isSuccess, isRefetching, refetch }
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
  const underlyingTokens = useUnderlyingTokens()
  const { data: baseList, isLoading: baseLoading, isSuccess: baseSuccess } = useVaultBaseList()
  // console.log('baseList', baseList)
  const { account } = useProfile()
  // const { vaultList } = useVaultListHook()
  const { data: vaultList, isLoading: isListLoading } = useVaultList()
  const vaultLists = vaultList.filter((item) => item.status !== -1)
  const {
    data: price,
    isSuccess: priceSuccess,
    isLoading: priceLoading
  } = useAssetLatestPrices(underlyingTokens)
  console.log('baseList', price, priceSuccess, priceLoading)
  const {
    data: sData,
    isSuccess,
    isLoading,
    refetch,
    error
  } = useReadContract({
    ...VaultReaderContract,
    functionName: 'userDetailList',
    args: [0, 999],
    account: account || undefined
  }) as { data: any[]; isSuccess: boolean; isLoading: boolean; refetch: () => void; error: any }
  // console.log(error)
  if (error) {
    console.error(error)
  }
  if (account && !isLoading && isSuccess && !isListLoading && !baseLoading && baseSuccess) {
    // console.log('vaultList', vaultLists, sData)
    const data = sData.map((item: any) => {
      // console.log(item)
      const base = baseList.find((base) => base.address === item.vaultAddress)
      if (!base) return null
      // console.log(fund)
      const detail = vaultLists.find((vault) => vault.address === item.vaultAddress)
      // console.log(fund, detail)
      const userDetail = calcVaultUserDetail(
        item,
        getTokenByAddress,
        price[base.underlying.address] ?? 1
      )
      // console.log(base, detail, userDetail)
      return { base, detail, userDetail }
    })

    return { data, isSuccess, isLoading, refetch }
  }
  return { data: [] as VaultUserListDataProps[], isLoading, isSuccess, refetch }
}
export const useVaultList = () => {
  const VaultReaderContract = useVaultReaderContract()
  const { getTokenByAddress } = useToken()
  const { error, data, isSuccess, isLoading, refetch, isRefetching } = useReadContract({
    ...VaultReaderContract,
    functionName: 'vaultDetailList',
    args: [0, 999]
  }) as {
    error: any
    data: any[]
    isSuccess: boolean
    isLoading: boolean
    isRefetching: boolean
    refetch: () => void
  }
  console.log(123456, data, isLoading, isSuccess, isRefetching, 'isRefetching')

  if (error) {
    console.error(error)
  }
  if (!isLoading && isSuccess) {
    // console.log(123456, data, isLoading, isSuccess, isRefetching, 'isRefetching')
    return {
      data: (data ?? []).map((item) => calcVaultDetail(item, getTokenByAddress)),
      isSuccess,
      isLoading,
      isRefetching,
      refetch
    }
  }

  return {
    data: [] as VaultDetailProps[],
    isLoading,
    isSuccess,
    isRefetching,
    refetch
  }
}

export const useVaultHashList = () => {
  const VaultReaderContract = useVaultReaderContract()
  const { data, isSuccess, isLoading, refetch } = useReadContract({
    ...VaultReaderContract,
    functionName: 'vaultList'
  }) as { data: AddressType[]; isSuccess: boolean; isLoading: boolean; refetch: () => void }

  if (!isLoading && isSuccess) {
    return { data: data.map((address) => calcVaultHash(address)), isSuccess, isLoading, refetch }
  }
  return { data: [], isSuccess, isLoading, refetch }
}

export const useManageVaultList = () => {
  const { account = '' } = useProfile()
  const { data, isSuccess, isLoading, refetch, isRefetching } = useVaultList()
  return {
    data: data.filter((item) => item.manager.toLowerCase() === account.toLowerCase()),
    isSuccess,
    isLoading,
    isRefetching,
    refetch: () => {
      console.log('refetch')
      refetch()
    }
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

// export const useGlobalAUMStats = () => {
//   const VaultReaderContract = useVaultReaderContract()
//   const { data, isSuccess, isLoading, refetch } = useReadContract({
//     ...VaultReaderContract,
//     functionName: 'globalAUMStats',
//     args: []
//   }) as { data: bigint[]; isSuccess: boolean; isLoading: boolean; refetch: () => void; error: any }
//   // console.log(error, isSuccess, 'data')
//   if (!isLoading && isSuccess) {
//     // console.log(data, 'data')
//     return { data: calcGlobalAUMStats(data), isSuccess, isLoading, refetch }
//   }
//   return { data: GlobalAUMStatsDataDefault, isSuccess, isLoading, refetch }
// }
