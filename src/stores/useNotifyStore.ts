import { create } from 'zustand'

// import { persist } from 'zustand/middleware'
import type {
  NotifyItemStatusType,
  NotifyItemType,
  NotifyStoreItemType,
  NotifyStoreType
} from '@/types/notify'

import { makeUUID } from '@/utils/tools'

export const useNotifyStore = create<NotifyStoreType>((set) => ({
  notifyList: [],
  notifyShow: false,
  notifyStatus: {},
  notifyHash: '',
  updateNotifyList: (notifyList: NotifyStoreItemType[]) =>
    set(() => {
      return { notifyList, notifyHash: makeUUID() }
    }),
  updateNotifyItem: (id: string, data: NotifyItemType) =>
    set((state) => {
      const index = state.notifyList.findIndex((item) => item.id === id)
      if (index !== -1) {
        state.notifyList[index] = { ...state.notifyList[index], ...data }
      }
      return { notifyList: state.notifyList, notifyHash: makeUUID() }
    }),
  openNotifyList: () => set({ notifyShow: true }),
  closeNotifyList: () => set({ notifyShow: false }),
  updateNotifyStatus: (key: string, status: NotifyItemStatusType) =>
    set((state) => {
      const allStatus = { ...state.notifyStatus }
      allStatus[key] = status
      return { notifyStatus: allStatus, notifyHash: makeUUID() }
    }),
  deleteNotifyByID: (key: string) =>
    set((state) => {
      const notifyList = state.notifyList.filter((item) => item.id !== key)
      console.log(notifyList)
      return { notifyList: notifyList, notifyHash: makeUUID() }
    }),
  deleteNotifyStatusByID: (key: string) =>
    set((state) => {
      const allStatus = { ...state.notifyStatus }
      delete allStatus[key]
      return { notifyStatus: allStatus, notifyHash: makeUUID() }
    }),
  clearAllNotifyStatus: () => set(() => ({ notifyStatus: {}, notifyHash: makeUUID() })),
  createNotifyStore: (notify: NotifyStoreItemType) =>
    set((state) => {
      const notifyList = [notify, ...state.notifyList]
      if (notifyList.length > 10) notifyList.length = 10
      return { notifyList, notifyHash: makeUUID() }
    })
}))
