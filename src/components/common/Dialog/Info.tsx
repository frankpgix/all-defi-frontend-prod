import React, { FC, ReactNode } from 'react'

import Dialog from '@@/common/Dialog'
import Button from '@@/common/Button'
// import Image from '@@/common/Image'
// import Video from '@/components/common/Video'

interface Props {
  show: boolean
  title?: string | ReactNode
  msg?: string | ReactNode
  onClose: () => void
  onConfirm?: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  type?: 'info' | 'succ' | 'fail' | 'wait'
  children?: ReactNode
  hideCancelButton?: boolean
}

const Info: FC<Props> = ({
  show,
  onClose,
  onCancel,
  msg,
  onConfirm,
  title,
  type = 'info',
  children,
  confirmText,
  cancelText,
  hideCancelButton
}) => {
  const onConfirmFunc = () => {
    onConfirm && onConfirm()
    onClose()
  }
  return (
    <Dialog width="670px" show={show} onClose={onClose}>
      <div className={`web-status-${type}`}>
        <div className={`web-status-${type}-icon`}>
          <p>
            <i></i>
          </p>
        </div>
        {title && <h4>{title}</h4>}
        {msg && <p>{msg}</p>}
        {children && children}
        <footer>
          {!hideCancelButton && (
            <Button outline onClick={onCancel ?? onClose}>
              {cancelText ? cancelText : 'cancel'}
            </Button>
          )}
          <Button onClick={onConfirmFunc}>{confirmText ? confirmText : 'confirm'}</Button>
        </footer>
      </div>
    </Dialog>
  )
}

Info.defaultProps = {}

export default Info