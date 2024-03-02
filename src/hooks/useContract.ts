import { AddressType } from '@/types/base'

import ERC20Abi from '@/config/abi/erc20.json'
// import MultiCallAbi from '@/config/abi/Multicall.json'
// import ACProtocolAbi from '@/config/abi/ACProtocol.json'
// import AllProtocolAbi from '@/config/abi/AllProtocol.json'
// import FundPoolAbi from '@/config/abi/FundPool.json'
// import FundReaderAbi from '@/config/abi/FundReader.json'
// import RewardAbi from '@/config/abi/Reward.json'
// import UniV3ACLAbi from '@/config/abi/UniV3ACL.json'
// import Permit2Abi from '@/config/abi/Permit2.json'
// import FundFactoryAbi from '@/config/abi/FundFactory.json'
// import AUMStatsAbi from '@/config/abi/AUMStats.json'

export const useContract = (address: AddressType, abi: any) => {
  return { address, abi }
}

export const useERC20Contract = (address: AddressType) => {
  return useContract(address, ERC20Abi)
}
