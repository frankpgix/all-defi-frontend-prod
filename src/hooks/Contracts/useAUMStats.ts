import { useReadContract } from 'wagmi'
import { useAUMStatsContract } from '@/hooks/Contracts/useContract'
import { GlobalAssetStatisticDefault } from '@/data/vault'
import { calcGlobalAssetStatistic } from '@/compute/vault'

const AUMStatsContract = useAUMStatsContract()

export const useGlobalAssetStats = () => {
  const { isLoading, isSuccess, data } = useReadContract({
    ...AUMStatsContract,
    functionName: 'globalAssetStats'
  })
  if (!isLoading && isSuccess) {
    return { data: calcGlobalAssetStatistic(data), isLoading, isSuccess }
  }
  return { data: GlobalAssetStatisticDefault, isLoading, isSuccess }
}
