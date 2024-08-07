import { FC, ReactNode } from 'react'
import ReactModal from 'react-modal'

import classNames from 'classnames'

import { useMobile } from '@/hooks/useMobile'

import { calcCssNumber, px2rem } from '@/utils/tools'

interface Props {
  children: ReactNode
  show?: boolean
  onClose: () => void
  width?: string | number
  title?: string
  onConfirm?: () => void
  confirmText?: string
  fullButton?: boolean
  onCancel?: () => void
  cancelText?: string
  closeOnOverlayClick?: boolean
  className?: string
  bodyClassName?: string
}

const Modal: FC<Props> = ({
  children,
  show,
  onClose,
  width = 1200,
  title,
  closeOnOverlayClick,
  className,
  bodyClassName
}) => {
  const { mobile } = useMobile()
  const modalWidth = { width: !mobile ? calcCssNumber(width) : px2rem(343) }
  const removeBodyClass = () => {
    document.body.classList.remove('c-react-modal-noscroll')
  }
  if (!show) return null
  return (
    <ReactModal
      isOpen={Boolean(show)}
      portalClassName="c-react-modal-portal"
      overlayClassName="c-react-modal-overlay"
      bodyOpenClassName="c-react-modal-noscroll"
      className={classNames('c-react-modal-content', className)}
      // bodyOpenClassName={null}
      shouldCloseOnEsc={false}
      shouldCloseOnOverlayClick={Boolean(closeOnOverlayClick)}
      onRequestClose={onClose}
      style={{ content: modalWidth }}
      ariaHideApp={false}
      preventScroll={true}
      onAfterClose={removeBodyClass}
    >
      <header className="c-react-modal-header">
        <h4>{title && title}</h4>
        <button onClick={onClose} />
      </header>
      <section className={classNames('c-react-modal-body', bodyClassName)}>{children}</section>
    </ReactModal>
  )
}

export default Modal
