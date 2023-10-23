import { useMemo } from 'react'
import { useNotifyStore } from '@/stores/useNotifyStore'
import type { NotifyStoreItemType, NotifyStoreType, NotifyItemType } from '@/types/notify'

import { makeUUID, sleep } from '@/utils/tools'

export const useNotify = () => {
  const {
    notifyList,
    notifyShow,
    openNotifyList,
    closeNotifyList,
    updateNotifyList,
    notifyStatus,
    updateNotifyStatus,
    deleteNotifyStatusByID,
    clearAllNotifyStatus,
    updateNotifyItem: updateNotifyItemStore,
    notifyHash,
    createNotifyStore,
    deleteNotifyByID
  } = useNotifyStore((state: NotifyStoreType) => ({
    notifyList: state.notifyList,
    notifyShow: state.notifyShow,
    openNotifyList: state.openNotifyList,
    closeNotifyList: state.closeNotifyList,
    updateNotifyList: state.updateNotifyList,
    notifyStatus: state.notifyStatus,
    updateNotifyStatus: state.updateNotifyStatus,
    deleteNotifyStatusByID: state.deleteNotifyStatusByID,
    clearAllNotifyStatus: state.clearAllNotifyStatus,
    updateNotifyItem: state.updateNotifyItem,
    createNotifyStore: state.createNotifyStore,
    deleteNotifyByID: state.deleteNotifyByID,
    notifyHash: state.notifyHash
  }))

  const makeNotifyItem = (notify: NotifyStoreItemType | NotifyItemType) => {
    const id = notify.id || makeUUID()
    const time = +new Date()
    return { ...notify, id, time }
  }

  const hasNotify = useMemo(() => notifyList.length > 0, [notifyList.length])

  const loadingNotifyCount = useMemo(
    () => notifyList.filter((item) => item.type === 'loading').length,
    [notifyList, notifyHash]
  )

  const createNotify = async (notify: NotifyItemType, autoClose?: boolean): Promise<string> => {
    const notifyItem = makeNotifyItem(notify)

    createNotifyStore(notifyItem)
    // const list = [notifyItem, ...notifyList]
    // if (list.length > 15) list.length = 15
    // updateNotifyList(list)
    openNotifyList()
    updateNotifyStatus(notifyItem.id, { animteType: 'in', layoutShow: false })
    await sleep(200)
    updateNotifyStatus(notifyItem.id, { animteType: 'in', layoutShow: true })

    if (autoClose !== false) {
      if (notifyItem.type === 'success' || notifyItem.type === 'warning') {
        setTimeout(() => {
          closeNotifyItem(notifyItem.id)
        }, 15000)
      }
      if (notifyItem.type === 'loading' || notifyItem.type === 'error') {
        setTimeout(() => {
          closeNotifyItem(notifyItem.id)
        }, 90000)
      }
    }
    return notifyItem.id
  }

  const clearNotifyList = async (): Promise<boolean> => {
    const normalNotifyIDList = notifyList
      .filter((item) => item.type !== 'loading')
      .map((item) => item.id)
      .reverse()
    if (normalNotifyIDList.length > 0) {
      for (let index = 0; index < normalNotifyIDList.length; index++) {
        const id = normalNotifyIDList[index]
        await closeNotifyItem(id)
        await sleep(100)
      }
      const loadingNotify = notifyList.filter((item) => item.type === 'loading')
      updateNotifyList(loadingNotify)
      return loadingNotify.length === 0
    } else {
      await clearLoadingNotifyList()
      return true
    }
  }

  const clearLoadingNotifyList = async () => {
    const loadingNotifyIDList = notifyList
      .filter((item) => item.type === 'loading')
      .map((item) => item.id)
      .reverse()

    for (let index = 0; index < loadingNotifyIDList.length; index++) {
      await sleep(100)
      const id = loadingNotifyIDList[index]
      await closeNotifyItem(id)
    }
    updateNotifyList([])
    clearAllNotifyStatus()
  }

  const closeNotifyItem = async (notifyId: string, fast?: boolean) => {
    updateNotifyStatus(notifyId, { animteType: 'out', layoutShow: true })
    await sleep(fast ? 100 : 200)
    updateNotifyStatus(notifyId, { animteType: 'out', layoutShow: false })
    await sleep(fast ? 100 : 200)
    deleteNotifyByID(notifyId)
    deleteNotifyStatusByID(notifyId)
    if (notifyList.length === 0) {
      clearAllNotifyStatus()
    }
  }

  const updateNotifyItem = async (
    notifyId: string,
    notify: NotifyItemType,
    autoClose?: boolean
  ) => {
    updateNotifyItemStore(notifyId, notify)
    if (autoClose !== false) {
      if (notify.type === 'success' || notify.type === 'warning') {
        setTimeout(() => {
          closeNotifyItem(notifyId)
        }, 15000)
      }
      if (notify.type === 'loading') {
        setTimeout(() => {
          closeNotifyItem(notifyId)
        }, 60000)
      }
    }
  }

  return {
    notifyList,
    notifyShow,
    notifyStatus,
    hasNotify,
    openNotifyList,
    closeNotifyList,
    updateNotifyList,
    createNotify,
    clearNotifyList,
    closeNotifyItem,
    updateNotifyItem,
    loadingNotifyCount
  }
}
