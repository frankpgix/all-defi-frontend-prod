import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { NotifyStoreItemType, NotifyStoreType } from '@/types/notify'

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
