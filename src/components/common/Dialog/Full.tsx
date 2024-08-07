import { FC, ReactNode } from 'react'

import Dialog from 'rc-dialog'

interface Props {
  title?: string
  width?: string
  show: boolean
  animation?: boolean
  onClose?: () => void
  children: ReactNode
  className?: string
}

const FullDialog: FC<Props> = ({ title, width, show, onClose, children, className, animation }) => {
  const closeIcon = <span />
  if (!show) return null
  return (
    <Dialog
      destroyOnClose={true}
      width={width ?? '1200px'}
      closeIcon={closeIcon}
      closable={Boolean(onClose)}
      animation={animation ? '' : 'zoom'}
      maskAnimation="fade"
      title={title}
      visible={show}
      onClose={onClose}
      className={className}
    >
      {children}
    </Dialog>
  )
}

export default FullDialog
