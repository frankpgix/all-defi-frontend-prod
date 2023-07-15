import { safeInterceptionValues } from '@/utils/tools'
import { getTokenByAddress } from '@/config/tokens'
import BN from 'bignumber.js'
// address baseToken; // 底层金库token
// address fundId;//基金id/地址
// string name;//基金名称
// address manager;//基金经理地址
// uint256 createTime;//创建时间
// uint256 epochIndex;//当前期数
// uint256 epochStartTime;//本期开始时间

// uint256[4] stageEndTime; //阶段截止时间。0申购赎回，1申购，2预结算 3结算
// uint256 status;//当前基金状态

// uint256 settleAUMLimit;//管理资产上限，用于结算判断
// uint256 realtimeAUMLimit;//管理资产实时上限，用于申购判断
// uint256 aum;//管理资产量
// uint256 nav;//基金净值

// uint256 sharePrice;//基金价格
// uint256 costPrice; //平均成本价
// uint256 unusedAsset;//未使用的资产
// uint256 subscribingACToken;//本期申购
// uint256 redeemingShares;//本期赎回
// uint256 miningShares;//挖矿中的share

// int256 roe;//收益率
// int256 lastRoe;//上期收益率
// int256 historyReturn;//历史收益
// uint256 lastRedemptionRatio;//上轮赎回率

