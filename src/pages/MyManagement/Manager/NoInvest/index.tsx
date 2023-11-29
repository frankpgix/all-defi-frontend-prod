import React, { FC } from 'react'

import Image from '@@/common/Image'
import Button from '@@/common/Button'

const NoInvest: FC = () => {
  return (
    <div className="web-manage-no-invest">
      <Image src="asset/investment-tip.png" />
      <h4>Opps, you haven't created a fund yet.</h4>
      <p>
        Click the button below and follow the steps to complete the establishment of your first
        vault
      </p>
      <Button to="/manage/manager/create">create a fund now</Button>
    </div>
  )
}

export default NoInvest
