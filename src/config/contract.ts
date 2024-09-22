import { zeroAddress } from 'viem'

import { AddressRec } from '@/types/base'

import { ChainId } from '@/config'

export const contracts: { [key: string]: AddressRec } = {
  VaultReader: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.BSC]: '0x3344DA0d0B9Fc428bF5aEBeA31c0fa3D0f4a62DC',
    [ChainId.BSCTEST]: '0xA0b00942671cf5af4e984EF7a98e48D0923D8575'
  },
  VaultFactory: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.BSC]: '0x30D97A47281a9CCc03514b9180311a090e05a4d9',
    [ChainId.BSCTEST]: '0x4D0b18cD83Deb392aCAFAcb9F6174Da836433634'
  }
}

export default contracts
