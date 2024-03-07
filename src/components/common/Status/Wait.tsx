import { FC } from 'react'

import Dialog from '@/components/common/Dialog'
// import Button from '@/components/common/Button'
// import Video from '@/components/common/Video'

interface Props {
  show: boolean
}

const Wait: FC<Props> = ({ show }) => {
  return (
    <Dialog width="670px" show={show}>
      <div className="web-status-wait">
        <div className="web-status-wait-icon">
          <p>
            <i></i>
          </p>
        </div>
        <h4>Pending.</h4>
        <span />
      </div>
    </Dialog>
  )
}

Wait.defaultProps = {}

export default Wait
