import { zeroAddress } from 'viem'

import { AddressRec, ContractKeys } from '@/types/base'

import { ChainId } from '@/config'

export const contracts: { [key in ContractKeys]: AddressRec } = {
  ACProtocol: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x1003b275d6368FDB32cAA4bC07fBCb9E313aF8A8'
  },
  AllProtocol: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0xC5cFFfeD8F8A1FD98054324f817a75E2B97Ee931'
  },
  VaultReader: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x97725a0699a88e4c6C83ed41179c5F413A18B5A0'
  },
  AUMStats: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0xdDC17108DD5922E8fb29d37B1798a768500C145f'
  },
  VaultFactory: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x8B215C62DF93dBb46237aC43FDdA5d7b95BaA7cF'
  },
  RewardTracker: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0xaB3fF0c656D22Fce7498dec6958E5823d3FCDf97'
  },
  UniV3ACL: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x3479c404b219BDd57ACbC9f68feaB343bE294013'
  },
  UniV3NonfungiblePosition: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x860A115c70A6B1e0930F5fF4736838845f3670C0'
  },
  AaveV3Position: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0xCc8EB899F896855Bd63B48AE6b2CE18801e5d7eE'
  },
  GMXTradePosition: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x6951fBAdf0E7297095B936977d3d546DA647FF23'
  },
  GMXEarnPosition: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x63D427EF79C41C13aee221D49e57d8881f994dEB'
  }
}

export default contracts
