import { create } from 'zustand'
import tokens from '@/config/tokens'
import { resetObjectValues } from '@/utils/tools'

import { AddressType } from '@/hooks/help'

export const useStoreProfile = create((set) => {
  // const balances = resetObjectValues(tokens)
  // console.log(balances)
  return {
    address: '',
    isManager: false,
    update: (address: AddressType, isManager: boolean) => {
      set({ address, isManager })
    }
  }
})

export const useStoreBalances = create((set) => ({
  balances: resetObjectValues(tokens),
  update: (balances: any) => set({ balances })
}))
