import { useReadContract } from 'wagmi'

import { useAUMStatsContract } from '@/hooks/Contracts/useContract'

import { calcGlobalAssetStatistic } from '@/compute/vault'
import { GlobalAssetStatisticDefault } from '@/data/vault'

export const useGlobalAssetStats = () => {
  const AUMStatsContract = useAUMStatsContract()
  const { isLoading, isSuccess, data } = useReadContract({
    ...AUMStatsContract,
    functionName: 'globalAssetStats'
  })
  if (!isLoading && isSuccess) {
    return { data: calcGlobalAssetStatistic(data), isLoading, isSuccess }
  }
  return { data: GlobalAssetStatisticDefault, isLoading, isSuccess }
}
