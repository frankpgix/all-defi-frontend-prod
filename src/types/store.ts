import { AddressType } from '@/types/base'
import { VaultBaseInfoProps, VaultDetailProps, VaultUserDetailProps } from '@/types/vault'

export interface StoreVaultBaseAddressListType {
  vaultBaseAddressList: readonly AddressType[]
  vaultBaseAddressListInit: boolean
  vaultBaseAddressListLoading: boolean
  updateVaultBaseAddressList: () => Promise<void>
}
export interface StoreVaultBaseListType {
  vaultBaseList: VaultBaseInfoProps[]
  vaultBaseListInit: boolean
  vaultBaseListLoading: boolean
  updateVaultBaseList: () => Promise<void>
}

export interface StoreVaultDetailListType {
  vaultDetailList: VaultDetailProps[]
  vaultDetailListInit: boolean
  vaultDetailListLoading: boolean
  updateVaultDetailList: () => Promise<void>
}
export interface StoreUserVaultDetailListType {
  userVaultDetailList: VaultUserDetailProps[]
  userVaultDetailListInit: boolean
  userVaultDetailListLoading: boolean
  updateUserVaultDetailList: (account?: AddressType) => Promise<void>
}

export interface StoreProfileType {
  account: AddressType | undefined
  isManager: boolean
  loading: boolean
  maxVaultLimit: number
  update: () => Promise<void>
}
