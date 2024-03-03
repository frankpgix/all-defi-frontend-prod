import { hexToString } from 'viem'
import BN from 'bignumber.js'

import { getTokenByAddress } from '@/config/tokens'
import { AddressType } from '@/types/base'
import { safeInterceptionValues } from '@/utils/tools'
import {
  GlobalAssetStatisticProps,
  VaultBaseInfoProps,
  VaultDetailProps,
  VaultUserDetailProps,
  ShareCompositionProps,
  AssetCompositionProps
} from '@/types/vault'

export const calcGlobalAssetStatistic = (item: any): GlobalAssetStatisticProps => {
  return {
    overallAUMInUSD: Number(safeInterceptionValues(item[0])),
    vaultAUMInUSD: Number(safeInterceptionValues(item[1])),
    overallReturnInUSD: Number(safeInterceptionValues(item[2]))
  }
}

export const calcVaultBaseInfo = (item: any, fundAddress?: AddressType): VaultBaseInfoProps => {
  const underlyingToken = getTokenByAddress(item.underlyingToken)
  const decimals = underlyingToken.decimals
  const precision = underlyingToken.precision

  return {
    underlyingToken,
    acToken: item.acToken,
    address: fundAddress ?? '',
    createTime: Number(safeInterceptionValues(item.createTime, 0, 0)) * 1000,
    name: item.name,
    symbol: item.symbol,
    desc: item.desc,
    manager: item.manager,
    managerName: item.managerName,
    managerFeePercent: 0.2,
    platFeePercent: 0.1,
    derivatives: item.supportedDerivatives,
    derivativesInfo: (item.supportedDerivatives ?? []).map((value: AddressType) => ({
      name: hexToString(value, { size: 32 }),
      value
    })),
    subscriptionMinLimit: Number(
      safeInterceptionValues(item.allocationLimits[0], precision, decimals)
    ),
    subscriptionMaxLimit: Number(
      safeInterceptionValues(item.allocationLimits[1], precision, decimals)
    )
  }
}

export const calcVaultDetail = (item: any): VaultDetailProps => {
  // console.log(item, 'test')
  const epochStartTime = Number(safeInterceptionValues(item.epochStartTime, 0, 0)) * 1000
  const underlyingToken = getTokenByAddress(item.underlyingToken)
  const decimals = underlyingToken.decimals
  // console.log(epochStartTime, 'test')
  // const precision = baseTokenObj.precision
  return {
    underlyingToken,
    address: item.vaultId,
    name: item.name,
    manager: item.manager,
    createTime: Number(safeInterceptionValues(item.createTime, 0, 0)) * 1000,
    epochIndex: Number(safeInterceptionValues(item.epochIndex, 0, 0)),
    epochStartTime,
    status: Number(safeInterceptionValues(item.stage, 0, 0)),

    subscribeRedeemEndTime:
      epochStartTime + Number(safeInterceptionValues(item.stageDurations[0], 0, 0)) * 1000,
    subscribeEndTime:
      epochStartTime + Number(safeInterceptionValues(item.stageDurations[1], 0, 0)) * 1000,
    preSettleEndTime:
      epochStartTime + Number(safeInterceptionValues(item.stageDurations[2], 0, 0)) * 1000,
    settleEndTime:
      epochStartTime + Number(safeInterceptionValues(item.stageDurations[3], 0, 0)) * 1000,

    settleAUMLimit: Number(safeInterceptionValues(item.settlementAUMLimit, decimals, decimals)),
    realtimeAUMLimit: Number(safeInterceptionValues(item.aumLimit, decimals, decimals)),
    aum: Number(safeInterceptionValues(item.beginningAUM, decimals, decimals)),
    nav: Number(safeInterceptionValues(item.aum, decimals, decimals)),

    sharePrice: Number(safeInterceptionValues(item.sharePrice, 4, 18)),
    baseTokenPriceInUSD: Number(safeInterceptionValues(item.underlyingTokenPriceInUSD, 4, 18)),
    costPrice: Number(safeInterceptionValues(item.costPrice, 4, 18)),
    unusedAsset: Number(safeInterceptionValues(item.unusedAsset, decimals, decimals)),
    subscribingACToken: Number(safeInterceptionValues(item.allocatingACToken, decimals, decimals)),
    redeemingShares: Number(safeInterceptionValues(item.withholdingShare)),
    miningShares: Number(safeInterceptionValues(item.miningShare)),

    roe: Number(safeInterceptionValues(item.roe, 4, 16)),
    lastRoe: Number(safeInterceptionValues(item.lastRoe, 4, 16)),
    lastRedemptionRatio: Number(safeInterceptionValues(item.lastWithholdingRatio, 4, 16)),
    historyReturn: Number(safeInterceptionValues(item.historyReturn, decimals, decimals)),

    managerFee: Number(safeInterceptionValues(item.managerFee, decimals, decimals)),
    platFee: Number(safeInterceptionValues(item.platFee, decimals, decimals)),
    lastManagerFee: Number(safeInterceptionValues(item.lastManagerFee, decimals, decimals)),
    historyManagerFee: Number(safeInterceptionValues(item.historyManagerFee, decimals, decimals))
  }
}

export const calcVaultUserDetail = (item: any): VaultUserDetailProps => {
  const underlyingToken = getTokenByAddress(item.underlyingToken)
  const decimals = underlyingToken.decimals
  const precision = underlyingToken.precision

  const nav = Number(safeInterceptionValues(item.nav, precision, decimals))
  const underlyingTokenPriceInUSD = 1
  const beginSharePrice = BN(safeInterceptionValues(item.shares, 18, 18))
    .div(BN(safeInterceptionValues(item.roe, 18, 18)).plus(1))
    .toNumber()

  return {
    address: item.vaultId,
    underlyingToken,
    status: Number(safeInterceptionValues(item.stage, 0, 0)),
    // aum: Number(safeInterceptionValues(item.beginningAUM, precision, decimals)),
    aum: Number(BN(beginSharePrice).times(safeInterceptionValues(item.shares, 18, 18))),
    beginSharePrice,
    nav,
    navInUSD: BN(nav).times(underlyingTokenPriceInUSD).toNumber(),
    underlyingTokenPriceInUSD,
    shares: Number(safeInterceptionValues(item.shares, 4, 18)),
    sharePrice: Number(safeInterceptionValues(item.sharePrice, 4, 18)),
    subscribingACToken: Number(safeInterceptionValues(item.allocatingACToken, precision, decimals)),
    redeemingShares: Number(safeInterceptionValues(item.withholdingShare, 4, 18)),
    unclaimedACToken: Number(safeInterceptionValues(item.unclaimedACToken, precision, decimals)),
    unclaimedALL: Number(safeInterceptionValues(item.unclaimedALL, 4, 18)),
    historyReturn: Number(safeInterceptionValues(item.historyReturn, precision, decimals)),
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
  baseTokenAddress: AddressType
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
