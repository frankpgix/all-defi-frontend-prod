import { UNKNOWN } from '@/config/tokens'

import {
  AssetCompositionProps,
  GlobalAssetStatisticProps,
  ShareCompositionProps,
  VaultBaseInfoProps,
  VaultBreachDetailProps,
  VaultDetailProps,
  VaultStakeProps,
  VaultUpdatingDataProps,
  VaultUserDetailProps
} from '@/types/vault'

// Vaults Global Asset Statistics Default Data
export const GlobalAssetStatisticDefault: GlobalAssetStatisticProps = {
  overallAUMInUSD: 0,
  vaultAUMInUSD: 0,
  overallReturnInUSD: 0
}

export const VaultBaseInfoDefault: VaultBaseInfoProps = {
  hash: '',
  underlying: UNKNOWN as any,
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
  minimumStake: 0,
  factory: '0x',
  ceffuWallet: '0x',
  stakeTime: 0,
  unStakeTime: 0,
  preSettleTime: 0,
  settleTime: 0
}

export const VaultDetailDefault: VaultDetailProps = {
  hash: '',
  underlyingToken: UNKNOWN as any,
  address: '0x',
  name: '-',
  manager: '-',
  createTime: 0,
  epochIndex: 1,
  epochStartTime: 0,
  // stageEndTime: [0, 0, 0, 0], //阶段截止时间。0申购赎回，1申购，2预结算 3结算
  status: -2,
  isClosed: false,

  subscribeRedeemEndTime: 0,
  subscribeEndTime: 0,
  preSettleEndTime: 0,
  settleEndTime: 0,

  beginningAUM: 0,
  aum: 0,

  underlyingPriceInUSD: 0,
  underlyingBalance: 0,

  sharePrice: 0,
  stakingACToken: 0,
  unstakingShare: 0,

  roe: 0,
  historicalReturn: 0,

  managerFee: 0,
  platFee: 0,
  historicalManagerFee: 0,
  historicalPlatFee: 0
}

// address: item.vaultAddress,
//   hash,
//   underlying,
//   status: Number(safeInterceptionValues(item.stage, 0, 0)),
//   // aum: Number(safeInterceptionValues(item.beginningAUM, precision, decimals)),
//   aum: Number(BN(beginSharePrice).times(safeInterceptionValues(item.shares, 18, 18))),
//   beginSharePrice,
//   nav,
//   navInUSD: BN(nav).times(underlyingTokenPriceInUSD).toNumber(),
//   underlyingTokenPriceInUSD,
//   shares: Number(safeInterceptionValues(item.shares, 4, 18)),
//   sharePrice: Number(safeInterceptionValues(item.sharePrice, 4, 18)),
//   stakingACToken: Number(safeInterceptionValues(item.stakingACToken, precision, decimals)),
//   unstakingShare: Number(safeInterceptionValues(item.unstakingShare, 4, 18)),
//   unclaimedACToken: Number(safeInterceptionValues(item.unclaimedACToken, precision, decimals)),
//   historicalReturn: Number(safeInterceptionValues(item.historicalReturn, precision, decimals)),
// roe: Number(safeInterceptionValues(item.roe, 4, 16))

export const VaultUserDetailDefault: VaultUserDetailProps = {
  hash: '',
  address: '0x',
  underlying: UNKNOWN as any,
  status: 1,
  shares: 0,
  aum: 0,
  sharePrice: 0,
  stakingACToken: 0,
  unstakingShare: 0,
  unclaimedACToken: 0,
  nav: 0,
  navInUSD: 0,
  underlyingTokenPriceInUSD: 0,
  historicalReturn: 0,
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

export const VaultStakeDataDefault: VaultStakeProps = {
  stakedALL: 0,
  value: 0
}

export const VaultBreachDetailDataDefault: VaultBreachDetailProps = {
  hash: '',
  address: '0x',
  latestFrozenALL: 0,
  latestConfiscatedALL: 0,
  consecutiveBreachCount: 0,
  managerPaused: false
}

export const VaultUpdatingDataDefault: VaultUpdatingDataProps = {
  verifyStatus: -1,
  data: {
    desc: '',
    managerName: '',
    derivativesToAdd: [],
    derivativesToRemove: [],
    assetsToAdd: [],
    assetsToRemove: [],
    allocationLimits: []
  }
}
