import { AddressType, UnderlyingTokenTypes } from '@/types/base'

// Vaults Global Asset Statistics Props
export interface GlobalAssetStatisticProps {
  vaultAUMInUSD: number //基金中的资产规模
  overallAUMInUSD: number //平台总AUM
  overallReturnInUSD: number //历史累计收益
}

// Vault baseInfo Props
export interface VaultBaseInfoProps {
  hash: string
  underlyingToken: UnderlyingTokenTypes
  acToken: AddressType
  address: AddressType
  createTime: number
  name: string
  symbol: string
  desc: string
  manager: string
  managerName: string
  managerFeePercent: number
  platFeePercent: number
  derivatives: AddressType[]
  derivativesInfo: { name: string; value: AddressType }[]
  subscriptionMinLimit: number
  subscriptionMaxLimit: number
}

// beginningAUM: Number(safeInterceptionValues(item.beginningAUM, decimals, decimals)),
// aum: Number(safeInterceptionValues(item.aum, decimals, decimals)),

// underlyingBalance: Number(safeInterceptionValues(item.underlyingBalance, decimals, decimals)),
// underlyingPriceInUSD: Number(safeInterceptionValues(item.underlyingPriceInUSD, 4, 18)),

// sharePrice: Number(safeInterceptionValues(item.sharePrice, 4, 18)),
// stakingACToken: Number(safeInterceptionValues(item.stakingACToken, decimals, decimals)),
// unstakingShare: Number(safeInterceptionValues(item.unstakingShare)),

// roe: Number(safeInterceptionValues(item.roe, 4, 16)),
// historicalReturn: Number(safeInterceptionValues(item.historicalReturn, decimals, decimals)),

// managerFee: Number(safeInterceptionValues(item.managerFee, decimals, decimals)),
// platFee: Number(safeInterceptionValues(item.platFee, decimals, decimals)),
// historicalManagerFee: Number(
//   safeInterceptionValues(item.historicalManagerFee, decimals, decimals)
// ),
// historicalPlatFee: Number(safeInterceptionValues(item.historicalPlatFee, decimals, decimals))

export interface VaultDetailProps {
  hash: string
  underlyingToken: UnderlyingTokenTypes
  address: AddressType
  name: string
  manager: string
  createTime: number
  epochIndex: number
  epochStartTime: number
  // stageEndTime: [number, number, number, number] //阶段截止时间。0申购赎回，1申购，2预结算 3结算
  status: number
  isClosed: boolean

  subscribeRedeemEndTime: number
  subscribeEndTime: number
  preSettleEndTime: number
  settleEndTime: number

  beginningAUM: number
  aum: number

  underlyingBalance: number
  underlyingPriceInUSD: number

  sharePrice: number
  stakingACToken: number
  unstakingShare: number

  roe: number
  historicalReturn: number

  managerFee: number
  platFee: number
  historicalManagerFee: number
  historicalPlatFee: number
}

export interface VaultUserDetailProps {
  hash: string
  address: AddressType
  underlyingToken: UnderlyingTokenTypes
  underlyingTokenPriceInUSD: number
  status: number
  aum: number
  nav: number
  navInUSD: number
  shares: number
  sharePrice: number
  subscribingACToken: number
  redeemingShares: number
  unclaimedACToken: number
  unclaimedALL: number
  historyReturn: number
  roe: number
  beginSharePrice: number
}

export interface VaultProps extends VaultBaseInfoProps {
  data?: VaultUserDetailProps | null
  detail?: VaultDetailProps | null
}
export interface VaultUserListDataProps extends VaultProps {
  data: VaultUserDetailProps
}

export interface ShareCompositionProps {
  balance: number
  withholding: number
  mining: number
}

export interface AssetCompositionProps {
  token: string //token地址
  symbol: string //token符号
  decimals: number //精度
  precision: number //保留小数位
  amount: number //数量
  value: number //价值
  percentage: number //价值百分比
}

export interface baseTokenPriceInUSDTypes {
  address: string
  tokenName: string
  priceInUSD: number
}

export interface VaultVerifiedItemTypes {
  address: AddressType
  manager: AddressType
  hash: AddressType
  type: number
  result: boolean
  data: string
}

export interface VaultStakeProps {
  stakedALL: number
  value: number
}

export interface VaultBreachDetailProps {
  hash: string
  address: AddressType //基金id/地址
  latestFrozenALL: number //上轮冻结ALL
  latestConfiscatedALL: number //上轮扣除ALL
  consecutiveBreachCount: number //连续违约次数
  managerPaused: boolean //经理操作权限被冻结
}

export interface VaultUpdatingDataProps {
  verifyStatus: number
  data: {
    desc: string
    managerName: string
    derivativesToAdd: string[]
    derivativesToRemove: string[]
    assetsToAdd: string[]
    assetsToRemove: string[]
    allocationLimits: string[]
  }
}

export interface VaultDerivativesProps {
  name: string
  value: AddressType
}

export type VaultStakeType = 'increase' | 'reduce'

export interface DirectionProps {
  direction: VaultStakeType
}

export interface VaultHashTypes {
  address: AddressType
  hash: string
}
