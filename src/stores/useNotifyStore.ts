import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { NotifyStoreItemType, NotifyStoreType, NotifyItemStatusType } from '@/types/notify'

export const useNotifyStore = create(
  persist<NotifyStoreType>(
    (set) => ({
      notifyList: [],
      notifyShow: false,
      notifyStatus: {},
      updateNotifyList: (notifyList: NotifyStoreItemType[]) => set({ notifyList }),
      openNotifyList: () => set({ notifyShow: true }),
      closeNotifyList: () => set({ notifyShow: false }),
      updateNotifyStatus: (key: string, status: NotifyItemStatusType) =>
        set((state) => {
          const allStatus = { ...state.notifyStatus }
          allStatus[key] = status
          return { notifyStatus: allStatus }
        }),
      deleteNotifyStatusByID: (key: string) =>
        set((state) => {
          const allStatus = { ...state.notifyStatus }
          delete allStatus[key]
          return { notifyStatus: allStatus }
        }),
      clearAllNotifyStatus: () => set({ notifyStatus: {} })
    }),
    {
      name: 'NotifyStore'
    }
  )
)
