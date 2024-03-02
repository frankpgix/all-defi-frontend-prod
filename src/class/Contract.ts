import { AddressType, ChainIdRec, ContractKeys } from '@/types/base'
import { _getAddress } from './Token'

export interface ContractBuildProps {
  name: ContractKeys
  address: ChainIdRec
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
