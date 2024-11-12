import { FC } from 'react'

import CreateVaultButton from '@@/Vaults/CreateVaultButton'
import Image from '@@/common/Image'

const NoInvest: FC = () => {
  return (
    <div className="web-manage-no-invest">
      <Image src="asset/investment-tip.png" />
      <h4>Opps, you haven't created a Vault yet.</h4>
      <p>
        Click the button below and follow the steps to complete the establishment of your first
        vault
      </p>
      <CreateVaultButton large children="Create a Vault" />
    </div>
  )
}

export default NoInvest
