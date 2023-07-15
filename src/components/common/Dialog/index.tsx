import React, { FC, useContext, ReactNode } from 'react'
import Dialog from 'rc-dialog'

import { px2rem } from '@/utils/tools'
import { MobileContext } from '@/context/Mobile'

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
  const { mobile } = useContext(MobileContext)

  return (
    <Dialog
      destroyOnClose={true}
      width={mobile ? px2rem(343) : width}
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
