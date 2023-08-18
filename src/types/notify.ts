export interface NotifyItemType {
  id?: string
  type: 'loading' | 'success' | 'warning' | 'error'
  title?: string
  content?: string
  hash?: string
}

export interface NotifyStoreItemType extends NotifyItemType {
  id: string
  time: number
}

export interface NotifyStoreType {
  notifyList: NotifyStoreItemType[]
  notifyShow: boolean
  updateNotifyList: (notifyList: NotifyStoreItemType[]) => void
  openNotifyList: () => void
  closeNotifyList: () => void
}
