import { AddressType } from '@/types/base'

import { getContractAddress } from '@/config/contracts'

import ERC20Abi from '@/config/abi/erc20.json'
// import MultiCallAbi from '@/config/abi/Multicall.json'
import ACProtocolAbi from '@/config/abi/ACProtocol.json'
import AllProtocolAbi from '@/config/abi/AllProtocol.json'
import VaultAbi from '@/config/abi/Vault.json'
import VaultReaderAbi from '@/config/abi/VaultReader.json'
// import RewardAbi from '@/config/abi/Reward.json'
// import UniV3ACLAbi from '@/config/abi/UniV3ACL.json'
// import Permit2Abi from '@/config/abi/Permit2.json'
import VaultFactoryAbi from '@/config/abi/VaultFactory.json'
import AUMStatsAbi from '@/config/abi/AUMStats.json'

export const useContract = (address: AddressType, abi: any) => {
  return { address, abi }
}

export const useERC20Contract = (address: AddressType) => {
  return useContract(address, ERC20Abi)
}
export const useACProtocolContract = () => {
  return useContract(getContractAddress('ACProtocol'), ACProtocolAbi)
}
export const useAllProtocolContract = () => {
  return useContract(getContractAddress('AllProtocol'), AllProtocolAbi)
}
export const useVaultFactoryContract = () => {
  return useContract(getContractAddress('VaultFactory'), VaultFactoryAbi)
}

export const useAUMStatsContract = () => {
  return useContract(getContractAddress('AUMStats'), AUMStatsAbi)
}
export const useVaultContract = (address: AddressType) => {
  return useContract(address, VaultAbi)
}
export const useVaultReaderContract = () => {
  return useContract(getContractAddress('VaultReader'), VaultReaderAbi)
}