// uint256 managerFee;//本轮经理费
// uint256 platFee;//本轮平台费
// uint256 lastManagerFee;//上期佣金
// uint256 historyManagerFee;//历史佣金
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
  // console.log(
  //   safeInterceptionValues(item.aum, 18, 18),
  //   safeInterceptionValues(item.nav, 18, 18),
  //   Number(safeInterceptionValues('99999990000000000', 4, 18)),
  //   'test'
  // )
  const epochStartTime = Number(safeInterceptionValues(item.epochStartTime, 0, 0)) * 1000
  const baseTokenObj = getTokenByAddress(item.baseToken)
  const decimals = baseTokenObj.decimals
  const precision = baseTokenObj.precision
  return {
    baseTokenObj,
    baseToken: item.baseToken,
    address: item.fundId,
    name: item.name,
    manager: item.manager,
    createTime: Number(safeInterceptionValues(item.createTime, 0, 0)) * 1000,
    epochIndex: Number(safeInterceptionValues(item.epochIndex, 0, 0)),
    epochStartTime,
    status: Number(safeInterceptionValues(item.status, 0, 0)) + 1,

    subscribeRedeemEndTime: epochStartTime + Number(safeInterceptionValues(item.stageEndTime[0], 0, 0)) * 1000,
    subscribeEndTime: epochStartTime + Number(safeInterceptionValues(item.stageEndTime[1], 0, 0)) * 1000,
    preSettleEndTime: epochStartTime + Number(safeInterceptionValues(item.stageEndTime[2], 0, 0)) * 1000,
    settleEndTime: epochStartTime + Number(safeInterceptionValues(item.stageEndTime[3], 0, 0)) * 1000,

    settleAUMLimit: Number(safeInterceptionValues(item.settleAUMLimit, precision, decimals)),
    realtimeAUMLimit: Number(safeInterceptionValues(item.realtimeAUMLimit, precision, decimals)),
    aum: Number(safeInterceptionValues(item.aum, precision, decimals)),
    nav: Number(safeInterceptionValues(item.nav, precision, decimals)),

    sharePrice: Number(safeInterceptionValues(item.sharePrice, 4, 18)),
    baseTokenPriceInUSD: Number(safeInterceptionValues(item.baseTokenPriceInUSD, 4, 18)),
    costPrice: Number(safeInterceptionValues(item.costPrice, 4, 18)),
    unusedAsset: Number(safeInterceptionValues(item.unusedAsset, precision, decimals)),
    subscribingACToken: Number(safeInterceptionValues(item.subscribingACToken, precision, decimals)),
    redeemingShares: Number(safeInterceptionValues(item.redeemingShares)),
    miningShares: Number(safeInterceptionValues(item.miningShares)),

    roe: Number(safeInterceptionValues(item.roe, 4, 16)),
    lastRoe: Number(safeInterceptionValues(item.lastRoe, 4, 16)),
    lastRedemptionRatio: Number(safeInterceptionValues(item.lastRedemptionRatio, 4, 16)),
    historyReturn: Number(safeInterceptionValues(item.historyReturn, precision, decimals)),

    managerFee: Number(safeInterceptionValues(item.managerFee, precision, decimals)),
    platFee: Number(safeInterceptionValues(item.platFee, precision, decimals)),
    lastManagerFee: Number(safeInterceptionValues(item.lastManagerFee, precision, decimals)),
    historyManagerFee: Number(safeInterceptionValues(item.historyManagerFee, precision, decimals))
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

// address baseToken;
// address acToken;
// uint256 createTime;
// string name;
// string symbol;
// string desc;
// address manager;
// string managerName;
// uint256 managerFee;
// uint256 platFee;
// uint256[2] subscriptionLimit; // [0] -  minimum subscription amount, [1] - maximum subscription amount
// address[] supportedAssets; // supported assets in fund pool
// bytes32[] supportedDerivatives; // supported derivatives in fund pool
// uint256[4] stageEndTime; // [0] subscribeEndTime, [1] redeemEndTime, [2] preSettleEndTime, [3] settleEndTime
// address factory;
// address governor;

// 基金基础数据三件套
export interface FundBaseProps {
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

export const calcFundBase = (item: any): FundBaseProps => {
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
    createTime: Number(safeInterceptionValues(item.createTime, 0, 0)) * 1000,
    name: item.name,
    symbol: item.symbol,
    desc: item.desc,
    manager: item.manager,
    managerName: item.managerName,
    managerFeePercent: Number(safeInterceptionValues(item.managerFee, 2, 2)),
    platFeePercent: Number(safeInterceptionValues(item.platFee, 2, 2)),
    derivatives: item.supportedDerivatives,
    subscriptionMinLimit: Number(safeInterceptionValues(item.subscriptionLimit[0], precision, decimals)),
    subscriptionMaxLimit: Number(safeInterceptionValues(item.subscriptionLimit[1], precision, decimals))
  }
}

export const FundBaseDefault = {
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

// 用户基金信息

// 基金质押信息三件套
export interface FundStakeProps {
  stakeAmount: number
  valueInUSD: number
}
export const FundStakeDefault = {
  stakeAmount: 0,
  valueInUSD: 0
}
export const calcFundStake = (address: string, item: any): FundStakeProps => {
  // const decimals = getDecimalsByAddress(address)
  // console.log(decimals, 2222333)
  return {
    stakeAmount: Number(safeInterceptionValues(item.stakeAmount)),
    valueInUSD: Number(safeInterceptionValues(item.valueInUSD))
  }
}

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
    assetInFunds: Number(safeInterceptionValues(item.assetInFunds)),
    aum: Number(safeInterceptionValues(item.aum)),
    historyReturn: Number(safeInterceptionValues(item.historyReturn))
  }
}

// 个人基金数据三件套
export const calcFundUserDetail = (item: any): FundUserDataProps => {
  // const decimals = getDecimalsByAddress(item.baseToken)
  const baseTokenObj = getTokenByAddress(item.baseToken)
  const decimals = baseTokenObj.decimals
  const precision = baseTokenObj.precision

  const nav = Number(safeInterceptionValues(item.nav, precision, decimals))
  const baseTokenPriceInUSD = Number(safeInterceptionValues(item.baseTokenPriceInUSD, 4, 18))
  return {
    address: item.fundId,
    baseToken: item.baseToken,
    status: Number(safeInterceptionValues(item.status, 0, 0)) + 1,
    aum: Number(safeInterceptionValues(item.aum, precision, decimals)),
    nav,
    navInUSD: BN(nav).times(baseTokenPriceInUSD).toNumber(),
    baseTokenPriceInUSD,
    shares: Number(safeInterceptionValues(item.shares, 4, 18)),
    sharePrice: Number(safeInterceptionValues(item.sharePrice, 4, 18)),
    subscribingACToken: Number(safeInterceptionValues(item.subscribingACToken, precision, decimals)),
    redeemingShares: Number(safeInterceptionValues(item.redeemingShares, 4, 18)),
    unclaimedACToken: Number(safeInterceptionValues(item.unclaimedACToken, precision, decimals)),
    unclaimedALL: Number(safeInterceptionValues(item.unclaimedALL, 4, 18)),
    historyReturn: Number(safeInterceptionValues(item.historyReturn, precision, decimals)),
    roe: Number(safeInterceptionValues(item.roe, 4, 16))
  }
}

