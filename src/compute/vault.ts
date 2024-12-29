import BN from 'bignumber.js'
import { md5 } from 'js-md5'
import { decodeAbiParameters, hexToString } from 'viem'

import { AddressType, GetTokenFuncType, TokenTypes, UnderlyingTokenTypes } from '@/types/base'
import {
  AssetCompositionProps,
  GlobalAssetStatisticProps,
  ShareCompositionProps,
  VaultBaseInfoProps,
  VaultBreachDetailProps,
  VaultDetailProps,
  VaultHashTypes,
  VaultStakeProps,
  VaultUserDetailProps
} from '@/types/vault'

import { VaultUpdatingDataDefault } from '@/data/vault'
import { getTokenByAddress } from '@/support/token'
import { safeInterceptionValues } from '@/utils/tools'

export const calcGlobalAssetStatistic = (item: any): GlobalAssetStatisticProps => {
  return {
    overallAUMInUSD: Number(safeInterceptionValues(item[0])),
    vaultAUMInUSD: Number(safeInterceptionValues(item[1])),
    overallReturnInUSD: Number(safeInterceptionValues(item[2]))
  }
}

// struct BaseInfo {
//     address underlying;
//     address interimAsset;
//     uint8 underlyingDecimals;
//     uint256 createTime;
//     string name;
//     string symbol;
//     address manager;
//     string managerName;
//     uint64[4] stageDurations;
//     uint256[2] stakeLimits;
//     address platFeeTo;
//     address custodian;
// }

export const calcVaultBaseInfo = (item: any, vaultAddress?: AddressType): VaultBaseInfoProps => {
  console.log(item, 112)
  const underlying = getTokenByAddress(item.underlying) as UnderlyingTokenTypes
  const decimals = underlying.decimals
  const precision = underlying.precision
  const { hash } = calcVaultHash(vaultAddress ?? '0x')
  const name =
    vaultAddress === '0x07481704aA55200cEBdDaFdC10243455dECD772f'
      ? item.name.replace('USDT', 'wstETH')
      : item.name
  return {
    hash,
    underlying,
    // acToken: item.acToken,
    address: vaultAddress ?? '0x',
    createTime: Number(safeInterceptionValues(item.createTime, 0, 0)) * 1000,
    name,
    symbol: item.symbol,
    desc: '',
    // desc: item.desc,
    manager: item.manager,
    managerName: item.managerName,
    managerFeePercent: 0.2,
    platFeePercent: 0.1,
    minimumStake: Number(safeInterceptionValues(item.stakeLimits[0], precision, decimals)),
    // factory: item.factory,
    // ceffuWallet: item.ceffuWallet,
    stakeTime: 0,
    unStakeTime: 0,
    preSettleTime: 0,
    settleTime: 0
  }
}

// struct VaultDetail {
//     address vaultAddress;
//     address underlying;
//     string name;
//     address manager;
//     uint64 createTime;
//     uint64 epochStartTime;
//     uint128 epochIndex;
//     uint64[4] stageDurations;
//     uint256 stage;
//     uint256 beginningAUM;
//     uint256 aum;
//     uint256 sharePrice;
//     uint256 beginningSharePrice; // 本轮开始的价格
//     uint256 underlyingBalance;
//     uint256 pendingStake; //本期申购的underlying
//     uint256 pendingUnstake; // 本期赎回的share
//     uint256 managerFee; //本轮经理费
//     uint256 platFee; //本轮平台费
//     int256 historicalReturn;

//     // 1、原roe = (sharePrice - beginningSharePrice) / beginningSharePrice;
//     // 2、原underlyingPriceInUSD，需要独立读取PriceAggregator合约的priceInUSD函数
// }

