// import { AddressType } from '@/config/types'

export interface PoolItemTypes {
  shareToken: `0x${string}`
  symbol: string
  sharePriceInUSD: number
  shareBalance: number
  stakedShare: number
}

export interface PoolVaultListTypes {
  list: PoolItemTypes[]
}
export interface PoolVaultSelectTypes extends PoolVaultListTypes {
  list: PoolItemTypes[]
  onSelect: (Vault: PoolItemTypes) => void
  unStake?: boolean
}

export interface PoolStakeTypes extends PoolVaultListTypes {
  getData: () => void
  // stakeSharesValue: number
}

export interface PoolStakeArrayItemTypes extends PoolItemTypes {
  amount: number
}

export interface RewardDashboardType {
  sALL: number
  claimedReward: number
  pendingReward: number
}
