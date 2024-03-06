import { tokens, ZERO_ADDRESS, getTokenByAddress } from '@/config/tokens'
import { getUnitAmount } from '@/utils/tools'
import { CreateVaultDataType, UpdateVaultDataType } from '@/types/createVault'

export const calcCaeateVaultData = (data: CreateVaultDataType) => {
  const {
    name,
    symbol,
    desc,
    managerName,
    derivatives,
    stakeAmount: amount,
    minAmount,
    maxAmount
  } = data
  let baseTokenAddress = data.baseTokenAddress
  if (baseTokenAddress === ZERO_ADDRESS) {
    baseTokenAddress = tokens.WETH.address
  }
  const baseToken = getTokenByAddress(baseTokenAddress)
  const stakeAmount = getUnitAmount(String(amount), 18)
  const allocationLimits = [
    getUnitAmount(String(minAmount), baseToken.decimals),
    getUnitAmount(String(maxAmount), baseToken.decimals)
  ]

  return [
    name,
    symbol,
    desc,
    managerName,
    derivatives,
    allocationLimits,
    stakeAmount,
    baseTokenAddress
  ]
}

export const calcUpdateVaultData = (data: UpdateVaultDataType) => {
  const { desc, managerName, newDerivative, delDerivative, minAmount, maxAmount, decimals } = data

  const _minAmount = getUnitAmount(String(minAmount), decimals)
  const _maxAmount = getUnitAmount(String(maxAmount), decimals)
  console.log(_minAmount, _maxAmount)
  return [desc, managerName, [_minAmount, _maxAmount], newDerivative, delDerivative, [], []]
}
