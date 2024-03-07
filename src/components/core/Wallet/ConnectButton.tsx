import { FC, useEffect, useState, useMemo, useCallback, ReactNode } from 'react'
import { useAccount, useConnect } from 'wagmi'
// import { type UseWriteContractParameters } from 'wagmi'
import WalletDialog from '@/components/core/Wallet'
import AccountDialog from '@/components/core/Wallet/Account'
import Button from '@/components/common/Button'
import Image from '@/components/common/Image'
import { useNotify } from '@/hooks/useNotify'

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
  // const chains = useChains()
  // const { switchChain } = useSwitchChain()
  const { connectAsync, connectors, isPending } = useConnect()
  const { hasNotify, loadingNotifyCount, openNotifyList, closeNotifyList, notifyShow } = useNotify()

  // const [needSwitchNet, setNeedSwitchNet] = useState<boolean>(false)
  const [showWalletInf, setShowWalletInf] = useState<boolean>(false)
  const [dialogStatus, setDialogStatus] = useState<string>('')

  const todoWalletLogin = async (connectorsIndex: number) => {
    const connector = connectors[connectorsIndex]

    if (connector === undefined) {
      console.error('Wallet Connector is undefined. Please refresh and try again.')
      return
    }

    // if (!connector.ready && connectorsIndex === 0) {
    //   window.open('https://metamask.io/download/', '_blank')
    //   return
    // }

    const connectRes = await connectAsync({ connector })

    if (!connectRes) {
      console.error('Wallet Connector could not connect. Please refresh and try again.')
      return
    }

    // if (connectRes.chain.unsupported) {
    //   setNeedSwitchNet(true)
    //   return
    // }
  }

  const memoAccountHide = useMemo(() => {
    const _account = address
    if (_account && !hasNotify) return _account.replace(/(\w{4})\w*(\w{4})/, '$1...$2')
    if (_account && hasNotify) return _account.replace(/(\w{3})\w*/, '$1')
    return ''
  }, [address, hasNotify])

  const onClickWalletCb = useCallback(() => {
    if (address) {
      setShowWalletInf(!showWalletInf)
    } else {
      setDialogStatus('connect')
    }
  }, [address, showWalletInf])

  const onCloseDialogEv = () => setDialogStatus('')

  useEffect(() => {
    if (!isPending && activeConnector && address) setDialogStatus('')
  }, [address, isPending, activeConnector])

  useEffect(() => {
    if (!activeConnector) setShowWalletInf(false)
  }, [activeConnector])

  // useEffect(() => {
  //   if ((chain?.unsupported || needSwitchNet) && switchChain) switchChain(chains[0]?.id)
  // }, [chain, needSwitchNet, switchChain, chains])

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
        <>
          <Button
            size="medium"
            gradient
            round={hasNotify}
            onClick={() => setDialogStatus('account')}
          >
            {memoAccountHide}
          </Button>
        </>
      ) : (
        <>
          <Image src="icon/wallet-btn.svg" onClick={onClickWalletCb} />
        </>
      )}
      {hasNotify ? (
        <Button
          size="medium"
          orange
          round={loadingNotifyCount === 0}
          onClick={notifyShow ? closeNotifyList : openNotifyList}
        >
          {loadingNotifyCount > 0 ? `${loadingNotifyCount} pending...` : <InfoSvg />}
        </Button>
      ) : null}
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

const InfoSvg = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="4194"
    width="24"
    height="24"
  >
    <path
      d="M805.888 671.744V444.928c0-134.144-94.208-253.952-224.768-287.232V133.12c0-36.864-20.992-65.536-51.712-72.192-6.144-2.048-12.288-2.048-17.408-2.048-38.912 0-69.12 32.256-69.12 73.216v26.112c-130.56 32.256-224.768 152.064-224.768 286.72v226.816l-87.04 89.6v52.224h762.368v-52.224l-87.552-89.6z m81.92 136.192H136.192V762.88l87.04-89.6V444.928c0-137.728 97.792-252.928 224.768-282.624v-30.208c0-37.376 27.136-68.096 64-68.096 4.608 0 10.24 0 15.872 1.536 30.208 6.656 48.128 35.328 48.128 67.072v28.672c126.976 30.208 224.768 145.408 224.768 283.136v228.864l87.04 89.6v45.056zM418.816 871.936c0 52.224 40.96 93.184 93.184 93.184s93.184-40.96 93.184-93.184v-5.12H418.816v5.12z m181.248 0c0 49.664-38.4 88.064-88.064 88.064s-88.064-38.4-88.064-88.064h176.128z"
      p-id="4195"
      fill="#ffffff"
    ></path>
    <path
      d="M736.768 699.392V444.928c0-103.424-74.24-196.096-176.128-220.672l-48.64-11.776-48.64 11.776c-102.4 24.064-176.128 117.76-176.128 220.672v254.464l-18.432 18.432-24.576 25.6h536.064l-24.576-25.6-18.944-18.432zM256 738.304l16.384-16.896 19.968-19.968V444.928c0-101.888 72.192-192.512 172.032-216.064l47.616-11.776 47.616 11.776c99.84 24.576 172.032 115.2 172.032 216.064V701.44l19.968 19.968 16.384 16.896H256zM512 960c49.664 0 88.064-38.4 88.064-88.064H423.936c0 49.664 38.4 88.064 88.064 88.064z"
      p-id="4196"
      fill="#ffffff"
    ></path>
    <path
      d="M800.768 444.928c0-137.728-97.792-252.928-224.768-283.136V133.12c0-32.256-17.408-60.928-48.128-67.072-5.632-1.536-11.264-1.536-15.872-1.536-36.864 0-64 30.208-64 68.096v30.208C321.024 192 223.232 307.2 223.232 444.928v228.864l-87.04 89.6v45.056h752.128v-45.056l-87.04-89.6V444.928zM244.224 743.424l24.576-25.6 18.432-18.432V444.928c0-103.424 73.728-196.608 176.128-220.672l48.64-11.776 48.64 11.776c101.376 24.576 176.128 117.76 176.128 220.672v254.464l18.432 18.432 24.576 25.6H244.224z"
      p-id="4197"
      fill="#ffffff"
    ></path>
  </svg>
)
