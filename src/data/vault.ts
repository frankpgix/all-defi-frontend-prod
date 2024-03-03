import { getTokenByAddress } from '@/config/tokens'
import {
  GlobalAssetStatisticProps,
  VaultBaseInfoProps,
  VaultDetailProps,
  VaultUserDetailProps,
  ShareCompositionProps,
  AssetCompositionProps
} from '@/types/vault'

// Vaults Global Asset Statistics Default Data
export const GlobalAssetStatisticDefault: GlobalAssetStatisticProps = {
  overallAUMInUSD: 0,
  vaultAUMInUSD: 0,
  overallReturnInUSD: 0
}

export const VaultBaseInfoDefault: VaultBaseInfoProps = {
  underlyingToken: getTokenByAddress('0x'),
  acToken: '0x',
  address: '0x',
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
  address: '0x',
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

export const VaultUserDetailDefault: VaultUserDetailProps = {
  address: '0x',
  underlyingToken: getTokenByAddress('0x'),
  status: 1,
  shares: 0,
  aum: 0,
  sharePrice: 0,
  subscribingACToken: 0,
  redeemingShares: 0,
  unclaimedACToken: 0,
  unclaimedALL: 0,
  nav: 0,
  navInUSD: 0,
  underlyingTokenPriceInUSD: 0,
  historyReturn: 0,
  roe: 0,
  beginSharePrice: 0
}

export const ShareCompositionDefault: ShareCompositionProps = {
  balance: 0,
  withholding: 0,
  mining: 0
}

export const AssetCompositionDefault: AssetCompositionProps = {
  token: '', //token地址
  symbol: '', //token符号
  decimals: 18, //精度
  precision: 6, //保留小数位
  amount: 0, //数量
  value: 0, //价值
  percentage: 0 //价值百分比
}
