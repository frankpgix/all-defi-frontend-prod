import { create } from 'zustand'
import tokens from '@/config/tokens'
import { resetObjectValues } from '@/utils/tools'
import type { Signer } from '@ethersproject/abstract-signer'

import { AddressType } from '@/config/types'

export const useStoreProfile = create((set) => {
  // const balances = resetObjectValues(tokens)
  // console.log(balances)
  return {
    address: '',
    isManager: false,
    signer: null,
    loading: false,
    update: (address: AddressType, isManager: boolean, signer: Signer, loading: boolean) => {
      set({ address, isManager, signer, loading })
    }
  }
})

export const useStoreBalances = create((set) => ({
  balances: resetObjectValues(tokens),
  update: (balances: any) => set({ balances })
}))
