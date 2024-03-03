import Token from '@/class/Token'
import { getTokenByAddress } from '@/config/tokens'
import { safeInterceptionValues } from '@/utils/tools'

import { UniLPDetailTypes } from '@/types/vaultPositionDetail'

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
