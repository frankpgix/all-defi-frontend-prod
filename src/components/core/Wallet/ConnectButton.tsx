import { FC, ReactNode, useMemo } from 'react'

import { useToggle } from 'ahooks'
import { useAccount } from 'wagmi'

import { ConnectButton } from '@rainbow-me/rainbowkit'

import { useNotify } from '@/hooks/useNotify'

import Button from '@@/common/Button'
import Image from '@@/common/Image'
import AccountDialog from '@@/core/Wallet/Account'

function CustomComponent(props: any) {
  const { as: Component = 'div', ...otherProps } = props
  return <Component {...otherProps} />
}

interface Props {
  simple?: boolean
  children?: ReactNode
  as?: string
  size?: 'default' | 'mini' | 'medium' | 'icon' | 'tiny'
}

const ConnectBtn: FC<Props> = ({ simple, children, as, size = 'medium' }) => {
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
              if (simple) {
                return (
                  <>
                    {children ? (
                      <CustomComponent as={as} onClick={openConnectModal}>
                        {children}
                      </CustomComponent>
                    ) : (
                      <Button size={size} onClick={openConnectModal}>
                        Connect Wallet
                      </Button>
                    )}
                  </>
                )
              }

              if (!connected) {
                return <Image src="icon/wallet-btn.svg" onClick={openConnectModal} />
              }

              return (
                <>
                  {/* <Button size="medium" gradient onClick={openChainModal}>
                    Net
                  </Button> */}
                  <Button size={size} gradient round={hasNotify} onClick={openDialog}>
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
