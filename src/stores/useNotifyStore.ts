import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface NotifyItemType {
  type: 'loading' | 'success' | 'warning' | 'error'
  title?: string
  content?: string
}

export interface NotifyStoreItemType extends NotifyItemType {
  id: string
}

export interface NotifyStoreType {
  notifyList: NotifyStoreItemType[]
  notifyShow: boolean
  updateNotifyList: (notifyList: NotifyStoreItemType[]) => void
  openNotifyList: () => void
  closeNotifyList: () => void
}

export const useNotifyStore = create(
  persist<NotifyStoreType>(
    (set) => ({
      notifyList: [],
      notifyShow: false,
      updateNotifyList: (notifyList: NotifyStoreItemType[]) => set({ notifyList }),
      openNotifyList: () => set({ notifyShow: true }),
      closeNotifyList: () => set({ notifyShow: false })
    }),
    {
      name: 'NotifyStore'
    }
  )
)
