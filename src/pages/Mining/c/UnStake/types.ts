// import { PoolProps as PoolDataProps } from '@/class/Reward'

// export type PoolProps = PoolDataProps

// export interface FundListProps {
//   list: PoolProps[]
// }
// export interface FundSelectProps extends FundListProps {
//   list: PoolProps[]
//   onSelect: (fund: PoolProps) => void
// }

// export interface StakeProps extends FundListProps {
//   getData: () => void
//   // stakeSharesValue?: number
// }

// export interface StakeArrayItemProps extends PoolProps {
//   amount: number
// }

// import { PoolProps as PoolDataProps } from '@/class/Reward'

import { PoolItemTypes } from '@/types/rewardTracker'

export type PoolProps = PoolItemTypes

export interface FundListProps {
  list: PoolProps[]
}
export interface FundSelectProps extends FundListProps {
  list: PoolProps[]
  onSelect: (fund: PoolProps) => void
  unStake?: boolean
}

export interface StakeProps extends FundListProps {
  getData: () => void
  // stakeSharesValue: number
}

export interface StakeArrayItemProps extends PoolProps {
  amount: number
}
