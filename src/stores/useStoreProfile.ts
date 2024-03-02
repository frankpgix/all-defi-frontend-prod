import { create } from 'zustand'
import tokens from '@/config/tokens'
import { resetObjectValues } from '@/utils/tools'

import { AddressType } from '@/config/types'

export const useStoreProfile = create((set) => {
  // const balances = resetObjectValues(tokens)
  // console.log(balances)
  return {
    address: '',
    isManager: false,
    signer: null,
    loading: false,
    maxFundLimit: 0,
    update: (address: AddressType, isManager: boolean, maxFundLimit: number, loading: boolean) => {
      set({ address, isManager, maxFundLimit, loading })
    }
  }
})

export const useStoreBalances = create((set) => ({
  balances: resetObjectValues(tokens),
  update: (balances: any) => set({ balances })
}))
