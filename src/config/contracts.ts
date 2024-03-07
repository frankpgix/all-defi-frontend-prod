import Contract from '@/class/Contract'
import { ChainId, ContractKeys } from '@/types/base'

export const contracts: { [key in ContractKeys]: Contract } = {
  ACProtocol: new Contract({
    name: 'ACProtocol',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x1003b275d6368FDB32cAA4bC07fBCb9E313aF8A8'
    }
  }),
  AllProtocol: new Contract({
    name: 'AllProtocol',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0xC5cFFfeD8F8A1FD98054324f817a75E2B97Ee931'
    }
  }),
  VaultReader: new Contract({
    name: 'VaultReader',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x97725a0699a88e4c6C83ed41179c5F413A18B5A0'
    }
  }),
  AUMStats: new Contract({
    name: 'AUMStats',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0xdDC17108DD5922E8fb29d37B1798a768500C145f'
    }
  }),
  VaultFactory: new Contract({
    name: 'VaultFactory',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x8B215C62DF93dBb46237aC43FDdA5d7b95BaA7cF'
    }
  }),
  RewardTracker: new Contract({
    name: 'RewardTracker',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0xaB3fF0c656D22Fce7498dec6958E5823d3FCDf97'
    }
  }),
  UniV3ACL: new Contract({
    name: 'UniV3ACL',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x3479c404b219BDd57ACbC9f68feaB343bE294013'
    }
  }),
  UniV3NonfungiblePosition: new Contract({
    name: 'UniV3NonfungiblePosition',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x860A115c70A6B1e0930F5fF4736838845f3670C0'
    }
  }),
  AaveV3Position: new Contract({
    name: 'AaveV3Position',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0xCc8EB899F896855Bd63B48AE6b2CE18801e5d7eE'
    }
  }),
  GMXTradePosition: new Contract({
    name: 'GMXTradePosition',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x6951fBAdf0E7297095B936977d3d546DA647FF23'
    }
  }),
  GMXEarnPosition: new Contract({
    name: 'GMXEarnPosition',
    address: {
      [ChainId.MAINNET]: '',
      [ChainId.ARBITRUM]: '0x63D427EF79C41C13aee221D49e57d8881f994dEB'
    }
  })
}

export default contracts
export const getContractAddress = (name: ContractKeys) => {
  return contracts[name].address
}
