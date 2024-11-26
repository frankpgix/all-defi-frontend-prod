import { AddressType, UnderlyingTokenTypes } from '@/types/base'

// Vaults Global Asset Statistics Props
export interface GlobalAssetStatisticProps {
  vaultAUMInUSD: number //基金中的资产规模
  overallAUMInUSD: number //平台总AUM
  overallReturnInUSD: number //历史累计收益
}

// Vault baseInfo Props

// hash,
// underlying,
// acToken: item.acToken,
// address: vaultAddress ?? '0x',
// createTime: Number(safeInterceptionValues(item.createTime, 0, 0)) * 1000,
// name: item.name,
// symbol: item.symbol,
// desc: item.desc,
// manager: item.manager,
// managerName: item.managerName,
// managerFeePercent: 0.2,
// platFeePercent: 0.1,
// minimumStake: Number(safeInterceptionValues(item.minimumStake, precision, decimals)),
// factory: item.factory,
// ceffuWallet: item.ceffuWallet,
// stakeTime: item.stageDurations[0],
// unStakeTime: item.stageDurations[1],
// preSettleTime: item.stageDurations[2],
// settleTime: item.stageDurations[3]
export interface VaultBaseInfoProps {
  hash: string
  underlying: UnderlyingTokenTypes
  // acToken: AddressType
  address: AddressType
  createTime: number
  name: string
  symbol: string
  desc: string
  manager: string
  managerName: string
  managerFeePercent: number
  platFeePercent: number
  minimumStake: number
  // factory: AddressType
  // ceffuWallet: AddressType
  stakeTime: number
  unStakeTime: number
  preSettleTime: number
  settleTime: number
}

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

  zeroSubscribeEndTime: number
  subscribeRedeemEndTime: number
  subscribeEndTime: number
  preSettleEndTime: number
  settleEndTime: number

  beginningAUM: number
  aum: number

  cashBalance: number
  underlyingPriceInUSD: number

  sharePrice: number
  beginningSharePrice: number
  custodianBalance: number
  epochStartBlock: bigint
  // stakingACToken: number
  pendingStake: number
  pendingUnstake: number
  unstakingShare: number

  roe: number
  historicalReturn: number

  managerFee: number
  platFee: number
  // historicalManagerFee: number
  // historicalPlatFee: number
}

// /return {
//     address: item.vaultAddress,
//     hash,
//     underlying,
//     status: Number(safeInterceptionValues(item.stage, 0, 0)),
//     aum: Number(BN(beginSharePrice).times(safeInterceptionValues(item.shares, 18, 18))),
//     beginSharePrice,
//     nav,
//     navInUSD: BN(nav).times(underlyingTokenPriceInUSD).toNumber(),
//     underlyingTokenPriceInUSD,
//     shares,
//     sharePrice,
//     pendingStake,
//     // stakingACToken: Number(safeInterceptionValues(item.stakingACToken, precision, decimals)),
//     unstakingShare: Number(safeInterceptionValues(item.unstakingShare, 4, 18)),
//     // unclaimedACToken: Number(safeInterceptionValues(item.unclaimedACToken, precision, decimals)),
//     historicalReturn: Number(safeInterceptionValues(item.historicalReturn, precision, decimals)),
//     roe
//   }
export interface VaultUserDetailProps {
  hash: string
  address: AddressType
  underlying: UnderlyingTokenTypes
  underlyingTokenPriceInUSD: number
  status: number
  aum: number
  nav: number
  navInUSD: number
  shares: number
  sharePrice: number
  pendingStake: number
  unstakingShare: number
  unclaimedUnderlying: number
  historicalReturn: number
  roe: number
  beginSharePrice: number
}

export interface VaultProps extends VaultBaseInfoProps {
  data?: VaultUserDetailProps | null
  detail?: VaultDetailProps | null
}
// export interface VaultUserListDataProps extends VaultProps {
//   data: VaultUserDetailProps
// }
export interface VaultUserListDataProps {
  base: VaultBaseInfoProps
  detail: VaultDetailProps
  userDetail: VaultUserDetailProps
  underlyingPrice: number
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
