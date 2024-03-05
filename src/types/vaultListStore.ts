import { VaultDetailProps, VaultUserListDataProps } from '@/types/vault'
export interface ManageVaultListType {
  manageVaultList: VaultDetailProps[]
  loading: boolean
  update: (manageFundList: VaultDetailProps[], loading: boolean) => void
  getData: () => void
}

export interface VaultListType {
  vaultList: VaultDetailProps[]
  loading: boolean
  update: (VaultList: VaultDetailProps[], loading: boolean) => void
  getData: () => void
}

export interface UserVaultListType {
  vaultList: VaultUserListDataProps[]
  loading: boolean
  update: (vaultList: VaultUserListDataProps[], loading: boolean) => void
  getData: () => void
}
