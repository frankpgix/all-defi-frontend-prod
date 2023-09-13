import React, { FC, useMemo, useState } from 'react'
import { utils } from 'ethers'
import classNamses from 'classnames'
import { useSnapshot } from 'valtio'
// import { parseUri } from '@walletconnect/utils'
import derivativesConfig from '@/config/derivatives'
import { FundBaseProps, FundDetailProps } from '@/class/help'
import Image from '@@/common/Image'
import ALink from '@@/common/ALink'
import { Input } from '@@/common/Form'
import Button from '@@/common/Button'
import Dialog from '@@/common/Dialog/Info'
import Loading from '@@/common/Loading'
// import { notify } from '@@/common/Toast'

// import { sleep } from '@/utils/tools'
import { signClient } from './utils/WalletConnectUtil'
// import { createLegacySignClient, deleteCachedLegacySession } from './utils/tools'
// import { getSdkError } from '@walletconnect/utils'
// import { sleep } from '@/utils/tools'
import dappStore from '@/stores/dappStore'
import { getSdkError } from '@walletconnect/utils'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'

import { useInit } from './hooks/useInit'
import { useCacheSession } from './hooks/useCacheSession'
import { useWalletConnectEventsManager } from './hooks/useWalletConnectEventsManager'
interface Props {
  base: FundBaseProps
  data: FundDetailProps
}
// createWeb3Wallet()

const Dapp: FC<Props> = ({ base, data }) => {
  const { signer } = useProfile()
  const [uri, setUri] = useState('')
  const [show, setShow] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  //
  const { appName, appIcon, topic, isConnect, loading } = useSnapshot(dappStore.state)
  const { createNotify } = useNotify()
  //
  const fundAddress = useMemo(() => data.address, [data.address])
  const derivatives = useMemo(
    () =>
      base.derivatives.map((item) => {
        const name: string = utils.parseBytes32String(item)
        let url = ''
        if (derivativesConfig[name]) {
          url = derivativesConfig[name].url
        }
        return { name, value: item, url }
      }),
    [base.derivatives]
  )

  const onConnect = async () => {
    try {
      dappStore.setLoading(true)
      await signClient.pair({ uri })
    } catch (err: unknown) {
      // notify.error('Something Error, try late')
      createNotify({ type: 'error', content: 'Dapp Something Error, try late' })
    } finally {
      setUri('')
      dappStore.setLoading(true)
      setShowDialog(false)
    }
  }

  const isInit = useInit()
  useWalletConnectEventsManager(isInit, fundAddress, signer)
  useCacheSession()

  const onDisconnect = async () => {
    if (signClient) {
      dappStore.setLoading(true)
      dappStore.setAppName('')
      dappStore.setIsConnect(false)
      setUri('')
      try {
        await signClient.disconnect({ topic, reason: getSdkError('USER_DISCONNECTED') })
      } catch (error) {
        console.log(error)
      } finally {
        localStorage.removeItem('wc@2:core:0.3//subscription')
        localStorage.removeItem('wc@2:client:0.3//proposal')
        localStorage.removeItem('wc@2:core:0.3//pairing')
        localStorage.removeItem('wc@2:core:0.3//expirer')
        localStorage.removeItem('wc@2:core:0.3//history')
        localStorage.removeItem('wc@2:client:0.3//session')
        localStorage.removeItem('wc@2:core:0.3//keychain')
        localStorage.removeItem('wc@2:core:0.3//messages')
        dappStore.setLoading(false)
      }
    }
  }

  const isDisabled = useMemo(() => {
    return !/^wc:[0-9a-f]{64}@\d+\?relay-protocol=irn&symKey=[0-9a-f]{64}$/.test(uri)
  }, [uri])

  console.log(appIcon)

  return (
    <>
      <div className="web-manage-dapp">
        <div className="web-manage-dapp-section">
          <header className="web-manage-dapp-section-header">Dapps you can choose to use</header>
          <section className="web-manage-dapp-derivatives">
            {derivatives.map((item, index) => (
              <ALink to={item.url} title={item.name} key={index}>
                <Image src={`products/${item?.name}.png`} alt={item?.name} />
              </ALink>
            ))}
          </section>
        </div>
        <div className="web-manage-dapp-section">
          <header className="web-manage-dapp-section-header">Dapps link</header>
          <section className="web-manage-dapp-wc">
            {isConnect ? (
              <div className="web-manage-dapp-connect">
                <div className="web-manage-dapp-connect-app">
                  {appIcon && <Image src={appIcon} />}
                  <Input value={appName} placeholder={''} readonly />
                </div>
                <Button onClick={onDisconnect}>disconnect</Button>
              </div>
            ) : (
              <main>
                {/* <Input
                  value={uri}
                  placeholder="Please enter the wallet connect info of the Dapp"
                  onChange={setUri}
                /> */}
                <Button onClick={() => setShowDialog(true)}>CONNECT DAPP</Button>
              </main>
            )}
            <Help value={show} onChange={setShow} fundAddress={fundAddress} />
          </section>
        </div>
        <HelpDetail show={show} onClose={setShow} />
        <Loading show={loading} type="float" />
      </div>
      <Dialog
        show={showDialog}
        title="Connect with WalletConnect"
        msg={
          <>
            Do not close this window while connecting. <br />
            Have a question? Follow this guide.
          </>
        }
        onClose={() => setShowDialog(false)}
        confirmText="CONNECT"
        hideCancelButton
        onConfirm={onConnect}
      >
        <div className="web-manage-dapp-dialog">
          <Input
            value={uri}
            placeholder="Please enter the wallet connect info of the Dapp"
            onChange={setUri}
          />
        </div>
      </Dialog>
    </>
  )
}

