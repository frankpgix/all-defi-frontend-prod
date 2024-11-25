import { useReadContract } from 'wagmi'

import { usePriceAggregatorContract } from '@/hooks/Contracts/useContract'

import { AddressType, UnderlyingTokenTypes } from '@/types/base'

import { safeInterceptionValues } from '@/utils/tools'

export const useAssetLatestPrice = (assetAddress: AddressType | '', blockNumber?: bigint) => {
  const PriceAggregatorContract = usePriceAggregatorContract()
  const { isLoading, isSuccess, data, refetch } = useReadContract({
    ...PriceAggregatorContract,
    functionName: 'latestPrice',
    args: [assetAddress ?? ''],
    blockNumber
  })
  if (assetAddress && !isLoading && isSuccess) {
    return { data: Number(safeInterceptionValues(data, 18, 18)), isLoading, isSuccess, refetch }
  }
  return { data: 0, isLoading, isSuccess, refetch }
}

export const useAssetLatestPrices = (AssetTokens: UnderlyingTokenTypes[], blockNumber?: bigint) => {
  const PriceAggregatorContract = usePriceAggregatorContract()
  const assetAddress: AddressType[] = AssetTokens.map((asset) => asset.address)
  const { isLoading, isSuccess, data, refetch, error } = useReadContract({
    ...PriceAggregatorContract,
    functionName: 'latestPrices',
    args: [assetAddress],
    blockNumber
  })
  const prices: Record<string, number> = {}
  AssetTokens.forEach((asset) => (prices[asset.address] = 0))
  console.log(error)
  if (assetAddress && !isLoading && isSuccess) {
    ;(data as string[]).forEach(
      (item: string, index: number) =>
        (prices[AssetTokens[index].address] = Number(safeInterceptionValues(item, 18, 18)))
    )
    return { data: prices, isLoading, isSuccess, refetch }
  }
  return { data: prices, isLoading, isSuccess, refetch }
}
