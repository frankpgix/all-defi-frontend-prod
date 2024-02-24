import React, { FC } from 'react'

import Dialog from '@@/common/Dialog'
import Button from '@@/common/Button'
// import Image from '@@/common/Image'

import { LIGHT_PAPERS_URL } from '@/config'

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
      <div className="web-status-coming-soon">
        <div className="web-status-coming-soon-icon">
          <p>
            <i></i>
          </p>
        </div>
        <article>
          <small>ALLDEFI IS</small>
          <h4>Coming Soon</h4>
          <p>A Decentralized Asset Management Platform on Blockchain.</p>
          <Button to={LIGHT_PAPERS_URL} onClick={onConfirmFunc}>
            read lightpapers
          </Button>
        </article>
      </div>
    </Dialog>
  )
}

Info.defaultProps = {}

export default Info
