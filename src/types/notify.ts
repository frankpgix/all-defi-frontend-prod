export interface NotifyItemType {
  id?: string
  type: 'loading' | 'success' | 'warning' | 'error'
  title?: string
  content?: string
  hash?: string
}

export interface NotifyStoreItemType extends NotifyItemType {
  id: string
  time?: number
}

export interface NotifyItemStatusType {
  animteType: 'in' | 'out' | ''
  layoutShow: boolean
}

export interface NotifyStoreType {
  notifyList: NotifyStoreItemType[]
  updateNotifyList: (notifyList: NotifyStoreItemType[]) => void
  notifyShow: boolean
  openNotifyList: () => void
  closeNotifyList: () => void
  notifyStatus: { [key: string]: NotifyItemStatusType }
  updateNotifyStatus: (key: string, status: NotifyItemStatusType) => void
  deleteNotifyStatusByID: (key: string) => void
  clearAllNotifyStatus: () => void
  updateNotifyItem: (key: string, status: NotifyItemType) => void
}
