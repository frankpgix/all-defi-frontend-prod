import { FC } from 'react'

import Dialog from '@@/common/Dialog'
import Button from '@@/common/Button'
import Image from '@@/common/Image'

interface Props {
  show: boolean
  onClose: () => void
  onConfirm?: () => void
}

const Success: FC<Props> = ({ show, onClose, onConfirm }) => {
  const onConfirmFunc = () => {
    onClose()
    onConfirm?.()
  }
  return (
    <Dialog width="670px" show={show} onClose={onClose}>
      <div className="web-status-success">
        <Image src="asset/modal-succ.png" />
        <h4>Successful.</h4>
        <Button size="medium" onClick={onConfirmFunc}>
          confirm
        </Button>
      </div>
    </Dialog>
  )
}

Success.defaultProps = {}

export default Success
