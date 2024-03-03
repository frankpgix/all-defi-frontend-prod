import Token from '@/class/Token'
import { getTokenByAddress } from '@/config/tokens'
import { safeInterceptionValues } from '@/utils/tools'

import { UniLPDetailTypes, AaveV3DetailTypes } from '@/types/vaultPositionDetail'
import { AddressType } from '@/types/base'

export const calcUniV3NonfungiblePosition = (
  sData: any[],
  underlyingToken: Token
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
  underlyingToken: Token
): AaveV3DetailTypes | null => {
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
  return { collateral, debt }
}
