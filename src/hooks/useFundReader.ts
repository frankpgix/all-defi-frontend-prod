import { useContractRead } from 'wagmi'
import { sum, isNaN } from 'lodash'
import BN from 'bignumber.js'

import contracts from '@/config/contracts'
import {
  calcGlobalAssetStatistic,
  calcFundBaseInfo,
  calcFundDetail,
  calcFundUserDetail,
  calcShareComposition,
  calcAssetComposition,
  AssetCompositionProps
} from './help'
import {
  AddressType,
  FundUserListDataProps,
  FundProps,
  FundDetailDefault,
  FundUserDataDefault,
  ShareCompositionDefault
} from './help'

import { ReadContProps } from './types'

const FundReader = contracts.FundReader

export const useGlobalAssetStatistic = () => {
  const {
    data: sData,
    isLoading,
    refetch
  } = useContractRead({
    ...FundReader,
    functionName: 'globalAssetStatistic'
  })
  const data = calcGlobalAssetStatistic(sData)
  return { data, isLoading, refetch }
}

export const useFundDetail = (fundAddress: string) => {
  const {
    data: sData,
    isLoading,
    refetch
  } = useContractRead({
    ...FundReader,
    functionName: 'fundDetail',
    args: [fundAddress]
  })
  // console.log(calcFundDetail(sData))
  const data = sData ? calcFundDetail(sData) : FundDetailDefault
  return { data, isLoading, refetch }
}

export const useFundUserDetail = (fundAddress: string, userAddress: string) => {
  const {
    data: sData,
    isLoading,
    refetch
  } = useContractRead({
    ...FundReader,
    functionName: 'userDetail',
    args: [fundAddress, userAddress]
  })
  // console.log(sData)
  // console.log(calcFundUserDetail(sData))
  const data = sData ? calcFundUserDetail(sData) : FundUserDataDefault
  return { data, isLoading, refetch }
}

export const useShareComposition = (fundAddress: string, userAddress: string) => {
  // console.log(FundReader, fundAddress, userAddress)
  const {
    data: sData,
    isLoading,
    refetch
  } = useContractRead({
    ...FundReader,
    functionName: 'shareCompositionOf',
    args: [fundAddress, userAddress]
  })
  // console.log('shareCompositionOf', sData)
  // console.log(calcFundUserDetail(sData))
  const data = sData ? calcShareComposition(sData) : ShareCompositionDefault
  // const data = {}
  return { data, isLoading, refetch }
}

interface AssetCompositionSDataProps extends ReadContProps {
  data: any[]
}

export const useAssetComposition = (fundAddress: string, baseTokenAddress: string) => {
  const {
    data: sData,
    isLoading,
    refetch
  } = useContractRead({
    ...FundReader,
    functionName: 'assetComposition',
    args: [fundAddress]
  }) as AssetCompositionSDataProps
  const res = (sData ?? [])
    .map((item: any) => calcAssetComposition(item, baseTokenAddress))
    .filter((item: AssetCompositionProps) => item.value > 0)
  const sumValue = sum(res.map((item: AssetCompositionProps) => item.value))
  const data = res.map((item: AssetCompositionProps) => {
    const percentage = BN(item.value).div(sumValue).times(100).toNumber()
    item.percentage = isNaN(percentage) ? 0 : percentage
    return item
  })
  return { data, isLoading, refetch }
}

export const useUserDetailList = (userAddress: AddressType) => {
  const {
    data: sData,
    isLoading,
    refetch
  } = useContractRead({
    ...FundReader,
    functionName: 'userDetailList',
    args: [0, 999],
    account: userAddress
  })
  // @ts-ignore
  const [fundList, detailList] = sData
  const data = (fundList ?? [])
    .map((item: any, index: number) => {
      const fund: FundProps = calcFundBaseInfo(item)
      fund.data = calcFundUserDetail((detailList ?? [])[index])
      fund.address = fund.data.address
      return fund
    })
    .filter(
      (item: FundUserListDataProps) =>
        item.data.subscribingACToken + item.data.unclaimedACToken + item.data.shares !== 0
    )
  // console.log(list)
  // const data = []
  return { data, isLoading, refetch }
}