export const calcVaultDetail = (
  item: any,
  getTokenByAddress: GetTokenFuncType
): VaultDetailProps => {
  // console.log(item, 'item.stage')
  const epochStartTime = Number(safeInterceptionValues(item.epochStartTime, 0, 0)) * 1000
  const underlyingToken = getTokenByAddress(item.underlying) as UnderlyingTokenTypes
  const decimals = underlyingToken.decimals
  const status = Number(safeInterceptionValues(item.stage, 0, 0))
  const { hash } = calcVaultHash(item.vaultAddress ?? '0x')
  const sharePrice = Number(safeInterceptionValues(item.sharePrice, 18, 18))
  const totalShares = Number(safeInterceptionValues(item.totalShares, 18, 18))
  const custodianBalance = Number(
    safeInterceptionValues(item.custodianBalance ?? 0, decimals, decimals)
  )
  const beginningAUM = Number(safeInterceptionValues(item.beginningAUM, decimals, decimals))
  const beginningSharePrice = totalShares === 0 ? 1 : BN(beginningAUM).div(totalShares).toNumber()
  const aum = Number(safeInterceptionValues(item.aum, decimals, decimals))
  // console.log(beginningAUM, sharePrice, beginningSharePrice, 'beginningSharePrice')
  const name =
    item.vaultAddress === '0x07481704aA55200cEBdDaFdC10243455dECD772f'
      ? item.name.replace('USDT', 'wstETH')
      : item.name
  return {
    underlyingToken,
    hash,
    address: item.vaultAddress,
    name,
    manager: item.manager,
    createTime: Number(safeInterceptionValues(item.createTime, 0, 0)) * 1000,
    epochIndex: Number(safeInterceptionValues(item.epochIndex, 0, 0)),
    epochStartTime,
    status,
    isClosed: status === 6,
    zeroSubscribeEndTime:
      epochStartTime + Number(safeInterceptionValues(item.stageDurations[0], 0, 0)) * 1000,
    subscribeRedeemEndTime:
      epochStartTime + Number(safeInterceptionValues(item.stageDurations[0], 0, 0)) * 1000,
    subscribeEndTime:
      epochStartTime + Number(safeInterceptionValues(item.stageDurations[1], 0, 0)) * 1000,
    preSettleEndTime:
      epochStartTime + Number(safeInterceptionValues(item.stageDurations[2] ?? 0, 0, 0)) * 1000,
    settleEndTime:
      epochStartTime +
      Number(safeInterceptionValues(item.stageDurations[2], 0, 0)) * 1000 +
      10 * 60 * 1000,

    beginningAUM,
    totalShares,
    beginningSharePrice,
    aum,
    epochStartBlock: item.epochStartBlock,

    cashBalance: Number(safeInterceptionValues(item.cashBalance, decimals, decimals)),
    // todo: 读取PriceAggregator合约的priceInUSD函数
    underlyingPriceInUSD: 0,

    sharePrice,
    custodianBalance,
    // stakingACToken: Number(safeInterceptionValues(item.stakingACToken, decimals, decimals)),
    pendingStake: Number(safeInterceptionValues(item.pendingStake, decimals, decimals)),
    pendingUnstake: Number(safeInterceptionValues(item.pendingUnstake, 18, 18)),
    unstakingShare: Number(safeInterceptionValues(item.pendingUnstake, 18, 18)),

    // 净收益
    roe: BN(sharePrice).minus(beginningSharePrice).div(beginningSharePrice).toNumber().toFixed(16),
    // 毛收益
    grossRoe: beginningAUM === 0 ? 0 : BN(aum).minus(beginningAUM).div(beginningAUM).toNumber(),
    // roe: BN(sharePrice).minus(beginningSharePrice).div(beginningSharePrice).toNumber(),
    historicalReturn: Number(safeInterceptionValues(item.historicalReturn, decimals, decimals)),

    managerFee: Number(safeInterceptionValues(item.managerFee, decimals, decimals)),
    platFee: Number(safeInterceptionValues(item.platFee, decimals, decimals))
    // historicalManagerFee: Number(
    //   safeInterceptionValues(item.historicalManagerFee, decimals, decimals)
    // ),
    // historicalPlatFee: Number(safeInterceptionValues(item.historicalPlatFee, decimals, decimals))
  }
}

// struct UserDetail {
//     address vaultAddress; //基金id/地址
//     address underlying; //底层token
//     uint256 stage; // 当前基金状态阶段
//     uint256 shares; // 持有share的数量
//     uint256 sharePrice; //share价格
//     uint256 beginningSharePrice; //本轮初始价格
//     uint256 pendingStake; // 申购中的underlying数量
//     uint256 pendingUnstake; // 赎回中的share数量
//     uint256 unclaimedUnderlying; // 未领取的underlying数量
//     int256 historicalReturn; //历史累计收益

//     // 1、原nav = shares * sharePrice + pendingStake + unclaimedUnderlying;
//     // 2、原roe = (sharePrice - beginningSharePrice) / beginningSharePrice;
// }

export const calcVaultUserDetail = (
  item: any,
  getTokenByAddress: GetTokenFuncType,
  underlyingTokenPriceInUSD: number
): VaultUserDetailProps => {
  // console.log(underlyingTokenPriceInUSD, 'underlyingTokenPriceInUSD')
  const underlying = getTokenByAddress(item.underlying) as UnderlyingTokenTypes
  const decimals = underlying.decimals

  const shares = Number(safeInterceptionValues(item.shares, 18, 18))
  const sharePrice = Number(safeInterceptionValues(item.sharePrice, 18, 18))
  const pendingStake = Number(safeInterceptionValues(item.pendingStake, decimals, decimals))
  const unclaimedUnderlying = Number(
    safeInterceptionValues(item.unclaimedUnderlying, decimals, decimals)
  )

  const nav = BN(shares).times(sharePrice).plus(unclaimedUnderlying).toNumber()
  // const nav = BN(shares).times(sharePrice).plus(pendingStake).plus(unclaimedUnderlying).toNumber()
  // const

  const { hash } = calcVaultHash(item.vaultAddress ?? '0x')

  return {
    address: item.vaultAddress,
    hash,
    underlying,
    status: Number(safeInterceptionValues(item.stage, 0, 0)),
    nav,
    navInUSD: BN(nav).times(underlyingTokenPriceInUSD).toNumber(),
    underlyingTokenPriceInUSD,
    shares,
    sharePrice,
    pendingStake,
    unclaimedUnderlying,
    // stakingACToken: Number(safeInterceptionValues(item.stakingACToken, precision, decimals)),
    unstakingShare: Number(safeInterceptionValues(item.pendingUnstake, 18, 18)),
    // unclaimedACToken: Number(safeInterceptionValues(item.unclaimedACToken, precision, decimals)),
    historicalReturn: Number(safeInterceptionValues(item.historicalReturn, decimals, decimals))
  }
}

