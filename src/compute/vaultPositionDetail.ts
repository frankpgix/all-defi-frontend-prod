import { getTokenByAddress } from '@/config/tokens'

import { AddressType, TokenTypes } from '@/types/base'
import {
  AaveV3DetailTypes,
  GMXEarnDetailTypes,
  GMXTradePositionTypes,
  UniLPDetailTypes
} from '@/types/vaultPositionDetail'

import { safeInterceptionValues } from '@/utils/tools'

export const calcUniV3NonfungiblePosition = (
  sData: any[],
  underlyingToken: TokenTypes
): UniLPDetailTypes[] => {
  return sData.map((item: any) => {
    const token0 = getTokenByAddress(item.token0)
    const token1 = getTokenByAddress(item.token1)
    return {
      id: safeInterceptionValues(item.id, 0, 0),
      token0,
      token1,
      fee: safeInterceptionValues(item.fee, 0, 0),
      tickLower: safeInterceptionValues(item.tickLower, 18, 18),
      tickUpper: safeInterceptionValues(item.tickUpper, 18, 18),
      amount0: safeInterceptionValues(item.amount0, token0.decimals, token0.decimals),
      amount1: safeInterceptionValues(item.amount1, token1.decimals, token1.decimals),
      inRange: item.inRange,
      value: safeInterceptionValues(item.value, token1.decimals, token1.decimals),
      unclaimedFees: safeInterceptionValues(
        item.unclaimedFees,
        underlyingToken.decimals,
        underlyingToken.decimals
      )
    }
  })
}

export const calcAaveV3Position = (
  response: any,
  underlyingToken: TokenTypes
): AaveV3DetailTypes | null => {
  console.log(response, 'response')
  const healthFactor = safeInterceptionValues(response.healthFactor, 4, 4)
  const collateral = response.collateralAssets.map((address: AddressType, index: number) => {
    const asset = getTokenByAddress(address)
    return {
      id: index,
      asset,
      blances: safeInterceptionValues(
        response.collateralBlances[index],
        asset.decimals,
        asset.decimals
      ),
      value: safeInterceptionValues(
        response.collateralValues[index],
        underlyingToken.decimals,
        underlyingToken.decimals
      )
    }
  })
  const debt = response.debtAssets.map((address: AddressType, index: number) => {
    const asset = getTokenByAddress(address)
    return {
      id: index,
      asset,
      blances: safeInterceptionValues(response.debtBlances[index], asset.decimals, asset.decimals),
      value: safeInterceptionValues(
        response.debtValues[index],
        underlyingToken.decimals,
        underlyingToken.decimals
      )
    }
  })
  if (collateral.length === 0 && debt.length === 0) return null
  return { collateral, debt, healthFactor }
}

export const calcGMXTradePosition = (response: any[]): GMXTradePositionTypes[] => {
  return (response ?? []).map((item: any, id) => ({
    id,
    collateralToken: getTokenByAddress(item.collateralToken),
    indexToken: getTokenByAddress(item.indexToken),
    isLong: Boolean(item.isLong),
    size: safeInterceptionValues(item.size, 6, 18),
    collateral: safeInterceptionValues(item.collateral, 6, 18),
    positionFee: safeInterceptionValues(item.positionFee, 6, 18),
    fundingFee: safeInterceptionValues(item.fundingFee, 6, 18),
    unrealizedPnl: safeInterceptionValues(item.unrealizedPnl, 6, 18),
    entryPrice: safeInterceptionValues(item.entryPrice, 6, 18),
    markPrice: safeInterceptionValues(item.markPrice, 6, 18),
    liquidationPrice: safeInterceptionValues(item.liquidationPrice, 6, 18),
    positionValue: safeInterceptionValues(item.positionValue, 6, 18)
  }))
}

export const calcGMXEarnPosition = (
  response: any,
  underlyingToken: TokenTypes
): GMXEarnDetailTypes[] => {
  return [
    {
      id: 0,
      glpBlance: safeInterceptionValues(response.glpBlance, 6, 18),
      glpValue: safeInterceptionValues(
        response.glpValue,
        underlyingToken.decimals,
        underlyingToken.decimals
      ),
      pendingReward: safeInterceptionValues(
        response.pendingReward,
        underlyingToken.decimals,
        underlyingToken.decimals
      )
    }
  ]
}
