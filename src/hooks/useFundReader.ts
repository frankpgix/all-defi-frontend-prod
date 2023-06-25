import { useContractRead } from 'wagmi'
import { sum, isNaN } from 'lodash'
import BN from 'bignumber.js'

import contracts from '@/config/contracts'
import {
  calcGlobalAssetStatistic,
  calcFundDetail,
  calcFundUserDetail,
  calcShareComposition,
  calcAssetComposition,
  AssetCompositionProps
} from './help'
import {
  // FundBaseInfoProps,
  // FundBaseInfoDefault,
  FundDetailDefault,
  FundUserDataDefault,
  ShareCompositionDefault
} from './help'

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

export const useAssetComposition = (fundAddress: string, baseTokenAddress: string) => {
  const {
    data: sData,
    isLoading,
    refetch
  } = useContractRead({
    ...FundReader,
    functionName: 'assetComposition',
    args: [fundAddress]
  })
  const res = (sData ?? [])
    .map((item) => calcAssetComposition(item, baseTokenAddress))
    .filter((item: AssetCompositionProps) => item.value > 0)
  const sumValue = sum(res.map((item: AssetCompositionProps) => item.value))
  const data = res.map((item: AssetCompositionProps) => {
    const percentage = BN(item.value).div(sumValue).times(100).toNumber()
    item.percentage = isNaN(percentage) ? 0 : percentage
    return item
  })
  return { data, isLoading, refetch }
}
