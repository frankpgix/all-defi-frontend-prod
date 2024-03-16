import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useToggle } from 'ahooks'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from '@@/common/Image'
import Button from '@@/common/Button'
import { useNotify } from '@/hooks/useNotify'
import AccountDialog from '@@/core/Wallet/Account'

const ConnectBtn = () => {
  const [show, { setLeft: closeDialog, setRight: openDialog }] = useToggle(false)
  const { address } = useAccount()
  const { hasNotify } = useNotify()

  const memoAccountHide = useMemo(() => {
    const _account = address
    if (_account && !hasNotify) return _account.replace(/(\w{4})\w*(\w{4})/, '$1...$2')
    if (_account && hasNotify) return _account.replace(/(\w{3})\w*/, '$1')
    return ''
  }, [address, hasNotify])
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, authenticationStatus, mounted }) => {
        const ready = mounted && authenticationStatus !== 'loading'
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated')

        return (
          <>
            {(() => {
              if (!connected) {
                return <Image src="icon/wallet-btn.svg" onClick={openConnectModal} />
              }

              return (
                <>
                  <Button size="medium" gradient round={hasNotify} onClick={openDialog}>
                    {memoAccountHide}
                  </Button>
                  <AccountDialog show={show} onClose={closeDialog} />
                </>
              )
            })()}
          </>
        )
      }}
    </ConnectButton.Custom>
  )
}

export default ConnectBtn
