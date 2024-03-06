import { AddressType } from '@/types/base'
import { VaultDerivativesProps } from '@/types/vault'

export interface CreateVaultStep1DataTypes {
  name: string
  symbol: string
  managerName: string
  desc: string
}

export interface CreateVaultStep2DataTypes {
  addresss: VaultDerivativesProps[]
  minAmount: number
  maxAmount: number
  baseTokenAddress: AddressType
}

export interface CreateVaultDataType {
  name: string
  symbol: string
  desc: string
  managerName: string
  derivatives: AddressType[]
  stakeAmount: number
  minAmount: number
  maxAmount: number
  baseTokenAddress: AddressType
}
