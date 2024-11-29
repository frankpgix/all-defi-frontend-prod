import { zeroAddress } from 'viem'

import { AddressRec } from '@/types/base'

import { ChainId } from '@/config'

export const contracts: { [key: string]: AddressRec } = {
  VaultReader: {
    [ChainId.MAINNET]: '0xb4E8759042b6A8199f5df5a0E58c5bA0aFa6E3aA',
    [ChainId.BSC]: zeroAddress,
    [ChainId.BSCTEST]: '0x1Eaf6c4c7583105Cb27242a49435ee7ec4Fc5D29'
  },
  VaultFactory: {
    [ChainId.MAINNET]: '0x9374cC6539aDDf7e5d81Ec15FBeA636B238bBe6c',
    [ChainId.BSC]: zeroAddress,
    [ChainId.BSCTEST]: '0xDB99939a24034C345FAC6426ea11B069EF97E809'
  },
  PriceAggregator: {
    [ChainId.MAINNET]: '0x7D8d271C1D32C8615fA36E6F2B947dFe10F9A8d7',
    [ChainId.BSC]: zeroAddress,
    [ChainId.BSCTEST]: '0xe9826Bb410CD098b289D5f3703a22af9E7bA1beF'
  }
}

export default contracts
