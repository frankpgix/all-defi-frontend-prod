import Token from '@/class/Token'

export interface UniLPDetailTypes {
  id: string
  token0: Token
  token1: Token
  fee: string
  tickLower: string
  tickUpper: string
  amount0: string
  amount1: string
  inRange: any
  value: string
  unclaimedFees: string
}
