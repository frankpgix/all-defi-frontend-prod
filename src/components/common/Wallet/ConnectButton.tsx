import React, { FC, useEffect, useState, useMemo, useCallback, ReactNode } from 'react'
import { useAccount, useConnect, useNetwork, useSwitchNetwork } from 'wagmi'

import WalletDialog from '@/components/common/Wallet'
import AccountDialog from '@/components/common/Wallet/Account'
import Button from '@/components/common/Button'
import Image from '@/components/common/Image'

interface Props {
  simple?: boolean
  children?: ReactNode
  as?: string
}
function CustomComponent(props: any) {
  const { as: Component = 'div', ...otherProps } = props
  return <Component {...otherProps} />
}

const Connect: FC<Props> = ({ simple, children, as = 'div' }) => {
  const { connector: activeConnector, isConnected, address } = useAccount()
  const { chain, chains } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { connectAsync, connectors, isLoading } = useConnect()

  const [needSwitchNet, setNeedSwitchNet] = useState<boolean>(false)
  const [showWalletInf, setShowWalletInf] = useState<boolean>(false)
  const [dialogStatus, setDialogStatus] = useState<string>('')

  const todoWalletLogin = async (connectorsIndex: number) => {
    const connector = connectors[connectorsIndex]

    if (connector === undefined) {
      // window.toast.error('Wallet Connector is undefined. Please refresh and try again.')
      return
    }

    if (!connector.ready && connectorsIndex === 0) {
      window.open('https://metamask.io/download/', '_blank')
      return
    }

    const connectRes = await connectAsync({ connector })

    if (!connectRes) {
      // window.toast.error('Wallet Connector could not connect. Please refresh and try again.')
      return
    }

    if (connectRes.chain.unsupported) {
      setNeedSwitchNet(true)
      return
    }
  }

  const memoAccountHide = useMemo(() => {
    const _account = address
    if (_account) return _account.replace(/(\w{4})\w*(\w{4})/, '$1...$2')
    return ''
  }, [address])

  const onClickWalletCb = useCallback(() => {
    if (address) {
      setShowWalletInf(!showWalletInf)
    } else {
      setDialogStatus('connect')
    }
  }, [address, showWalletInf])

  const onCloseDialogEv = () => setDialogStatus('')

  useEffect(() => {
    if (!isLoading && activeConnector && address) setDialogStatus('')
  }, [address, isLoading, activeConnector])

  useEffect(() => {
    if (!activeConnector) setShowWalletInf(false)
  }, [activeConnector])

  useEffect(() => {
    if ((chain?.unsupported || needSwitchNet) && switchNetwork) switchNetwork(chains[0]?.id)
  }, [chain, needSwitchNet, switchNetwork, chains])

  if (simple) {
    return (
      <>
        {children ? (
          <CustomComponent as={as} onClick={onClickWalletCb}>
            {children}
          </CustomComponent>
        ) : (
          <Button onClick={onClickWalletCb}>Connect Wallet</Button>
        )}
        <WalletDialog
          show={dialogStatus === 'connect'}
          onClose={onCloseDialogEv}
          onClick={todoWalletLogin}
        />
      </>
    )
  }
  return (
    <>
      {isConnected ? (
        <Button size="medium" gradient onClick={() => setDialogStatus('account')}>
          {memoAccountHide}
        </Button>
      ) : (
        <Image src="icon/wallet-btn.svg" onClick={onClickWalletCb} />
      )}
      <WalletDialog
        show={dialogStatus === 'connect'}
        onClose={onCloseDialogEv}
        onClick={todoWalletLogin}
      />
      <AccountDialog show={dialogStatus === 'account'} onClose={onCloseDialogEv} />
    </>
  )
}

export default Connect
// <Button icon="icon/wallet.svg" gradient size="icon" onClick={onClickWalletCb} />
