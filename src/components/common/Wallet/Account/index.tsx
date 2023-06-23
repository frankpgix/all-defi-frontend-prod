import React, { FC, useMemo } from 'react'
import { useAccount, useBalance, useDisconnect } from 'wagmi'

import { ETH_SCAN_URL } from '@/config'
import { calcShortHash } from '@/utils/tools'

import Dialog from '@/components/common/Dialog'
import Button from '@/components/common/Button'
import Image from '@/components/common/Image'
import CopyText from '@/components/common/CopyText'

interface Props {
  show: boolean
  onClose: () => void
}

const AccountDialog: FC<Props> = ({ show, onClose }) => {
  const { address } = useAccount()

  const { data: ethBalance } = useBalance({
    address,
    watch: true
  })

  const shortAddress = useMemo(() => calcShortHash(address ?? '', 12, 12), [address])
  const { disconnect } = useDisconnect()
  const disconnectEv = () => {
    onClose()
    disconnect()
  }

  return (
    <Dialog width="670px" show={show} onClose={onClose}>
      <div className="web-account-dialog">
        <h2>Wallet Managment.</h2>
        <div className="web-account-dialog-address">
          <address>{shortAddress}</address> <CopyText text={address ?? ''} />
        </div>
        <ul className="web-account-dialog-blance">
          <li>
            <i>
              <Image src="icon/eth.svg" />
            </i>
            <span>{ethBalance?.formatted} ETH</span>
          </li>
        </ul>
        <footer>
          <Button outline onClick={disconnectEv}>
            disconnect
          </Button>
          <Button to={`${ETH_SCAN_URL}/address/${address}`}>view on browser</Button>
        </footer>
      </div>
    </Dialog>
  )
}

AccountDialog.defaultProps = {}

export default AccountDialog
