import { useReadContract } from 'wagmi'
import { useAUMStatsContract } from '@/hooks/useContract'
import { safeInterceptionValues } from '@/utils/tools'

const AUMStatsContract = useAUMStatsContract()

export interface GlobalAssetStatisticProps {
  vaultAUMInUSD: number //基金中的资产规模
  overallAUMInUSD: number //平台总AUM
  overallReturnInUSD: number //历史累计收益
}

export const GlobalAssetStatisticDefault = {
  overallAUMInUSD: 0,
  vaultAUMInUSD: 0,
  overallReturnInUSD: 0
}

export const calcGlobalAssetStatistic = (item: any): GlobalAssetStatisticProps => {
  return {
    overallAUMInUSD: Number(safeInterceptionValues(item[0])),
    vaultAUMInUSD: Number(safeInterceptionValues(item[1])),
    overallReturnInUSD: Number(safeInterceptionValues(item[2]))
  }
}

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
