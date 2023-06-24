import { useState } from 'react'
import { notify } from '@@/common/Toast'

export const useNotify = () => {
  const [id, setId] = useState('')

  const notifyLoading = () => {
    const tempId = notify.loading()
    setId(tempId)
  }

  const notifySuccess = () => {
    notify.update(id, 'success')
  }

  const notifyError = (error: unknown) => {
    notify.update(id, 'error', error?.shortMessage ?? error)
  }

  return {
    notifyLoading,
    notifySuccess,
    notifyError
  }
}