export default Dapp

const Help: FC<{ value: boolean; onChange: (val: boolean) => void; fundAddress: string }> = ({
  value,
  onChange,
  fundAddress
}) => {
  return (
    <div className="web-manage-dapp-help">
      <h3>Please make sure read the following info before connecting.</h3>
      <ul>
        <li>1. Please enter the wallet connect info of the dapp in the input box.</li>
        <li>2. Click confirm to link the fund with the Dapp.</li>
        <li>
          3. Make sure the Dapp is connected to the address: <strong>{fundAddress}</strong>
        </li>
      </ul>
      <footer>
        <Button text onClick={() => onChange(!value)}>
          I don’t understand how to link dapps
        </Button>
      </footer>
    </div>
  )
}

const HelpDetail: FC<{ show: boolean; onClose: (val: boolean) => void }> = ({ show, onClose }) => {
  return (
    <div className={classNamses('web-manage-dapp-help-detail', { show })}>
      <article>
        <aside>
          <Image src="asset/dapp-1.jpg" />
        </aside>
        <dl>
          <dt>Step 1</dt>
          <dd>
            Go to the Dapp website that you have authorised, and choose to coinnect with
            WalletConnect
          </dd>
        </dl>
      </article>
      <article>
        <aside>
          <Image src="asset/dapp-2.jpg" />
        </aside>
        <dl>
          <dt>Step 2</dt>
          <dd>Click the "Copy to Clipboard" under the QR code</dd>
        </dl>
      </article>
      <article>
        <aside>
          <Image src="asset/dapp-3.jpg" />
        </aside>
        <dl>
          <dt>Step 3</dt>
          <dd>Paste the information into the "Dapp Link" of AllDeFi, and click Connect.</dd>
        </dl>
      </article>
      <article>
        <aside>
          <Image src="asset/dapp-4.jpg" />
        </aside>
        <dl>
          <dt>Step 4</dt>
          <dd>
            Only one Dapp can be connected at same time, if you want to connect to another Dapp,
            please disconnect WalletConnect first.
          </dd>
        </dl>
      </article>
      <Button text onClick={() => onClose(false)}>
        close the tips
      </Button>
    </div>
  )
}
