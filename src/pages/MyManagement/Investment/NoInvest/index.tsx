import React, { FC } from 'react'

import Image from '@@/common/Image'
import Button from '@@/common/Button'

const NoInvest: FC = () => {
  return (
    <div className="web-manage-no-invest">
      <Image src="asset/investment-tip.png" />
      <h4>Opps, you haven't made an investment yet.</h4>
      <p>In the vault, choose vault to allocate based on data demonstrated by AllDeFi</p>
      <Button to="/fund-market">invest now</Button>
    </div>
  )
}

export default NoInvest
