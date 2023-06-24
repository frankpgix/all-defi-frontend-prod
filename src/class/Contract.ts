import { _getAddress, addressCheck } from '@/class/Token'
import { ChainIdRec } from '@/config/types'

interface ContractProps {
  address: ChainIdRec
  abi: any
}

class Contract {
  readonly address: ChainIdRec

  constructor({ address, abi }: ContractProps) {
    this.abi = abi
    this.address = _getAddress(this.checkAddress(address))
  }

  // get getAddress() {
  //   console.log(1111, _getAddress(this.address))
  //   return _getAddress(this.checkAddress(address))
  // }

  checkAddress<T>(address: T): T {
    let obj = Object.create(null)
    for (const key in address) {
      const check = addressCheck(String(address[key]), `${this.name}-${key}`)
      obj = { ...obj, [key]: check }
    }
    return obj as T
  }
}

export default Contract
