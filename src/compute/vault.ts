import { hexToString } from 'viem'

import { getTokenByAddress } from '@/config/tokens'
import { AddressType } from '@/types/base'
import { safeInterceptionValues } from '@/utils/tools'
import { GlobalAssetStatisticProps, VaultBaseInfoProps } from '@/types/vault'

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
