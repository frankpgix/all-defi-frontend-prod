import { UpdateVaultDataType } from '@/types/createVault'

import { getUnitAmount } from '@/utils/tools'

export const calcUpdateVaultData = (data: UpdateVaultDataType) => {
  const { desc, managerName, newDerivative, delDerivative, minAmount, maxAmount, decimals } = data

  const _minAmount = getUnitAmount(String(minAmount), decimals)
  const _maxAmount = getUnitAmount(String(maxAmount), decimals)
  console.log(_minAmount, _maxAmount)
  return [desc, managerName, [_minAmount, _maxAmount], newDerivative, delDerivative, [], []]
}
