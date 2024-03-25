import { TokenTypes } from '@/types/base'

export interface UniLPDetailTypes {
  id: string
  token0: TokenTypes
  token1: TokenTypes
  fee: string
  tickLower: string
  tickUpper: string
  amount0: string
  amount1: string
  inRange: any
  value: string
  unclaimedFees: string
}

export interface AaveV3DetailAssetTypes {
  id: number
  asset: TokenTypes
  blances: number | string
  value: number | string
}
export interface AaveV3DetailTypes {
  collateral: AaveV3DetailAssetTypes[]
  debt: AaveV3DetailAssetTypes[]
  healthFactor: string
}

export interface GMXTradePositionTypes {
  id: number
  collateralToken: TokenTypes
  indexToken: TokenTypes
  isLong: boolean
  size: string
  collateral: string
  positionFee: string
  fundingFee: string
  unrealizedPnl: string
  entryPrice: string
  markPrice: string
  liquidationPrice: string
  positionValue: string
}

export interface GMXEarnDetailTypes {
  id: number
  glpBlance: string
  glpValue: string
  pendingReward: string
}
