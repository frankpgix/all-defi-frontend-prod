import { zeroAddress } from 'viem'

import { AddressType, GetTokenFuncType } from '@/types/base'
import { CreateVaultDataType, UpdateVaultDataType } from '@/types/createVault'

import { getUnitAmount } from '@/utils/tools'

export const calcCaeateVaultData = (
  data: CreateVaultDataType,
  getTokenByAddress: GetTokenFuncType,
  WETHAddress: AddressType
) => {
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
  if (baseTokenAddress === zeroAddress) {
    baseTokenAddress = WETHAddress
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
