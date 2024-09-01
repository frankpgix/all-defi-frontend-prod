import { zeroAddress } from 'viem'

import { AddressRec } from '@/types/base'

import { ChainId } from '@/config'

export const contracts: { [key: string]: AddressRec } = {
  VaultReader: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.BSC]: '0xd8DeB943F8e7990F25005c52d97370f5db52a19d',
    [ChainId.BSCTEST]: '0xb0DC377E54fb0e341C3391E5A887b32B2fE12D8A'
  },
  VaultFactory: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.BSC]: '0x0470c926B142DA91F6e49bca1fCF93c9999770df',
    [ChainId.BSCTEST]: '0x715803359416592063306B7b3352D9f9D04d6d37'
  }
}

export default contracts