// uint256 fundId; //基金id/地址
// address baseToken; //底层金库token
// Status status;//当前基金状态
// uint256 aum; //基金本轮启动时的价值
// uint256 nav;//本期实时投资净值
// uint256 navInUSD;//USD本位计价的nav，decimals 18
// uint256 shares; //持有share的数量，包含余额、赎回中、挖矿中
// uint256 sharePrice; //share价格
// uint256 subscribingACToken;//申购中的acToken数量
// uint256 redeemingShares;//赎回中的share数量
// uint256 unclaimedACToken;//未领取的赎回资产
// uint256 unclaimedALL;//未领取的赔偿ALL
// int256 historyReturn;//历史累计收益
// int256 roe;//收益率

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

// 基金冻结状态三件套
export interface FundBreachDetailProps {
  address: string //基金id/地址
  latestFrozenALL: number //上轮冻结ALL
  latestConfiscatedALL: number //上轮扣除ALL
  continuousBreachTimes: number //连续违约次数
  isManagerFrozen: boolean //经理操作权限被冻结
  // fundCloseStatus: number //基金关闭状态， 1:即将关闭 2:已关闭
}

export const FundBreachDetailDefault = {
  address: '', //基金id/地址
  latestFrozenALL: 0, //上轮冻结ALL
  latestConfiscatedALL: 0, //上轮扣除ALL
  continuousBreachTimes: 0, //连续违约次数
  isManagerFrozen: false //经理操作权限被冻结
  // fundCloseStatus: 0 //基金关闭状态， 1:即将关闭 2:已关闭
}

export const calcFundBreachDetail = (item: any) => {
  return {
    address: item.fundId,
    latestFrozenALL: Number(safeInterceptionValues(item.latestFrozenALL, 4, 18)),
    latestConfiscatedALL: Number(safeInterceptionValues(item.latestConfiscatedALL, 4, 18)),
    continuousBreachTimes: Number(safeInterceptionValues(item.continuousBreachTimes, 0, 0)),
    isManagerFrozen: item.isManagerFrozen
    // fundCloseStatus: Number(safeInterceptionValues(item.fundCloseStatus, 0, 0))
  }
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
    balance: Number(safeInterceptionValues(item.balance, 4, 18)),
    redeeming: Number(safeInterceptionValues(item.redeeming, 4, 18)),
    mining: Number(safeInterceptionValues(item.mining, 4, 18))
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
  const decimals = Number(safeInterceptionValues(item.decimals, 0, 0))
  const token = getTokenByAddress(item.token)
  const baseToken = getTokenByAddress(baseTokenAddress)
  // console.log(token, item, 222222)
  return {
    token: item.token,
    symbol: item.symbol,
    decimals,
    precision: token.precision,
    amount: Number(safeInterceptionValues(item.amount, token.precision, decimals)),
    value: Number(safeInterceptionValues(item.value, baseToken.precision, baseToken.decimals)),
    percentage: 0
  }
}

enum Codes {
  'c-0' = 'success',
  'c-4010' = 'Connet Your Wallet.',
  'c-4011' = 'approve failed.',
  'c-500' = '链上交易失败'
}

export interface OutComeProps {
  status: boolean
  msg?: string
}

export const outcome = (code: number, msg?: any): OutComeProps => {
  //
  return {
    status: code === 0,
    // @ts-ignore
    msg: msg ? String(msg) : Codes[`c-${code}`]
  }
}
