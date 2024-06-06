import { FC } from 'react'

import Button from '@@/common/Button'
import Image from '@@/common/Image'

const NoInvest: FC = () => {
  return (
    <div className="web-manage-no-invest">
      <Image src="asset/investment-tip.png" />
      <h4>Opps, you haven't made an investment yet.</h4>
      <p>In the vault, choose vault to stake based on data demonstrated by AllDeFi</p>
      <Button to="/vaults">invest now</Button>
    </div>
  )
}

export default NoInvest
