import { getTokenByAddress } from '@/config/tokens'
import { GlobalAssetStatisticProps, VaultBaseInfoProps, VaultDetailProps } from '@/types/vault'

// Vaults Global Asset Statistics Default Data
export const GlobalAssetStatisticDefault: GlobalAssetStatisticProps = {
  overallAUMInUSD: 0,
  vaultAUMInUSD: 0,
  overallReturnInUSD: 0
}

export const VaultBaseInfoDefault: VaultBaseInfoProps = {
  underlyingToken: getTokenByAddress('0x'),
  acToken: '',
  address: '-',
  createTime: 0,
  name: '-',
  symbol: '-',
  desc: '-',
  manager: '-',
  managerName: '-',
  managerFeePercent: 0,
  platFeePercent: 0,
  derivatives: [],
  derivativesInfo: [],
  subscriptionMinLimit: 0,
  subscriptionMaxLimit: 0
}

export const VaultDetailDefault: VaultDetailProps = {
  underlyingToken: getTokenByAddress('0x'),
  address: '-',
  name: '-',
  manager: '-',
  createTime: 0,
  epochIndex: 1,
  epochStartTime: 0,
  // stageEndTime: [0, 0, 0, 0], //阶段截止时间。0申购赎回，1申购，2预结算 3结算
  status: -2,

  subscribeRedeemEndTime: 0,
  subscribeEndTime: 0,
  preSettleEndTime: 0,
  settleEndTime: 0,

  settleAUMLimit: 0,
  realtimeAUMLimit: 0,
  aum: 0,
  nav: 0,

  sharePrice: 0,
  baseTokenPriceInUSD: 0,
  costPrice: 0,
  unusedAsset: 0,
  subscribingACToken: 0,
  redeemingShares: 0,
  miningShares: 0,

  roe: 0,
  lastRoe: 0,
  historyReturn: 0,
  lastRedemptionRatio: 0,

  managerFee: 0,
  platFee: 0,
  lastManagerFee: 0,
  historyManagerFee: 0
}
