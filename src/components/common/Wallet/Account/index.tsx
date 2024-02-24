import React, { FC, useEffect, useState, useCallback, useMemo } from 'react'
import { useDisconnect } from 'wagmi'
import { useTranslation } from 'react-i18next'

import { ETH_SCAN_URL } from '@/config'
import { safeInterceptionValues, calcShortHash } from '@/utils/tools'
import { useProfile } from '@/hooks/useProfile'

import Dialog from '@/components/common/Dialog'
import Button from '@/components/common/Button'
import Image from '@/components/common/Image'
import CopyText from '@/components/common/CopyText'

interface Props {
  show: boolean
  onClose: () => void
}

const AccountDialog: FC<Props> = ({ show, onClose }) => {
  const { t } = useTranslation()
  const { signer, account } = useProfile()

  const [ethBlance, setEthBlance] = useState('0')
  const shortAddress = useMemo(() => calcShortHash(account, 8, 8), [account])
  const { disconnect } = useDisconnect()
  const disconnectEv = () => {
    onClose()
    disconnect()
  }

  const getData = useCallback(async () => {
    if (signer) {
      const blances = await signer.getBalance()
      const value = safeInterceptionValues(blances, 8, 18)
      setEthBlance(value)
    }
  }, [signer])

  useEffect(() => void getData(), [getData])

  return (
    <Dialog width="670px" show={show} onClose={onClose}>
      <div className="web-account-dialog">
        <h2>Wallet Managment.</h2>
        <div className="web-account-dialog-address">
          <address>{shortAddress}</address> <CopyText text={account} />
        </div>
        <ul className="web-account-dialog-blance">
          <li>
            <i>
              <Image src="icon/eth.svg" />
            </i>
            <span>{ethBlance} ETH</span>
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
