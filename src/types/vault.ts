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
  acToken: string
  address: string
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
  address: string
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
