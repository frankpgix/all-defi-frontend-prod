import { useContractRead } from 'wagmi'
import contracts from '@/config/contracts'
import { calcGlobalAssetStatistic } from './help'

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
