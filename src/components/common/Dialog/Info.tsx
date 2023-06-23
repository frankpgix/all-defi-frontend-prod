import React, { FC } from 'react'

import Dialog from '@@/common/Dialog'
import Button from '@@/common/Button'
// import Image from '@@/common/Image'
import Video from '@/components/common/Video'

interface Props {
  show: boolean
  title?: string
  msg?: string
  onClose: () => void
  onConfirm?: () => void
  type?: 'info' | 'succ' | 'fail' | 'wait'
}

const Info: FC<Props> = ({ show, onClose, msg, onConfirm, title, type = 'info' }) => {
  const onConfirmFunc = () => {
    onConfirm && onConfirm()
    onClose()
  }
  return (
    <Dialog width="670px" show={show} onClose={onClose}>
      <div className="web-status-info">
        <div className="web-status-wait-icon">
          <p>
            <i></i>
          </p>
        </div>
        {title && <h4>{title}</h4>}
        {msg && <p>{msg}</p>}
        <footer>
          <Button outline onClick={onClose}>
            cancel
          </Button>
          <Button onClick={onConfirmFunc}>confirm</Button>
        </footer>
      </div>
    </Dialog>
  )
}

Info.defaultProps = {}

export default Info
