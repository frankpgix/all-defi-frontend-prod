import { create } from 'zustand'

export const useProfile = create((set) => ({
  address: '',
  isManager: false,
  update: (address: string, isManager: boolean) => {
    set({ address, isManager })
  }
}))
