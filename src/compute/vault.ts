import { hexToString } from 'viem'

import { getTokenByAddress } from '@/config/tokens'
import { AddressType } from '@/types/base'
import { safeInterceptionValues } from '@/utils/tools'
import { GlobalAssetStatisticProps, VaultBaseInfoProps, VaultDetailProps } from '@/types/vault'

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
