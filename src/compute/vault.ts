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
import { safeInterceptionValues } from '@/utils/tools'

export const calcGlobalAssetStatistic = (item: any): GlobalAssetStatisticProps => {
  return {
    overallAUMInUSD: Number(safeInterceptionValues(item[0])),
    vaultAUMInUSD: Number(safeInterceptionValues(item[1])),
    overallReturnInUSD: Number(safeInterceptionValues(item[2]))
  }
}

// address underlying;
// address acToken;
// uint256 createTime;
// string name;
// string symbol;
// string desc;
// address manager;
// string managerName;
// uint256 minimumStake;
// uint64[4] stageDurations; // time durations in seconds. [0] stake, [1] unstake, [2] preSettle, [3] settle
// address factory; // vault factory address
// address ceffuWallet;

export const calcVaultBaseInfo = (
  item: any,
  getTokenByAddress: GetTokenFuncType,
  vaultAddress?: AddressType
): VaultBaseInfoProps => {
  const underlying = getTokenByAddress(item.underlying) as UnderlyingTokenTypes
  const decimals = underlying.decimals
  const precision = underlying.precision
  const { hash } = calcVaultHash(vaultAddress ?? '0x')
  return {
    hash,
    underlying,
    acToken: item.acToken,
    address: vaultAddress ?? '0x',
    createTime: Number(safeInterceptionValues(item.createTime, 0, 0)) * 1000,
    name: item.name,
    symbol: item.symbol,
    desc: item.desc,
    manager: item.manager,
    managerName: item.managerName,
    managerFeePercent: 0.2,
    platFeePercent: 0.1,
    minimumStake: Number(safeInterceptionValues(item.minimumStake, precision, decimals)),
    factory: item.factory,
    ceffuWallet: item.ceffuWallet,
    stakeTime: 0,
    unStakeTime: 0,
    preSettleTime: 0,
    settleTime: 0
  }
}

export const calcVaultDetail = (
  item: any,
  getTokenByAddress: GetTokenFuncType
): VaultDetailProps => {
  console.log(item, 'test')
  const epochStartTime = Number(safeInterceptionValues(item.epochStartTime, 0, 0)) * 1000
  const underlyingToken = getTokenByAddress(item.underlying) as UnderlyingTokenTypes
  const decimals = underlyingToken.decimals
  const status = Number(safeInterceptionValues(item.stage, 0, 0)) - 1
  const { hash } = calcVaultHash(item.vaultAddress ?? '0x')

  return {
    underlyingToken,
    hash,
    address: item.vaultAddress,
    name: item.name,
    manager: item.manager,
    createTime: Number(safeInterceptionValues(item.createTime, 0, 0)) * 1000,
    epochIndex: Number(safeInterceptionValues(item.epochIndex, 0, 0)),
    epochStartTime,
    status,
    isClosed: status === 6,
    zeroSubscribeEndTime:
      epochStartTime + Number(safeInterceptionValues(item.stageDurations[0], 0, 0)) * 1000,
    subscribeRedeemEndTime:
      epochStartTime + Number(safeInterceptionValues(item.stageDurations[1], 0, 0)) * 1000,
    subscribeEndTime:
      epochStartTime + Number(safeInterceptionValues(item.stageDurations[2], 0, 0)) * 1000,
    preSettleEndTime:
      epochStartTime + Number(safeInterceptionValues(item.stageDurations[3], 0, 0)) * 1000,
    settleEndTime:
      epochStartTime +
      Number(safeInterceptionValues(item.stageDurations[3], 0, 0)) * 1000 +
      10 * 60 * 1000,

    beginningAUM: Number(safeInterceptionValues(item.beginningAUM, decimals, decimals)),
    aum: Number(safeInterceptionValues(item.aum, decimals, decimals)),

    underlyingBalance: Number(safeInterceptionValues(item.underlyingBalance, decimals, decimals)),
    underlyingPriceInUSD: Number(safeInterceptionValues(item.underlyingPriceInUSD, 4, 18)),

    sharePrice: Number(safeInterceptionValues(item.sharePrice, 4, 18)),
    stakingACToken: Number(safeInterceptionValues(item.stakingACToken, decimals, decimals)),
    unstakingShare: Number(safeInterceptionValues(item.unstakingShare, 4, 18)),

    roe: Number(safeInterceptionValues(item.roe, 4, 16)),
    historicalReturn: Number(safeInterceptionValues(item.historicalReturn, decimals, decimals)),

    managerFee: Number(safeInterceptionValues(item.managerFee, decimals, decimals)),
    platFee: Number(safeInterceptionValues(item.platFee, decimals, decimals)),
    historicalManagerFee: Number(
      safeInterceptionValues(item.historicalManagerFee, decimals, decimals)
    ),
    historicalPlatFee: Number(safeInterceptionValues(item.historicalPlatFee, decimals, decimals))
  }
}

