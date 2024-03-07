import { FC } from 'react'

import Dialog from '@/components/common/Dialog'
import Image from '@/components/common/Image'

interface Props {
  show: boolean
  onClose: () => void
  onClick: (index: number) => void
}

export const wallets = [
  {
    title: 'MetaMask',
    icon: 'metamask.svg',
    id: 3
  },
  {
    title: 'Coinbase Wallet',
    icon: 'coinbase.svg',
    id: 1
  },
  {
    title: 'WalletConnect',
    icon: 'wallet-connect.svg',
    id: 2
  },
  {
    title: 'Injected',
    hidden: true,
    icon: 'metamask.svg',
    id: 3
  }
]

const WalletDialog: FC<Props> = ({ show, onClose, onClick }) => {
  return (
    <Dialog width="670px" show={show} onClose={onClose}>
      <div className="web-account-dialog">
        <header>Connect Your Wallet</header>
        <div className="web-account-dialog-list">
          {wallets
            .filter((w) => !w.hidden)
            .map((w) => (
              <div
                className="web-account-dialog-list-item"
                key={w.title}
                onClick={() => onClick(w.id)}
              >
                <Image src={`icon/${w.icon}`} />
                <p>{w.title}</p>
              </div>
            ))}
        </div>
      </div>
    </Dialog>
  )
}

WalletDialog.defaultProps = {}

export default WalletDialog
