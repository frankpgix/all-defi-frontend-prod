import { FundDetailProps, FundStakeProps } from '@/class/help'

export interface DirectionProps {
  direction: string
}

export interface StakeProps extends DirectionProps {
  fundData: FundDetailProps
  stakeData: FundStakeProps
  multiple: number
  fundAddress: string
  getData: () => void
}
