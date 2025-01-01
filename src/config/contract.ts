import { zeroAddress } from 'viem'

import { AddressRec } from '@/types/base'

import { ChainId } from '@/config'

export const contracts: { [key: string]: AddressRec } = {
  VaultReader: {
    [ChainId.MAINNET]: '0xF8124F6A651D52a5e3fe9843D25336aeA0595418',
    [ChainId.BSC]: zeroAddress,
    [ChainId.BSCTEST]: '0xc92AF51Ec43657ee63834bC107645506Ff015606'
  },
  VaultFactory: {
    [ChainId.MAINNET]: '0x0b88e91f20b120162cF67e832b4a0cc78921f7E9',
    [ChainId.BSC]: zeroAddress,
    [ChainId.BSCTEST]: '0xA1Acb07e0Dd5834d7AB830C0c79FCf17cF792b7c'
  },
  PriceAggregator: {
    [ChainId.MAINNET]: '0x91E866681E7D2094b2fAd0EE72a8fb475D02C508',
    [ChainId.BSC]: zeroAddress,
    [ChainId.BSCTEST]: '0xe9826Bb410CD098b289D5f3703a22af9E7bA1beF'
  }
}

export default contracts
