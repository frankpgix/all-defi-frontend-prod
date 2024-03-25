import { AddressType, ChainIdRec, ContractKeys } from '@/types/base'

import { ChainId, VITE_APP_CHAIN_ID } from '@/config'

export interface ContractBuildProps {
  name: ContractKeys
  address: ChainIdRec
}

export const _getAddress = (address: ChainIdRec): AddressType => {
  const chainId = VITE_APP_CHAIN_ID ?? ChainId.ARBITRUM
  // console.log('chainId', chainId)
  // @ts-ignore
  const _address = address[chainId] ?? address[ChainId.ARBITRUM]
  return _address
}

class Contract {
  readonly name: ContractKeys
  readonly address: AddressType

  constructor({ name, address }: ContractBuildProps) {
    this.name = name
    this.address = _getAddress(address)
  }
}

export default Contract
