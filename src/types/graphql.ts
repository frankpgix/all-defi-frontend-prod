import { AddressType } from '@/types/base'
export interface VaultMonthDataType {
  year: number
  month: number
  roe: string
  history?: boolean
  isRise?: boolean
  isFall?: boolean
}

export interface VaultsSimpleTypes {
  id: string
  name: string
}

export interface VaultUserActionsItemTypes {
  id: string
  investor: string
  vaultId: string
  amount: string
  underlyingToken: AddressType
  actionType: number
  timestamp: number
}

export interface UserVaultHistorySourceDataProps {
  vaults: VaultsSimpleTypes[]
  vaultUserActions: VaultUserActionsItemTypes[]
}

export interface UserVaultHistoryDataProps {
  name: string
  amount: number
  action: string
  investor: string
  baseToken: string
  tokenName: string
  hash: string
  time: number
  token: any
}

export interface ACBuyDataTypes {
  timestamp: number
  amount: string
  id: string
  investor: string
  sallAmount: string
  underlyingToken: AddressType
}
