import BN from 'bignumber.js'

import { bigInt2Number } from '@/utils/tools'
import { getTokenByAddress } from '@/config/tokens'
// 全局统计信息三件套

export interface GlobalAssetStatisticProps {
  aum: number //管理资产量
  assetInFunds: number //策略池中的资金
  historyReturn: number //历史收益
}
export const GlobalAssetStatisticDefault = {
  assetInFunds: 0,
  aum: 0,
  historyReturn: 0
}
export const calcGlobalAssetStatistic = (item: any): GlobalAssetStatisticProps => {
  return {
    assetInFunds: bigInt2Number(item.assetInFunds, 18, 2),
    aum: bigInt2Number(item.aum, 18, 2),
    historyReturn: bigInt2Number(item.historyReturn, 18, 2)
  }
}

// 基金基础数据三件套
export interface FundBaseInfoProps {
  baseToken: string
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
  derivatives: string[]
  subscriptionMinLimit: number
  subscriptionMaxLimit: number
}

export const calcFundBaseInfo = (item: any): FundBaseProps => {
  // console.log(1234, item)
  const baseTokenObj = getTokenByAddress(item.baseToken)
  const decimals = baseTokenObj.decimals
  const precision = baseTokenObj.precision
  // const decimals = getDecimalsByAddress(item.baseToken)
  // console.log(1234, item, item.baseToken, decimals, safeInterceptionValues(item.subscriptionLimit[1], 6, 18))
  return {
    baseToken: item.baseToken,
    acToken: item.acToken,
    address: item.fundId,
    createTime: bigInt2Number(item.createTime, 0, 0) * 1000,
    name: item.name,
    symbol: item.symbol,
    desc: item.desc,
    manager: item.manager,
    managerName: item.managerName,
    managerFeePercent: bigInt2Number(item.managerFee, 2, 2),
    platFeePercent: bigInt2Number(item.platFee, 2, 2),
    derivatives: item.supportedDerivatives,
    subscriptionMinLimit: bigInt2Number(item.subscriptionLimit[0], decimals, precision),
    subscriptionMaxLimit: bigInt2Number(item.subscriptionLimit[1], decimals, precision)
  }
}

export const FundBaseInfoDefault = {
  baseToken: '',
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
  subscriptionMinLimit: 0,
  subscriptionMaxLimit: 0
}

