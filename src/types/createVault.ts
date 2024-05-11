import { AddressType } from '@/types/base'

export interface CreateVaultStep1DataTypes {
  name: string
  symbol: string
  managerName: string
  desc: string
}

export interface CreateVaultStep2DataTypes {
  minimumStake: number
  underlying: AddressType
}

export interface CreateVaultDataType {
  name: string
  symbol: string
  desc: string
  managerName: string
  underlying: AddressType
  minimumStake: number
}

export interface UpdateVaultDataType {
  desc: string
  managerName: string
  newDerivative: AddressType[]
  delDerivative: AddressType[]
  minAmount: string
  maxAmount: string
  decimals: number
}
