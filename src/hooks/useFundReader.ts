import { useContractRead } from 'wagmi'
import contracts from '@/config/contracts'
import {
  calcGlobalAssetStatistic,
  calcFundDetail,
  calcFundUserDetail,
  calcShareComposition
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
  const data = calcFundDetail(sData)
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
  const data = calcFundUserDetail(sData)
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
  const data = calcShareComposition(sData)
  // const data = {}
  return { data, isLoading, refetch }
}
