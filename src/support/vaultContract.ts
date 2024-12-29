import { readContract, readContracts } from '@wagmi/core'

import { VaultAbi } from '@/config/abi/Vault'
import { VaultReaderAbi } from '@/config/abi/VaultReader'
import { config } from '@/config/wagmi'

import { calcVaultBaseInfo } from '@/compute/vault'
import { formatNumber } from '@/utils/tools'

import { getContractAddress } from './utils'

export const getVaultBaseAddressList = async () => {
  const { address } = getContractAddress('VaultReader')
  const result = await readContract(config, {
    abi: VaultReaderAbi,
    address,
    functionName: 'vaultList'
  })
  return result
}

export const getVaultBaseList = async () => {
  const baseAddressList = await getVaultBaseAddressList()
  const contracts = baseAddressList.map(
    (item) =>
      ({
        address: item,
        abi: VaultAbi,
        functionName: 'baseInfo'
      }) as const
  )
  const result = await readContracts(config, { contracts })
  return result.map((item, index) => calcVaultBaseInfo(item.result, baseAddressList[index]))
}
