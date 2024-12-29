import { getAccount, getChainId } from '@wagmi/core'

import { ChainId as ChainIds, DEFAULT_CHAIN_ID } from '@/config'
import { contracts } from '@/config/contract'
import { config } from '@/config/wagmi'
import { ChainIdTypes, ContractKeys } from '@/types/base'

export const getCurrChainId = (): ChainIdTypes => {
  const cId = getChainId(config)
  const { chainId = cId } = getAccount(config)
  if (chainId && Object.values(ChainIds).includes(chainId)) return chainId
  return DEFAULT_CHAIN_ID
}
export const getContractAddress = (name: ContractKeys) => {
  const chainID = getCurrChainId()
  const contract = contracts[name]
  return { address: contract[chainID] }
}
