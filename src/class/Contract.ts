import { _getAddress } from '@/class/Token'
import { ChainIdRec, AddressType } from '@/config/types'

interface ContractProps {
  address: ChainIdRec
  abi: any
}

class Contract {
  readonly address: AddressType
  readonly abi: any

  constructor({ address, abi }: ContractProps) {
    this.abi = abi
    this.address = _getAddress(address)
  }

  // get getAddress() {
  //   console.log(1111, _getAddress(this.address))
  //   return _getAddress(this.checkAddress(address))
  // }

  // checkAddress<T>(address: T): T {
  //   let obj = Object.create(null)
  //   for (const key in address) {
  //     const check = addressCheck(String(address[key]), `${this.name}-${key}`)
  //     obj = { ...obj, [key]: check }
  //   }
  //   return obj as T
  // }
}

export default Contract
