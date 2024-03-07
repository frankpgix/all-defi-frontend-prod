import { FC, useContext, ReactNode } from 'react'
import Dialog from 'rc-dialog'

import { px2rem } from '@/utils/tools'
import { MobileContext } from '@/context/Mobile'

// import Image from '@/components/common/Image'

interface Props {
  title?: string
  width?: string
  show: boolean
  animation?: boolean
  onClose?: () => void
  children: ReactNode
  className?: string
}

const DialogWrap: FC<Props> = ({ title, width, show, onClose, children, className, animation }) => {
  const closeIcon = <span />
  const { mobile } = useContext(MobileContext)
  if (!show) return null
  return (
    <Dialog
      destroyOnClose={true}
      width={mobile ? px2rem(343) : width}
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

DialogWrap.defaultProps = {}

export default DialogWrap
