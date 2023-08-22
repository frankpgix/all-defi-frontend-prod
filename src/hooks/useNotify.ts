import { useMemo } from 'react'
import { useNotifyStore } from '@/stores/useNotifyStore'
import type { NotifyStoreItemType, NotifyStoreType, NotifyItemType } from '@/types/notify'

import { makeUUID } from '@/utils/tools'

export const useNotify = () => {
  const { notifyList, notifyShow, openNotifyList, closeNotifyList, updateNotifyList } =
    useNotifyStore((state: NotifyStoreType) => ({
      notifyList: state.notifyList,
      notifyShow: state.notifyShow,
      openNotifyList: state.openNotifyList,
      closeNotifyList: state.closeNotifyList,
      updateNotifyList: state.updateNotifyList
    }))

  const makeNotifyItem = (notify: NotifyStoreItemType | NotifyItemType) => {
    const id = notify.id || makeUUID()
    const time = +new Date()
    return { ...notify, id, time }
  }

  const hasNotify = useMemo(() => notifyList.length > 0, [notifyList.length])

  const createNotify = (notify: NotifyItemType): string => {
    const notifyItem = makeNotifyItem(notify)
    const list = [notifyItem, ...notifyList]
    if (list.length > 10) list.length = 10
    updateNotifyList(list)
    openNotifyList()
    return notifyItem.id
  }

  const clearNotifyList = () => updateNotifyList([])

  const closeNotifyItem = (notifyId: string) => {
    updateNotifyList(notifyList.filter((item) => item.id !== notifyId))
  }

  const updateNotifyItem = (notify: NotifyStoreItemType) => {
    const oldNotifyItemIndex = notifyList.findIndex((item) => item.id === notify.id)
    if (oldNotifyItemIndex !== -1) {
      const tempList = [...notifyList]
      tempList[oldNotifyItemIndex] = makeNotifyItem(notify)
      updateNotifyList(tempList)
    }
  }

  return {
    notifyList,
    notifyShow,
    hasNotify,
    openNotifyList,
    closeNotifyList,
    updateNotifyList,
    createNotify,
    clearNotifyList,
    closeNotifyItem,
    updateNotifyItem
  }
}
