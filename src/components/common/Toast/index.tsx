import React, { FC, ReactNode } from 'react'
import { ToastContainer, toast as toastFn, Id, TypeOptions } from 'react-toastify'

// Toast
const toastOption = (autoClose?: number | false): Record<string, any> => ({
  position: 'top-right',
  autoClose: autoClose ?? 3000,
  closeButton: false
})

export const toast = (msg: string, autoClose?: number | false) => {
  toastFn.info(msg, toastOption(autoClose))
}
toast.success = (msg: string, autoClose?: number | false) => {
  toastFn.success(msg, toastOption(autoClose))
}
toast.warning = (msg: string, autoClose?: number | false) => {
  toastFn.warning(msg, toastOption(autoClose))
}
toast.error = (msg: string, autoClose?: number | false) => {
  toastFn.error(msg, toastOption(autoClose))
}
toast.loading = (msg: string) => {
  // toastFn.loading(msg, { ...toastOption(false), icon: <Spinner size="mini" full /> })
  toastFn.loading(msg, toastOption(false))
}
toast.clear = () => toastFn.dismiss()

interface NotifyProps {
  title?: string
  msg: string | ReactNode
  autoClose?: number | false
}

export const NotifyBody: FC<NotifyProps> = ({ title, msg }) => (
  <div className="c-notify">
    {title && <h4 className="c-notify-title">{title}</h4>}
    <div className="c-notify-content">{msg}</div>
  </div>
)

// Notify

const defaultOption: notifyPromiseOptionProps = {
  pendingMsg: 'Waiting for wallet confirmation',
  successMsg: 'Operation successful',
  errorMsg: 'Operation Failed'
}

const notifyOption = (autoClose?: number | false): Record<string, any> => ({
  position: 'top-right',
  autoClose: autoClose ?? 3000,
  className: 'c-notify-custom',
  closeButton: true
})

export const notify = (msg: string | ReactNode, autoClose?: number | false) => {
  toastFn.info(<NotifyBody msg={msg} />, notifyOption(autoClose))
}

notify.update = (
  id: Id,
  type: TypeOptions,
  msg?: ReactNode,
  icon = true,
  autoClose?: number | false
) => {
  const message = msg
    ? msg
    : type === 'success'
    ? defaultOption.successMsg
    : type === 'error'
    ? defaultOption.errorMsg
    : ''
  if (type === 'error') autoClose = false
  return toastFn.update(id, {
    ...notifyOption(autoClose),
    type,
    icon,
    render: <NotifyBody msg={message} />,
    isLoading: false,
    closeButton: true
  })
}
notify.loading = (msg?: string | ReactNode, autoClose?: number | false) => {
  return toastFn.loading(
    <NotifyBody msg={msg || defaultOption.pendingMsg} />,
    notifyOption(autoClose)
  )
}
notify.success = (msg?: string | ReactNode, autoClose?: number | false) => {
  toastFn.success(<NotifyBody msg={msg || defaultOption.successMsg} />, notifyOption(autoClose))
}
notify.warning = (msg?: string | ReactNode, autoClose?: number | false) => {
  toastFn.warning(<NotifyBody msg={msg || defaultOption.errorMsg} />, notifyOption(autoClose))
}
notify.error = (msg?: string | ReactNode, autoClose?: number | false) => {
  toastFn.error(<NotifyBody msg={msg || defaultOption.errorMsg} />, notifyOption(autoClose))
}

notify.custom = (msg: string | ReactNode, autoClose?: number | false) => {
  toastFn.success(<NotifyBody msg={msg} />, {
    ...notifyOption(autoClose),
    icon: false
  })
}

notify.clear = () => toastFn.dismiss()

interface notifyPromiseOptionProps {
  pendingMsg?: string | ReactNode
  successMsg?: string | ReactNode
  errorMsg?: string | ReactNode
  onSuccess?: (data: any) => ReactNode | string | null
  onError?: (data: any) => ReactNode | string | null
}

notify.promise = async (fn: any, option?: notifyPromiseOptionProps) => {
  const o = Object.assign(defaultOption, option ?? {})
  // console.log(o)
  return await toastFn.promise(
    fn,
    {
      pending: {
        render() {
          return <NotifyBody msg={o.pendingMsg} />
        }
      },
      success: {
        render({ data }) {
          const msg = (o.onSuccess && o.onSuccess(data)) || o.successMsg
          return <NotifyBody msg={msg} />
        }
      },
      error: {
        render({ data }) {
          const msg = (o.onError && o.onError(data)) || o.errorMsg
          return <NotifyBody msg={msg} />
        }
      }
    },
    { className: 'c-notify-custom' }
  )
}

export default ToastContainer
