import { zeroAddress } from 'viem'

import { AddressRec, ContractKeys } from '@/types/base'

import { ChainId } from '@/config'

export const contracts: { [key in ContractKeys]: AddressRec } = {
  ACProtocol: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x1003b275d6368FDB32cAA4bC07fBCb9E313aF8A8',
    [ChainId.BSCTEST]: '0x7E81B8623ED41932907D0087428a7937860ce54D'
  },
  AllProtocol: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0xC5cFFfeD8F8A1FD98054324f817a75E2B97Ee931',
    [ChainId.BSCTEST]: '0x1414A73E95aabeD606FeF2A44Bff917077A2e0E7'
  },
  VaultReader: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x97725a0699a88e4c6C83ed41179c5F413A18B5A0',
    [ChainId.BSCTEST]: '0xC3dbBa9985B0E74Dd52a16C3F649ea1f8e089FDC'
  },
  AUMStats: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0xdDC17108DD5922E8fb29d37B1798a768500C145f',
    [ChainId.BSCTEST]: '0x1bF879511F84366333267b376A023E4850B58609'
  },
  VaultFactory: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x8B215C62DF93dBb46237aC43FDdA5d7b95BaA7cF',
    [ChainId.BSCTEST]: '0x8A3A6f8F04c96313d8A44C94a629552C61dFBe97'
  },
  RewardTracker: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0xaB3fF0c656D22Fce7498dec6958E5823d3FCDf97',
    [ChainId.BSCTEST]: '0x1d3A54b80385b06802994B84481aE8c701975201'
  },
  UniV3ACL: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x3479c404b219BDd57ACbC9f68feaB343bE294013',
    [ChainId.BSCTEST]: zeroAddress
  },
  UniV3NonfungiblePosition: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x860A115c70A6B1e0930F5fF4736838845f3670C0',
    [ChainId.BSCTEST]: zeroAddress
  },
  AaveV3Position: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0xCc8EB899F896855Bd63B48AE6b2CE18801e5d7eE',
    [ChainId.BSCTEST]: zeroAddress
  },
  GMXTradePosition: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x6951fBAdf0E7297095B936977d3d546DA647FF23',
    [ChainId.BSCTEST]: zeroAddress
  },
  GMXEarnPosition: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.ARBITRUM]: '0x63D427EF79C41C13aee221D49e57d8881f994dEB',
    [ChainId.BSCTEST]: zeroAddress
  }
}

export default contracts