//  uint256 vaultAddress; //基金id/地址
// 		address underlying; //底层金库token
// 		uint256 stage;//当前基金状态阶段
//     uint256 shares; //持有share的数量，包含余额、赎回中、挖矿中
// 		uint256 sharePrice; //share价格
//     uint256 nav;//本期实时投资净值，包括申购中的和赎回未领取的
//     int256 roe;//收益率
// 		uint256 stakingACToken;//申购中的acToken数量
//     uint256 unstakingShare;//赎回中的share数量
//     uint256 unclaimedACToken;//未领取的赎回资产
// 		int256 historicalReturn;//历史累计收益

export const calcVaultUserDetail = (
  item: any,
  getTokenByAddress: GetTokenFuncType
): VaultUserDetailProps => {
  const underlying = getTokenByAddress(item.underlying) as UnderlyingTokenTypes
  const decimals = underlying.decimals
  const precision = underlying.precision

  const nav = Number(safeInterceptionValues(item.nav, precision, decimals))
  const underlyingTokenPriceInUSD = 1
  const beginSharePrice = BN(safeInterceptionValues(item.sharePrice, 18, 18))
    .div(BN(safeInterceptionValues(item.roe, 18, 18)).plus(1))
    .toNumber()
  const { hash } = calcVaultHash(item.vaultAddress ?? '0x')

  return {
    address: item.vaultAddress,
    hash,
    underlying,
    status: Number(safeInterceptionValues(item.stage, 0, 0)),
    // aum: Number(safeInterceptionValues(item.beginningAUM, precision, decimals)),
    aum: Number(BN(beginSharePrice).times(safeInterceptionValues(item.shares, 18, 18))),
    beginSharePrice,
    nav,
    navInUSD: BN(nav).times(underlyingTokenPriceInUSD).toNumber(),
    underlyingTokenPriceInUSD,
    shares: Number(safeInterceptionValues(item.shares, 4, 18)),
    sharePrice: Number(safeInterceptionValues(item.sharePrice, 4, 18)),
    stakingACToken: Number(safeInterceptionValues(item.stakingACToken, precision, decimals)),
    unstakingShare: Number(safeInterceptionValues(item.unstakingShare, 4, 18)),
    unclaimedACToken: Number(safeInterceptionValues(item.unclaimedACToken, precision, decimals)),
    historicalReturn: Number(safeInterceptionValues(item.historicalReturn, precision, decimals)),
    roe: Number(safeInterceptionValues(item.roe, 4, 16))
  }
}

export const calcShareComposition = (item: any): ShareCompositionProps => {
  return {
    balance: Number(safeInterceptionValues(item[0], 4, 18)),
    withholding: Number(safeInterceptionValues(item[1], 4, 18)),
    mining: Number(safeInterceptionValues(item[2], 4, 18))
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
    amount: Number(safeInterceptionValues(item.amount, token.precision, decimals)),
    value: Number(safeInterceptionValues(item.value, baseToken.precision, baseToken.decimals)),
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

export const calcVaultUpdatingData = (data: [AddressType, BigInt], underlyingToken: TokenTypes) => {
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
