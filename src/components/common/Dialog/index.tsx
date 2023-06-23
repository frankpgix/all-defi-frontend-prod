import React, { FC, ReactNode } from 'react'
import Dialog from 'rc-dialog'

// import Image from '@/components/common/Image'

interface Props {
  title?: string
  width?: string
  show: boolean
  onClose?: () => void
  children: ReactNode
}

const DialogWrap: FC<Props> = ({ title, width, show, onClose, children }) => {
  const closeIcon = <span />
  // console.log('show', show)
  return (
    <Dialog
      destroyOnClose={true}
      width={width}
      closeIcon={closeIcon}
      closable={Boolean(onClose)}
      animation="zoom"
      maskAnimation="fade"
      title={title}
      visible={show}
      onClose={onClose}
    >
      {children}
    </Dialog>
  )
}

DialogWrap.defaultProps = {}

export default DialogWrap
