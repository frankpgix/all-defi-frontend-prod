import { FC, useCallback, useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import type {
  AddressBookItem,
  BaseTransaction,
  EIP712TypedData,
  RequestId,
  SafeSettings,
  SendTransactionRequestParams
} from '@safe-global/safe-apps-sdk'
import { Methods } from '@safe-global/safe-apps-sdk'
import {
  getBalances,
  getTransactionDetails
  // getSafeMessage
} from '@safe-global/safe-gateway-typescript-sdk'

import { isSameUrl } from '@/utils/url'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'
// import { useNetwork } from 'wagmi'

import Loading from '@@/common/Loading'

// import { safeMsgSubscribe, SafeMsgEvent } from './services/safe-messages/safeMsgEvents'
import { useAppIsLoading } from './hooks/useAppIsLoading'
import { useAppCommunicator, CommunicatorMessages } from './hooks/useAppCommunicator'
import { useSafeAppFromBackend } from './hooks/useSafeAppFromBackend'
import { useSafeAppFromManifest } from './hooks/useSafeAppFromManifest'
import { useSafePermissions } from './hooks/permissions'
import { useGetSafeInfo } from './hooks/useGetSafeInfo'

import { chain } from './config/chains'
import { hasFeature, FEATURES } from './utils/chains'
import { onTransaction, onSign } from './utils/tools'

import SafeAppIframe from './c/IFrame'

const allowedFeaturesList = ''

let init = true

const DappIframe: FC = () => {
  const [searchParams] = useSearchParams()
  const nav = useNavigate()
  const { createNotify } = useNotify()
  // const [init, setInit] = useState(true)

  const appUrl = searchParams.get('dapp') ?? ''
  // console.log()
  const { iframeRef, appIsLoading, isLoadingSlow, setAppIsLoading } = useAppIsLoading()
  // const [appUrl, setAppUrl] = useState('https://app.aave.com/')
  const { account } = useProfile()
  const chainId = '42161'
  // const { chain, chains } = useNetwork()
  // console.log(chain, chains)
  const [settings, setSettings] = useState<SafeSettings>({
    offChainSigning: true
  })
  // const [currentRequestId, setCurrentRequestId] = useState<RequestId | undefined>()
  const [remoteApp, , isBackendAppsLoading] = useSafeAppFromBackend(appUrl, chainId)
  const { safeApp: safeAppFromManifest, isLoading } = useSafeAppFromManifest(appUrl || '', chainId)
  const { safeAddress } = useGetSafeInfo()()

  const {
    getPermissions,
    // hasPermission,
    // permissionsRequest,
    setPermissionsRequest
    // confirmPermissionRequest
  } = useSafePermissions()

  const onIframeLoad = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe || !isSameUrl(iframe.src, appUrl)) {
      return
    }

    setAppIsLoading(false)
  }, [appUrl, iframeRef, setAppIsLoading])

  const communicator = useAppCommunicator(iframeRef, remoteApp || safeAppFromManifest, chain, {
    onConfirmTransactions: async (
      txs: BaseTransaction[],
      requestId: RequestId,
      params?: SendTransactionRequestParams
    ) => {
      const data = {
        app: safeAppFromManifest,
        appId: remoteApp ? String(remoteApp.id) : undefined,
        requestId: requestId,
        txs: txs,
        params: params
      }
      console.log(111222, data, safeAddress, account)
      const safeTxHash = await onTransaction(txs, safeAddress, account, createNotify)
      // setCurrentRequestId(requestId)
      if (safeTxHash) {
        communicator?.send({ safeTxHash }, requestId)
      } else {
        communicator?.send(CommunicatorMessages.REJECT_TRANSACTION_MESSAGE, requestId, true)
      }
      // setTxFlow(<SafeAppsTxFlow data={data} />, onTxFlowClose)
    },
    onSignMessage: async (
      message: string | EIP712TypedData,
      requestId: string,
      method: Methods.signMessage | Methods.signTypedMessage,
      sdkVersion: string
    ) => {
      console.log(123456, message, 'onSignMessage')
      const signature = await onSign(message, safeAddress, account)
      // onSign()
      // communicator?.send(CommunicatorMessages.REJECT_TRANSACTION_MESSAGE, requestId, true)
      communicator?.send({ signature }, requestId)
      // const isOffChainSigningSupported = isOffchainEIP1271Supported(safe, chain, sdkVersion)
      // const signOffChain =
      //   isOffChainSigningSupported && !onChainSigning && !!settings.offChainSigning
      // setCurrentRequestId(requestId)
      // if (signOffChain) {
      //   setTxFlow(
      //     <SignMessageFlow
      //       logoUri={safeAppFromManifest?.iconUrl || ''}
      //       name={safeAppFromManifest?.name || ''}
      //       message={message}
      //       safeAppId={remoteApp?.id}
      //       requestId={requestId}
      //     />,
      //     onTxFlowClose
      //   )
      // } else {
      //   setTxFlow(
      //     <SignMessageOnChainFlow
      //       props={{
      //         app: safeAppFromManifest,
      //         appId: remoteApp?.id,
      //         requestId,
      //         message,
      //         method
      //       }}
      //     />
      //   )
      // }
    },
    onGetPermissions: getPermissions,
    onSetPermissions: setPermissionsRequest,
    onRequestAddressBook: (origin: string): AddressBookItem[] => {
      // if (hasPermission(origin, Methods.requestAddressBook)) {
      //   return Object.entries(addressBook).map(([address, name]) => ({ address, name, chainId }))
      // }
      return []
    },
    onGetTxBySafeTxHash: (safeTxHash) => getTransactionDetails(chainId, safeTxHash),
    onGetEnvironmentInfo: () => ({
      origin: document.location.origin
    }),
    // @ts-ignore
    onGetSafeInfo: useGetSafeInfo(),
    onGetSafeBalances: (currency) => {
      const isDefaultTokenlistSupported = chain && hasFeature(chain, FEATURES.DEFAULT_TOKENLIST)
      return getBalances(chainId, safeAddress, currency, {
        exclude_spam: true,
        trusted: isDefaultTokenlistSupported
        // trusted: isDefaultTokenlistSupported && TOKEN_LISTS.TRUSTED === tokenlist
      })
    },
    onGetChainInfo: () => {
      if (!chain) return
      const { nativeCurrency, chainName, chainId, shortName, blockExplorerUriTemplate } = chain
      return {
        chainName,
        chainId,
        shortName,
        nativeCurrency,
        blockExplorerUriTemplate
      }
    },
    onSetSafeSettings: (safeSettings: SafeSettings) => {
      const newSettings: SafeSettings = {
        ...settings,
        offChainSigning: !!safeSettings.offChainSigning
      }
      setSettings(newSettings)
      return newSettings
    },
    onGetOffChainSignature: async (messageHash: string) => {
      // const safeMessage = safeMessages.data?.results
      //   ?.filter(isSafeMessageListItem)
      //   ?.find((item) => item.messageHash === messageHash)
      // if (safeMessage) {
      //   return safeMessage.preparedSignature
      // }
      // try {
      //   const { preparedSignature } = await getSafeMessage(chainId, messageHash)
      //   return preparedSignature
      // } catch {
      return ''
      // }
    }
  })

  useEffect(() => {
    if ((!appUrl || !safeAddress) && init) {
      init = false
      // setInit(false)
      createNotify({ content: 'Fund address error or Dapp url error', type: 'error' })
      nav(-1)
    }
  }, [appUrl, safeAddress])

  if (!appUrl || !safeAddress) {
    return null
  }

  return (
    <>
      <Loading type="fixed" show={appIsLoading} />
      <SafeAppIframe
        appUrl={appUrl}
        allowedFeaturesList={allowedFeaturesList}
        iframeRef={iframeRef}
        onLoad={onIframeLoad}
      />
    </>
  )
}
export default DappIframe