// 基金详细数据三件套
export interface FundDetailProps {
  baseToken: string
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

export const calcFundDetail = (item: any) => {
  const epochStartTime = bigInt2Number(item.epochStartTime, 0, 0) * 1000
  const baseTokenObj = getTokenByAddress(item.baseToken)
  const decimals = baseTokenObj.decimals
  const precision = baseTokenObj.precision
  // console.log(item)
  return {
    baseTokenObj,
    baseToken: item.baseToken,
    address: item.fundId,
    name: item.name,
    manager: item.manager,
    createTime: bigInt2Number(item.createTime, 0, 0) * 1000,
    epochIndex: bigInt2Number(item.epochIndex, 0, 0),
    epochStartTime,
    status: bigInt2Number(item.status, 0, 0) + 1,

    subscribeRedeemEndTime: epochStartTime + bigInt2Number(item.stageEndTime[0], 0, 0) * 1000,
    subscribeEndTime: epochStartTime + bigInt2Number(item.stageEndTime[1], 0, 0) * 1000,
    preSettleEndTime: epochStartTime + bigInt2Number(item.stageEndTime[2], 0, 0) * 1000,
    settleEndTime: epochStartTime + bigInt2Number(item.stageEndTime[3], 0, 0) * 1000,

    settleAUMLimit: bigInt2Number(item.settleAUMLimit, decimals, precision),
    realtimeAUMLimit: bigInt2Number(item.realtimeAUMLimit, decimals, precision),
    aum: bigInt2Number(item.aum, decimals, precision),
    nav: bigInt2Number(item.nav, decimals, precision),

    sharePrice: bigInt2Number(item.sharePrice, 18, 4),
    baseTokenPriceInUSD: bigInt2Number(item.baseTokenPriceInUSD, 18, 4),
    costPrice: bigInt2Number(item.costPrice, 18, 4),
    unusedAsset: bigInt2Number(item.unusedAsset, decimals, precision),
    subscribingACToken: bigInt2Number(item.subscribingACToken, decimals, precision),
    redeemingShares: bigInt2Number(item.redeemingShares, 18, 18),
    miningShares: bigInt2Number(item.miningShares, 18, 18),

    roe: bigInt2Number(item.roe, 16, 4),
    lastRoe: bigInt2Number(item.lastRoe, 16, 4),
    lastRedemptionRatio: bigInt2Number(item.lastRedemptionRatio, 16, 4),
    historyReturn: bigInt2Number(item.historyReturn, decimals, precision),

    managerFee: bigInt2Number(item.managerFee, decimals, precision),
    platFee: bigInt2Number(item.platFee, decimals, precision),
    lastManagerFee: bigInt2Number(item.lastManagerFee, decimals, precision),
    historyManagerFee: bigInt2Number(item.historyManagerFee, decimals, precision)
  }
}

export const FundDetailDefault = {
  baseToken: '',
  address: '-',
  name: '-',
  manager: '-',
  createTime: 0,
  epochIndex: 0,
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

// 个人基金数据三件套
export const calcFundUserDetail = (item: any): FundUserDataProps => {
  const baseTokenObj = getTokenByAddress(item.baseToken)
  const decimals = baseTokenObj.decimals
  const precision = baseTokenObj.precision

  const nav = bigInt2Number(item.nav, decimals, precision)
  const baseTokenPriceInUSD = bigInt2Number(item.baseTokenPriceInUSD, 18, 4)
  return {
    address: item.fundId,
    baseToken: item.baseToken,
    status: bigInt2Number(item.status, 0, 0) + 1,
    aum: bigInt2Number(item.aum, decimals, precision),
    nav,
    navInUSD: BN(nav).times(baseTokenPriceInUSD).toNumber(),
    baseTokenPriceInUSD,
    shares: bigInt2Number(item.shares, 18, 4),
    sharePrice: bigInt2Number(item.sharePrice, 18, 4),
    subscribingACToken: bigInt2Number(item.subscribingACToken, decimals, precision),
    redeemingShares: bigInt2Number(item.redeemingShares, 18, 4),
    unclaimedACToken: bigInt2Number(item.unclaimedACToken, decimals, precision),
    unclaimedALL: bigInt2Number(item.unclaimedALL, 18, 4),
    historyReturn: bigInt2Number(item.historyReturn, decimals, precision),
    roe: bigInt2Number(item.roe, 16, 4)
  }
}

export interface FundUserDataProps {
  address: string
  baseToken: string
  baseTokenPriceInUSD: number
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
}

export interface FundProps extends FundBaseProps {
  data?: FundUserDataProps | null
  detail?: FundDetailProps | null
}
export interface FundUserListDataProps extends FundProps {
  data: FundUserDataProps
}

export const FundUserDataDefault = {
  address: '-',
  baseToken: '',
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
  baseTokenPriceInUSD: 0,
  historyReturn: 0,
  roe: 0
}

// shareCompositionOf 三件套
export interface ShareCompositionProps {
  balance: number
  redeeming: number
  mining: number
}

export const ShareCompositionDefault = {
  balance: 0,
  redeeming: 0,
  mining: 0
}

export const calcShareComposition = (item: any) => {
  return {
    balance: bigInt2Number(item[0], 18, 4),
    redeeming: bigInt2Number(item[1], 18, 4),
    mining: bigInt2Number(item[2], 18, 4)
  }
}

// 基金资产分布情况三件套
export interface AssetCompositionProps {
  token: string //token地址
  symbol: string //token符号
  decimals: number //精度
  amount: number //数量
  value: number //价值
  percentage: number //价值百分比
}

export const calcAssetComposition = (item: any, baseTokenAddress: string) => {
  const decimals = bigInt2Number(item.decimals, 0, 0)
  const token = getTokenByAddress(item.token)
  const baseToken = getTokenByAddress(baseTokenAddress)
  // console.log(token, item, 222222)
  return {
    token: item.token,
    symbol: item.symbol,
    decimals,
    precision: token.precision,
    amount: bigInt2Number(item.amountv, token.precision),
    value: bigInt2Number(item.value, baseToken.decimals, baseToken.precision),
    percentage: 0
  }
}
