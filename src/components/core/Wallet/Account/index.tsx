import { FC, useMemo } from 'react'

import { useAccount, useBalance, useDisconnect } from 'wagmi'

import { useChainToken } from '@/hooks/useToken'

import Button from '@/components/common/Button'
import CopyText from '@/components/common/CopyText'
import Dialog from '@/components/common/Dialog'
import Image from '@/components/common/Image'
import { calcShortHash, safeInterceptionValues } from '@/utils/tools'

interface Props {
  show: boolean
  onClose: () => void
}

const AccountDialog: FC<Props> = ({ show, onClose }) => {
  const { address: account, chain } = useAccount()
  const { chainToken } = useChainToken()

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
              <Image src={chainToken.icon} />
            </i>
            <span>
              {safeInterceptionValues(data?.value ?? '', chainToken.precision, chainToken.decimals)}{' '}
              {chainToken.name}
            </span>
          </li>
        </ul>
        <footer>
          <Button outline onClick={disconnectEv}>
            disconnect
          </Button>
          <Button to={`${chain?.blockExplorers?.default.url}/address/${account}`}>
            VIEW IN BROWSER
          </Button>
        </footer>
      </div>
    </Dialog>
  )
}

AccountDialog.defaultProps = {}

export default AccountDialog
