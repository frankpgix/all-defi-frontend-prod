import { create } from 'zustand'

import { useAssetLatestPrices } from '@/hooks/Contracts/usePriceAggregator'
import { useUnderlyingTokens } from '@/hooks/useToken'

interface AssetPriceState {
  assetsPrice: Record<string, number> | null
  loading: boolean
  update: () => Promise<void>
}

export const useAssetsPriceStore = create<AssetPriceState>((set) => ({
  assetsPrice: null,
  loading: false,
  update: async () => {
    set({ loading: true })
    const underlyingTokens = useUnderlyingTokens()
    const { data, isSuccess, refetch } = useAssetLatestPrices(underlyingTokens)
    await refetch()
    if (isSuccess) {
      set({ assetsPrice: data, loading: false })
    } else {
      set({ loading: false })
    }
  }
}))
