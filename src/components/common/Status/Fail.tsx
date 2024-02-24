import React, { FC } from 'react'

import Dialog from '@@/common/Dialog'
import Button from '@@/common/Button'
import Image from '@@/common/Image'

interface Props {
  show: boolean
  msg?: string
  onClose: () => void
}

const Fail: FC<Props> = ({ show, onClose, msg = 'Transaction execution failure' }) => {
  return (
    <Dialog width="670px" show={show} onClose={onClose}>
      <div className="web-status-fail">
        <Image src="asset/modal-fail.png" />
        <h4>Sorry.</h4>
        {msg && <p>{msg}</p>}
        <Button size="medium" onClick={onClose}>
          confirm
        </Button>
      </div>
    </Dialog>
  )
}

Fail.defaultProps = {}

export default Fail
