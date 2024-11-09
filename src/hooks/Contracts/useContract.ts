import { erc20Abi } from 'viem'

import PriceAggregatorAbi from '@/config/abi/PriceAggregator.json'
// import ACProtocolAbi from '@/config/abi/ACProtocol.json'
// import AUMStatsAbi from '@/config/abi/AUMStats.json'
// import AllProtocolAbi from '@/config/abi/AllProtocol.json'
// import RewardTrackerAbi from '@/config/abi/RewardTracker.json'
// import UniV3ACLAbi from '@/config/abi/UniV3ACL.json'
import VaultAbi from '@/config/abi/Vault.json'
import VaultFactoryAbi from '@/config/abi/VaultFactory.json'
import VaultReaderAbi from '@/config/abi/VaultReader.json'
// import ERC20Abi from '@/config/abi/erc20.json';
import { contracts } from '@/config/contract'

import { useCurrChainID } from '@/hooks/useToken'

import { AddressType, ContractKeys } from '@/types/base'

export const useContractAddress = (name: ContractKeys) => {
  const chainID = useCurrChainID()
  const contract = contracts[name]
  return { address: contract[chainID] }
}

export const useContract = (address: AddressType, abi: any) => {
  return { address, abi }
}

export const useERC20Contract = (address: AddressType) => {
  return useContract(address, erc20Abi)
}

export const useGetErc20Contract = () => {
  const getErc20Contract = (address: AddressType) => {
    return useContract(address, erc20Abi)
  }
  return { getErc20Contract }
}

// export const useACProtocolContract = () => {
//   const { address } = useContractAddress('ACProtocol')
//   return useContract(address, ACProtocolAbi)
// }
// export const useAllProtocolContract = () => {
//   const { address } = useContractAddress('AllProtocol')
//   return useContract(address, AllProtocolAbi)
// }
export const useVaultFactoryContract = () => {
  const { address } = useContractAddress('VaultFactory')
  return useContract(address, VaultFactoryAbi)
}

// export const useAUMStatsContract = () => {
//   const { address } = useContractAddress('AUMStats')
//   return useContract(address, AUMStatsAbi)
// }
export const useVaultContract = (address: AddressType) => {
  return useContract(address, VaultAbi)
}
export const useVaultReaderContract = () => {
  const { address } = useContractAddress('VaultReader')
  return useContract(address, VaultReaderAbi)
}
export const usePriceAggregatorContract = () => {
  const { address } = useContractAddress('PriceAggregator')
  return useContract(address, PriceAggregatorAbi)
}

// export const useUniV3ACLContract = () => {
//   const { address } = useContractAddress('VaultReader')
//   return useContract(address, UniV3ACLAbi)
// }
// export const useRewardTrackerContract = () => {
//   const { address } = useContractAddress('RewardTracker')
//   return useContract(address, RewardTrackerAbi)
// }
