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

export interface AaveV3DetailAssetTypes {
  id: number
  asset: Token
  blances: number | string
  value: number | string
}
export interface AaveV3DetailTypes {
  collateral: AaveV3DetailAssetTypes[]
  debt: AaveV3DetailAssetTypes[]
}

export interface GMXTradePositionTypes {
  id: number
  collateralToken: Token
  indexToken: Token
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
