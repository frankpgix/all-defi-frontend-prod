import {
  useNotifyStore,
  NotifyStoreItemType,
  NotifyStoreType,
  NotifyItemType
} from '@/stores/useNotifyStore'
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

  const createNotifyItem = (notify: NotifyItemType) => {
    const id = makeUUID()
    return { id, ...notify }
  }

  const createNotify = (notify: NotifyItemType): string => {
    const notifyItem = createNotifyItem(notify)
    updateNotifyList([...notifyList, notifyItem])
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
      tempList[oldNotifyItemIndex] = notify
      updateNotifyList(tempList)
    }
  }

  return {
    notifyList,
    notifyShow,
    openNotifyList,
    closeNotifyList,
    updateNotifyList,
    createNotify,
    clearNotifyList,
    closeNotifyItem,
    updateNotifyItem
  }
}

const oa = [
  { id: 1, a: '1' },
  { id: 2, a: '2' },
  { id: 3, a: '3' },
  { id: 4, a: '4' }
]
