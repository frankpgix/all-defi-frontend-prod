import { zeroAddress } from 'viem'

import { AddressRec } from '@/types/base'

import { ChainId } from '@/config'

export const contracts: { [key: string]: AddressRec } = {
  VaultReader: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.BSC]: '0x3344DA0d0B9Fc428bF5aEBeA31c0fa3D0f4a62DC',
    [ChainId.BSCTEST]: '0x76d35b84F221dD77E1EbFA52292c8b068d532a13'
  },
  VaultFactory: {
    [ChainId.MAINNET]: zeroAddress,
    [ChainId.BSC]: '0x30D97A47281a9CCc03514b9180311a090e05a4d9',
    [ChainId.BSCTEST]: '0x4C595B6dAFA8952090777A724bE539eF5Ca86718'
  }
}

export default contracts
