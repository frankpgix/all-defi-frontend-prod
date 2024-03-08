import { FC, useMemo, ReactNode } from 'react'
import { useAccount, useConnect, Connector } from 'wagmi'
import { useToggle } from 'ahooks'

import { useNotify } from '@/hooks/useNotify'
import AccountDialog from '@@/core/Wallet/Account'
import Button from '@@/common/Button'
import Dialog from '@@/common/Dialog'
import Image from '@@/common/Image'

interface Props {
  simple?: boolean
  children?: ReactNode
  as?: string
}
const Connect: FC<Props> = ({ simple, children, as = 'div' }) => {
  const [show, { setLeft: closeDialog, setRight: openDialog }] = useToggle(false)
  const { address, isConnected } = useAccount()
  const { hasNotify } = useNotify()

  const memoAccountHide = useMemo(() => {
    const _account = address
    if (_account && !hasNotify) return _account.replace(/(\w{4})\w*(\w{4})/, '$1...$2')
    if (_account && hasNotify) return _account.replace(/(\w{3})\w*/, '$1')
    return ''
  }, [address, hasNotify])

  // useEffect(() => {
  //   if (isConnected) closeDialog()
  // }, [isConnected])

  if (simple) {
    return (
      <>
        {children ? (
          <CustomComponent as={as} onClick={openDialog}>
            {children}
          </CustomComponent>
        ) : (
          <Button size="medium" onClick={openDialog}>
            Connect Wallet
          </Button>
        )}
        <ConnectDialog show={show} onClose={closeDialog} />
      </>
    )
  }
  if (isConnected) {
    return (
      <>
        <Button size="medium" gradient round={hasNotify} onClick={openDialog}>
          {memoAccountHide}
        </Button>
        <AccountDialog show={show} onClose={closeDialog} />
      </>
    )
  }
  return (
    <>
      <Image src="icon/wallet-btn.svg" onClick={openDialog} />
      <ConnectDialog show={show} onClose={closeDialog} />
    </>
  )
}
export default Connect

interface ConnectorItemProps {
  connector: Connector
  onClick: () => void
}

const getConnectorIcon = (id: string) => {
  const icons: Record<string, string> = {
    coinbaseWalletSDK: 'icon/coinbase.svg',
    walletConnect: 'icon/wallet-connect.svg',
    injected: 'asset/wallet.png',
    'com.okex.wallet': 'icon/okx.svg',
    'io.metamask': 'icon/metamask.svg'
  }
  return icons[id] ?? ''
}

const ConnectorItem: FC<ConnectorItemProps> = ({ connector, onClick }) => {
  return (
    <div className="web-account-dialog-list-item" onClick={onClick}>
      <Image src={`${getConnectorIcon(connector.id)}`} />
      <p>{connector.name === 'Injected' ? 'Other' : connector.name}</p>
    </div>
  )
}

function CustomComponent(props: any) {
  const { as: Component = 'div', ...otherProps } = props
  return <Component {...otherProps} />
}

interface ConnectDialogProps {
  show: boolean
  onClose: () => void
}

const ConnectDialog: FC<ConnectDialogProps> = ({ show, onClose }) => {
  const { connectors, connectAsync, reset } = useConnect()
  const onConnect = async (connector: Connector) => {
    await connectAsync({ connector }).then(onClose).catch(reset)
  }
  return (
    <Dialog width="670px" show={show} onClose={onClose}>
      <div className="web-account-dialog">
        <header>Connect Your Wallet</header>
        <div className="web-account-dialog-list">
          {[...connectors].reverse().map((connector) => (
            <ConnectorItem
              key={connector.name}
              connector={connector}
              onClick={() => onConnect(connector)}
            />
          ))}
        </div>
      </div>
    </Dialog>
  )
}
