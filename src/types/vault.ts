import { AddressType } from '@/types/base'
import Token from '@/class/Token'

// Vaults Global Asset Statistics Props
export interface GlobalAssetStatisticProps {
  vaultAUMInUSD: number //基金中的资产规模
  overallAUMInUSD: number //平台总AUM
  overallReturnInUSD: number //历史累计收益
}

// Vault baseInfo Props
export interface VaultBaseInfoProps {
  underlyingToken: Token
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

export interface VaultDetailProps {
  underlyingToken: Token
  address: AddressType
  name: string
  manager: string
  createTime: number
  epochIndex: number
  epochStartTime: number
  // stageEndTime: [number, number, number, number] //阶段截止时间。0申购赎回，1申购，2预结算 3结算
  status: number

  subscribeRedeemEndTime: number
  subscribeEndTime: number
  preSettleEndTime: number
  settleEndTime: number

  settleAUMLimit: number
  realtimeAUMLimit: number
  aum: number
  nav: number

  sharePrice: number
  baseTokenPriceInUSD: number
  costPrice: number
  unusedAsset: number
  subscribingACToken: number
  redeemingShares: number
  miningShares: number

  roe: number
  lastRoe: number
  historyReturn: number
  lastRedemptionRatio: number

  managerFee: number
  platFee: number
  lastManagerFee: number
  historyManagerFee: number
}

export interface VaultUserDetailProps {
  address: AddressType
  underlyingToken: Token
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
