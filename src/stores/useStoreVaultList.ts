import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// import { FundDetailProps, FundUserListDataProps } from '@/class/help'
import { VaultDetailProps, VaultHashTypes, VaultUserListDataProps } from '@/types/vault'

export const useStoreVaultList = create((set) => ({
  vaultList: [],
  loading: true,
  getData: () => {},
  update: (vaultList: VaultDetailProps[], loading: boolean) => set({ vaultList, loading }),
  setGetDataFunc: (func: () => void) => set({ getData: func })
}))

export const useStoreDerivativeList = create((set) => ({
  derivativeList: [],
  update: (derivativeList: any[]) => set({ derivativeList })
}))

export const useStoreManageVaultList = create((set) => ({
  manageVaultList: [],
  loading: true,
  getData: () => {},
  update: (manageVaultList: VaultDetailProps[], loading: boolean) =>
    set({ manageVaultList, loading }),
  setGetDataFunc: (func: () => void) => set({ getData: func })
}))

export const useStoreUserVaultList = create((set) => ({
  vaultList: [],
  loading: true,
  getData: () => {},
  update: (vaultList: VaultUserListDataProps[], loading: boolean) => set({ vaultList, loading }),
  setGetDataFunc: (func: () => void) => set({ getData: func })
}))

export const useStoreManageVaultVerifyList = create(
  persist(
    (set: any) => ({
      lastChangeTime: 0,
      createVerifyList: [],
      setCreateVerifyList: (createVerifyList: string[], lastChangeTime: number) =>
        set({ createVerifyList, lastChangeTime }),
      updateVerifyList: [],
      setUpdateVerifyList: (updateVerifyList: string[], lastChangeTime: number) =>
        set({ updateVerifyList, lastChangeTime })
    }),
    { name: 'StoreManageFundVerifyList' }
  )
)

export const useStoreVaultHashList = create((set) => ({
  vaultHashList: [],
  loading: true,
  update: (vaultHashList: VaultHashTypes[], loading: boolean) => set({ vaultHashList, loading })
}))