export const calcShareComposition = (item: any): ShareCompositionProps => {
  return {
    balance: Number(safeInterceptionValues(item[0], 18, 18)),
    withholding: Number(safeInterceptionValues(item[1], 18, 18)),
    mining: Number(safeInterceptionValues(item[2], 18, 18))
  }
}

export const calcAssetComposition = (
  item: any,
  baseTokenAddress: AddressType,
  getTokenByAddress: GetTokenFuncType
): AssetCompositionProps => {
  const decimals = Number(safeInterceptionValues(item.decimals, 0, 0))
  const token = getTokenByAddress(item.token)
  const baseToken = getTokenByAddress(baseTokenAddress)
  return {
    token: item.token,
    symbol: item.symbol,
    decimals,
    precision: token.precision,
    amount: Number(safeInterceptionValues(item.amount, decimals, decimals)),
    value: Number(safeInterceptionValues(item.value, baseToken.decimals, baseToken.decimals)),
    percentage: 0
  }
}

export const calcVaultStakedALL = (data: bigint[]): VaultStakeProps => {
  return {
    stakedALL: Number(safeInterceptionValues(data[0], 8, 18)),
    value: Number(safeInterceptionValues(data[1], 8, 18))
  }
}

export const calcVaultBreachDetail = (item: any): VaultBreachDetailProps => {
  const { hash } = calcVaultHash(item.vaultId ?? '0x')
  return {
    address: item.vaultId,
    hash,
    latestFrozenALL: Number(safeInterceptionValues(item.lastFrozenALL, 4, 18)),
    latestConfiscatedALL: Number(safeInterceptionValues(item.lastConfiscatedALL, 4, 18)),
    consecutiveBreachCount: Number(safeInterceptionValues(item.consecutiveBreachCount, 0, 0)),
    managerPaused: item.managerPaused
  }
}

export const calcVaultUpdatingData = (data: [AddressType, bigint], underlyingToken: TokenTypes) => {
  const { precision, decimals } = underlyingToken
  const [sData, verifyStatus] = data
  const types = [
    {
      name: 'detail',
      type: 'tuple',
      components: [
        { type: 'string', name: 'desc' },
        { type: 'string', name: 'managerName' },
        { type: 'uint256[2]', name: 'allocationLimits' },
        { type: 'bytes32[2]', name: 'derivativesToAdd' },
        { type: 'bytes32[2]', name: 'derivativesToRemove' },
        { type: 'address[2]', name: 'assetsToAdd' },
        { type: 'address[2]', name: 'assetsToRemove' }
      ]
    }
  ]
  if (data[0] === '0x') {
    return VaultUpdatingDataDefault
  }

  const updateData: any = decodeAbiParameters(types, sData)[0]

  return {
    verifyStatus: Number(safeInterceptionValues(verifyStatus, 0, 0)),
    data: {
      desc: updateData.desc,
      managerName: updateData.managerName,
      derivativesToAdd: updateData.derivativesToAdd,
      derivativesToRemove: updateData.derivativesToRemove,
      assetsToAdd: updateData.assetsToAdd,
      assetsToRemove: updateData.assetsToRemove,
      allocationLimits: updateData.allocationLimits.map((item: string) =>
        Number(safeInterceptionValues(item, precision, decimals))
      )
    }
  }
}

export const calcVaultDerivativesInfo = (data: AddressType[]) => {
  return data.map((value: AddressType) => ({
    name: hexToString(value, { size: 32 }),
    value
  }))
}

export const calcVaultHash = (address: AddressType): VaultHashTypes => {
  return {
    address,
    hash: md5(address.toLocaleLowerCase())
  }
}

export const calcGlobalAUMStats = (data: bigint[]) => {
  return {
    totalAUM: Number(safeInterceptionValues(data[0], 4, 18)), //平台总AUM
    vaultsAUM: Number(safeInterceptionValues(data[1], 4, 18)), //基金中的资产规模
    historicalReturn: Number(safeInterceptionValues(data[2], 4, 18)), //历史累计收益
    historicalFee: Number(safeInterceptionValues(data[3], 4, 18)) //历史累计费用
  }
}
