import { create } from 'zustand'

import { AddressType } from '@/config/types'

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
