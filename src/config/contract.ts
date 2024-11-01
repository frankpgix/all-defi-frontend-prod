import { zeroAddress } from 'viem'

import { AddressRec } from '@/types/base'

import { ChainId } from '@/config'

export const contracts: { [key: string]: AddressRec } = {
  VaultReader: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.BSC]: '0x3344DA0d0B9Fc428bF5aEBeA31c0fa3D0f4a62DC',
    [ChainId.BSCTEST]: '0xcde1BcD4F36121B8bc449bcbD96137757A50E982'
  },
  VaultFactory: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.BSC]: '0x30D97A47281a9CCc03514b9180311a090e05a4d9',
    [ChainId.BSCTEST]: '0x4DDc06684576fb7AFa2Bc22Ae35fFE3a547a44A4'
  }
}

export default contracts
