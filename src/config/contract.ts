import { zeroAddress } from 'viem'

import { AddressRec } from '@/types/base'

import { ChainId } from '@/config'

export const contracts: { [key: string]: AddressRec } = {
  VaultReader: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.BSC]: '0xd8DeB943F8e7990F25005c52d97370f5db52a19d',
    [ChainId.BSCTEST]: '0xA0b00942671cf5af4e984EF7a98e48D0923D8575'
  },
  VaultFactory: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.BSC]: '0x0470c926B142DA91F6e49bca1fCF93c9999770df',
    [ChainId.BSCTEST]: '0x4D0b18cD83Deb392aCAFAcb9F6174Da836433634'
  }
}

export default contracts
