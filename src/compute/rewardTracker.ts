import { safeInterceptionValues } from '@/utils/tools'

import { PoolItemTypes } from '@/types/rewardTracker'

export const calcPoolItemData = (data: any[]): PoolItemTypes[] => {
  return data.map((item) => ({
    shareToken: item.shareToken,
    symbol: item.symbol,
    sharePriceInUSD: Number(safeInterceptionValues(item.sharePriceInUSD, 4, 18)),
    shareBalance: Number(safeInterceptionValues(item.shareBalance, 4, 18)),
    stakedShare: Number(safeInterceptionValues(item.stakedShare, 4, 18))
  }))
}
