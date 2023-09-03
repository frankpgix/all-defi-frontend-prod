import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type {
  NotifyStoreItemType,
  NotifyStoreType,
  NotifyItemStatusType,
  NotifyItemType
} from '@/types/notify'

export const useNotifyStore = create(
  persist<NotifyStoreType>(
    (set) => ({
      notifyList: [],
      notifyShow: false,
      notifyStatus: {},
      updateNotifyList: (notifyList: NotifyStoreItemType[]) => set({ notifyList }),
      updateNotifyItem: (id: string, data: NotifyItemType) =>
        set((state) => {
          const index = state.notifyList.findIndex((item) => item.id === id)
          if (index !== -1) {
            state.notifyList[index] = { ...state.notifyList[index], ...data }
          }
          return { notifyList: state.notifyList }
        }),
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
