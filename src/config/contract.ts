import { zeroAddress } from 'viem'

import { AddressRec } from '@/types/base'

import { ChainId } from '@/config'

export const contracts: { [key: string]: AddressRec } = {
  VaultReader: {
    [ChainId.MAINNET]: '0xC8048f118CE650Ab8Dd87760464eA9E29d513b7e',
    [ChainId.BSC]: zeroAddress,
    [ChainId.BSCTEST]: '0x1Eaf6c4c7583105Cb27242a49435ee7ec4Fc5D29'
  },
  VaultFactory: {
    [ChainId.MAINNET]: '0x542Bd8e98C4bA4b795917a8758527504E7e11947',
    [ChainId.BSC]: zeroAddress,
    [ChainId.BSCTEST]: '0xDB99939a24034C345FAC6426ea11B069EF97E809'
  },
  PriceAggregator: {
    [ChainId.MAINNET]: '0xEe85f45dbe5F9DbD63bF9d7Df1237321c2A7cefA',
    [ChainId.BSC]: zeroAddress,
    [ChainId.BSCTEST]: '0xe9826Bb410CD098b289D5f3703a22af9E7bA1beF'
  }
}

export default contracts
