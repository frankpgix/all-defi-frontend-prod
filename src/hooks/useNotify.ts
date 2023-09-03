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
    updateNotifyItem
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
    updateNotifyItem: state.updateNotifyItem
  }))

  const makeNotifyItem = (notify: NotifyStoreItemType | NotifyItemType) => {
    const id = notify.id || makeUUID()
    const time = +new Date()
    return { ...notify, id, time }
  }

  const hasNotify = useMemo(() => notifyList.length > 0, [notifyList.length])
  const loadingNotifyCount = useMemo(
    () => notifyList.filter((item) => item.type === 'loading').length,
    [notifyList]
  )

  const createNotify = async (notify: NotifyItemType): Promise<string> => {
    const notifyItem = makeNotifyItem(notify)

    const list = [notifyItem, ...notifyList]
    if (list.length > 15) list.length = 15
    updateNotifyList(list)
    openNotifyList()
    updateNotifyStatus(notifyItem.id, { animteType: 'in', layoutShow: false })
    await sleep(200)
    updateNotifyStatus(notifyItem.id, { animteType: 'in', layoutShow: true })
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
    updateNotifyList(notifyList.filter((item) => item.id !== notifyId))
    deleteNotifyStatusByID(notifyId)
    if (notifyList.length === 0) {
      clearAllNotifyStatus()
    }
  }

  // const updateNotifyItem = async (notify: NotifyStoreItemType) => {
  //   updateStoreNotifyItem(notify.id, notify)
  //   // await closeNotifyItem(notify.id)
  //   // // await sleep(100)
  //   // console.log(notify, notifyList)
  //   // const oldNotifyItemIndex = notifyList.findIndex((item) => item.id === notify.id)
  //   // console.log(notify, oldNotifyItemIndex)
  //   // if (oldNotifyItemIndex !== -1) {
  //   //   const tempList = [...notifyList]
  //   //   tempList[oldNotifyItemIndex] = makeNotifyItem(notify)
  //   //   updateNotifyList(tempList)
  //   // }
  // }

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
