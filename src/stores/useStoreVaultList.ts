import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { StoreVaultBaseListType } from '@/types/store'
// import { FundDetailProps, FundUserListDataProps } from '@/class/help'
import { VaultDetailProps, VaultHashTypes, VaultUserListDataProps } from '@/types/vault'

import { getVaultBaseList } from '@/support/vaultContract'

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

export const useStoreVaultBaseListBase = create<StoreVaultBaseListType>()(
  persist(
    (set, get) => ({
      vaultBaseList: [],
      vaultBaseListLoading: true,
      vaultBaseListInit: false,
      updateVaultBaseList: async () => {
        set({ vaultBaseListLoading: true })
        const vaultBaseList = await getVaultBaseList()
        set({ vaultBaseList, vaultBaseListLoading: false })
        if (!get().vaultBaseListInit) {
          set({ vaultBaseListInit: true })
        }
      }
    }),
    {
      name: 'vault-base-list'
    }
  )
)

export const useStoreVaultBaseList = () => {
  const stores = useStoreVaultBaseListBase((e) => e)
  console.log(22)
  return { ...stores }
}
