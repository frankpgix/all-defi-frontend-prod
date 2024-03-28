import { create } from 'zustand'

import { AddressType } from '@/types/base'

export const useStoreProfile = create((set) => {
  return {
    address: '',
    isManager: false,
    loading: false,
    maxFundLimit: 0,
    update: (
      address: AddressType | '',
      isManager: boolean,
      maxFundLimit: number,
      loading: boolean
    ) => {
      set({ address, isManager, maxFundLimit, loading })
    }
  }
})
