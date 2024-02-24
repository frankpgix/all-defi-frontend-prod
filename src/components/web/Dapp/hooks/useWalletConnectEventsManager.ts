import { EIP155_SIGNING_METHODS } from '../data/EIP155Data'
// import ModalStore from '@/stores/ModalStore'
import { signClient } from '../utils/WalletConnectUtil'
import { SignClientTypes } from '@walletconnect/types'
import { useCallback, useEffect } from 'react'
import { useNotify } from '@/hooks/useNotify'

import { goConnect, onTransaction, onSign } from '../utils/tools'

export function useWalletConnectEventsManager(
  initialized: boolean,
  fundAddress?: string,
  signer?: any
) {
  /******************************************************************************
   * 1. Open session proposal modal for confirmation / rejection
   *****************************************************************************/
  const { createNotify } = useNotify()
  const onSessionProposal = useCallback(
    (proposal: SignClientTypes.EventArguments['session_proposal']) => {
      // ModalStore.open('SessionProposalModal', { proposal })
      goConnect(proposal, fundAddress, createNotify)
      // console.log('proposal', proposal)
    },
    [fundAddress]
  )

  /******************************************************************************
   * 3. Open request handling modal based on method that was used
   *****************************************************************************/
  const onSessionRequest = useCallback(
    async (requestEvent: SignClientTypes.EventArguments['session_request']) => {
      const { topic, params } = requestEvent
      const { request } = params
      const requestSession = signClient.session.get(topic)
      console.log('session_request', requestEvent)

      switch (request.method) {
        case EIP155_SIGNING_METHODS.ETH_SIGN:
        case EIP155_SIGNING_METHODS.PERSONAL_SIGN:
          // return ModalStore.open('SessionSignModal', { requestEvent, requestSession })
          console.log('SessionSignModal', requestEvent, requestSession)
          return
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V3:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TYPED_DATA_V4:
          // return ModalStore.open('SessionSignTypedDataModal', { requestEvent, requestSession })
          console.log('SessionSignTypedDataModal', requestEvent, requestSession)
          return await onSign(requestEvent, fundAddress || '', signer)
        case EIP155_SIGNING_METHODS.ETH_SEND_TRANSACTION:
        case EIP155_SIGNING_METHODS.ETH_SIGN_TRANSACTION:
          return await onTransaction(requestEvent, fundAddress || '', signer)
        // return ModalStore.open('SessionSendTransactionModal', { requestEvent, requestSession })
        // console.log('SessionSendTransactionModal', requestEvent, requestSession)
        // return
        default:
          // return ModalStore.open('SessionUnsuportedMethodModal', { requestEvent, requestSession })
          console.log('SessionUnsuportedMethodModal', requestEvent, requestSession)
          return
      }
    },
    [fundAddress, signer]
  )

  /******************************************************************************
   * Set up WalletConnect event listeners
   *****************************************************************************/
  useEffect(() => {
    if (initialized && fundAddress && signer) {
      signClient.on('session_proposal', onSessionProposal)
      signClient.on('session_request', onSessionRequest)
    }
  }, [initialized, fundAddress, signer, onSessionProposal, onSessionRequest])
}
