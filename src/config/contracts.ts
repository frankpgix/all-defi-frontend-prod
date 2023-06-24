import Contract from '@/class/Contract'
// import { Address } from '@/config/types'
import { ChainId, ContractKeys } from '@/config/types'

import bep20Abi from '@/config/abi/erc20.json'
import MultiCallAbi from '@/config/abi/Multicall.json'
import ACProtocolAbi from '@/config/abi/ACProtocol.json'
import AllProtocolAbi from '@/config/abi/AllProtocol.json'
import FundPoolAbi from '@/config/abi/FundPool.json'
import FundReaderAbi from '@/config/abi/FundReader.json'
import RewardAbi from '@/config/abi/Reward.json'
import UniV3ACLAbi from '@/config/abi/UniV3ACL.json'

export const contracts: { [key in ContractKeys]: Contract } = {
  bep20: (address: string) =>
    new Contract({
      address: {
        [ChainId.MAINNET]: address,
        [ChainId.ARBITRUM]: address
      },
      abi: bep20Abi
    }),
  FundPool: (address: string) =>
    new Contract({
      address: {
        [ChainId.MAINNET]: address,
        [ChainId.ARBITRUM]: address
      },
      abi: FundPoolAbi
    }),
  multiCall: new Contract({
    address: {
      [ChainId.MAINNET]: '0xcA11bde05977b3631167028862bE2a173976CA11',
      [ChainId.ARBITRUM]: '0xcA11bde05977b3631167028862bE2a173976CA11'
    },
    abi: MultiCallAbi
  }),
  ACProtocol: new Contract({
    address: {
      [ChainId.MAINNET]: '0x4CF45D37b6E1EfAeD80D8B405B9Fb71fE6C5BBb5',
      [ChainId.ARBITRUM]: '0x4CF45D37b6E1EfAeD80D8B405B9Fb71fE6C5BBb5'
    },
    abi: ACProtocolAbi
  }),
  AllProtocol: new Contract({
    address: {
      [ChainId.MAINNET]: '0x0E84681E1EB1b93ebc97999a4D826c6c000c2901',
      [ChainId.ARBITRUM]: '0x0E84681E1EB1b93ebc97999a4D826c6c000c2901'
    },
    abi: AllProtocolAbi
  }),
  FundReader: new Contract({
    address: {
      [ChainId.MAINNET]: '0xd26C491B881A9dD410EAFB10f77b9dD813641F83',
      [ChainId.ARBITRUM]: '0xd26C491B881A9dD410EAFB10f77b9dD813641F83'
    },
    abi: FundReaderAbi
  }),
  Reward: new Contract({
    address: {
      [ChainId.MAINNET]: '0x50ac1194CfC059fE7FFc869e2b2610d8b3e1211F',
      [ChainId.ARBITRUM]: '0x50ac1194CfC059fE7FFc869e2b2610d8b3e1211F'
    },
    abi: RewardAbi
  }),
  UniV3ACL: new Contract({
    address: {
      [ChainId.MAINNET]: '0x9c9896b084415D9280fF4e5d8818291547e3280F',
      [ChainId.ARBITRUM]: '0x9c9896b084415D9280fF4e5d8818291547e3280F'
    },
    abi: UniV3ACLAbi
  })
}

export default contracts
