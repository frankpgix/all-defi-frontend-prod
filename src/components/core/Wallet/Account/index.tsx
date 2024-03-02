import { FC, useMemo } from 'react'
import { useDisconnect, useAccount, useBalance } from 'wagmi'

import { ETH_SCAN_URL } from '@/config'
import { safeInterceptionValues, calcShortHash } from '@/utils/tools'

import Dialog from '@/components/common/Dialog'
import Button from '@/components/common/Button'
import Image from '@/components/common/Image'
import CopyText from '@/components/common/CopyText'

interface Props {
  show: boolean
  onClose: () => void
}

const AccountDialog: FC<Props> = ({ show, onClose }) => {
  const { address: account } = useAccount()

  const shortAddress = useMemo(() => calcShortHash(account, 8, 8), [account])
  const { disconnect } = useDisconnect()
  const { data } = useBalance({ address: account })

  const disconnectEv = () => {
    onClose()
    disconnect()
  }

  return (
    <Dialog width="670px" show={show} onClose={onClose}>
      <div className="web-account-dialog">
        <h2>Wallet Managment.</h2>
        <div className="web-account-dialog-address">
          <address>{shortAddress}</address> <CopyText text={account ?? ''} />
        </div>
        <ul className="web-account-dialog-blance">
          <li>
            <i>
              <Image src="icon/eth.svg" />
            </i>
            <span>{safeInterceptionValues(data?.value ?? '', 6, 18)} ETH</span>
          </li>
        </ul>
        <footer>
          <Button outline onClick={disconnectEv}>
            disconnect
          </Button>
          <Button to={`${ETH_SCAN_URL}/address/${account}`}>VIEW IN BROWSER</Button>
        </footer>
      </div>
    </Dialog>
  )
}

AccountDialog.defaultProps = {}

export default AccountDialog
