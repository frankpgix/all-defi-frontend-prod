// import { getAddress } from '@ethersproject/address'
import { getAddress } from 'viem'
import { ChainId, ChainIdRec, AddressType } from '@/config/types'
import { VITE_APP_CHAIN_ID } from '@/config'

export const _getAddress = (address: ChainIdRec): AddressType => {
  const chainId = VITE_APP_CHAIN_ID ?? ChainId.ARBITRUM
  // console.log('chainId', chainId)
  // @ts-ignore
  const _address = address[chainId] ?? address[ChainId.ARBITRUM]
  return _address.toLowerCase()
}

export function addressCheck(address: AddressType, key?: string) {
  try {
    if (!address) {
      console.warn(`${key} ▶ contract address not set`)
      return ''
    }

    const check = getAddress(String(address))
    // console.log('check', address, check)

    // warning(address === check, `${key} ▶ valid checksum address: ${address}`)

    return check
  } catch (error) {
    console.error(`${key} ▶ invalid address: ${address}`)
  }
}

export interface TokenBuildProps {
  name: string
  symbol: string
  address: ChainIdRec
  decimals: number
  precision: number
  projectLink?: string
  icon?: string
}

class Token {
  readonly name: string
  readonly symbol: string
  readonly address: AddressType
  readonly decimals: number
  readonly precision: number
  readonly projectLink: string
  readonly icon: string

  constructor({
    name,
    symbol,
    address,
    decimals = 18,
    precision = 4,
    projectLink = '',
    icon = ''
  }: TokenBuildProps) {
    this.name = name
    this.symbol = symbol
    this.address = _getAddress(address)
    this.decimals = decimals
    this.precision = precision
    this.projectLink = projectLink
    this.icon = icon
  }

  // get tokenAddress() {
  //   return _getAddress(this.address)
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

export default Token

export interface TokenProps {
  name: string
  symbol: string
  decimals: number
  precision: number
  address: AddressType
}
