// import { utils as EthUtils } from 'ethers'
// import Web3 from 'web3'

import { signClient } from './WalletConnectUtil'
import { buildApprovedNamespaces } from '@walletconnect/utils'
import UniV3ACL from '@/class/UniV3ACL'
// import Permit2 from '@/class/Permit2'
import { getFundPoolContract } from '@/utils/contractHelpers'
// import { getPermit2Address } from '@/utils/addressHelpers'

import { estimateGas } from '@/utils/practicalMethod'
import { notify } from '@@/common/Toast'
import { formatJsonRpcError, formatJsonRpcResult } from '@json-rpc-tools/utils'
import { SignClientTypes } from '@walletconnect/types'
import { getSdkError } from '@walletconnect/utils'
import { utils } from 'ethers'

import dappStore from '@/stores/dappStore'

export const goConnect = async (proposal: any, fundAddress?: string) => {
  dappStore.setLoading(true)
  const { id, params } = proposal
  console.log(proposal, fundAddress)

  // const { proposer, requiredNamespaces, optionalNamespaces, sessionProperties, relays } = params
  const chains = params.requiredNamespaces.eip155.chains[0]
  const supportChains = ['eip155:1', 'eip155:42161']
  try {
    if (!supportChains.includes(chains)) {
      const topic = params.pairingTopic
      notify.error('Only support Arbitrum')
      await signClient.disconnect({ topic, reason: getSdkError('USER_DISCONNECTED') })
      dappStore.setLoading(false)
      return
    }

    const approvedNamespaces = buildApprovedNamespaces({
      proposal: params,
      supportedNamespaces: {
        eip155: {
          chains: supportChains,
          methods: [
            'eth_sendTransaction',
            'personal_sign',
            'eth_signTypedData',
            'eth_signTypedData_v4',
            'eth_sign'
          ],
          events: ['accountsChanged', 'chainChanged'],
          accounts: [`eip155:1:${fundAddress}`, `eip155:42161:${fundAddress}`]
        }
      }
    })
    // console.log('approvedNamespaces', approvedNamespaces)
    const { topic } = await signClient.approve({
      id,
      namespaces: approvedNamespaces
    })

    dappStore.setLoading(false)
    dappStore.setAppName(params.proposer.metadata.name)
    dappStore.setAppIcon(params.proposer.metadata.icons[0])
    dappStore.setIsConnect(true)
    dappStore.setTopic(topic)

    console.log('params', params)
  } catch (error) {
    const topic = params.pairingTopic
    notify.error('Something Error, try late')
    await signClient.disconnect({ topic, reason: getSdkError('USER_DISCONNECTED') })
    dappStore.setLoading(false)
  }
}

export const onTransaction = async (
  payload: SignClientTypes.EventArguments['session_request'],
  fundAddress: string,
  signer: any
) => {
  const { id, topic, params } = payload
  try {
    const transaction = params.request.params[0]
    const contract = getFundPoolContract(fundAddress, signer)
    const gasLimit = await estimateGas(contract, 'executeTransaction', [
      transaction.to,
      transaction.data,
      transaction?.value || 0
    ])
    const response = await contract.executeTransaction(
      transaction.to,
      transaction.data,
      transaction?.value || 0,
      {
        gasLimit
      }
    )

    const { transactionHash } = await response.wait()

    const result = formatJsonRpcResult(id, transactionHash)

    signClient.respond({
      topic,
      response: result
    })
  } catch (error: any) {
    const result = formatJsonRpcError(id, error?.reason)
    signClient.respond({
      topic,
      response: result
    })
    notify.error(error?.reason, false)
  }
}

// export const onSign = async (
//   payload: SignClientTypes.EventArguments['session_request'],
//   fundAddress: string,
//   signer: any
// ) => {
//   const { id, topic, params } = payload
//   const data = getSignTypedDataParamsData(params.request.params)
//   const { message } = data
//   // const { approve } = Permit2

//   const contract = getFundPoolContract(fundAddress, signer)
//   const abiCoder = EthUtils.defaultAbiCoder

//   const sig0 = Web3.utils.keccak256('approve(address,address,uint160,uint48)').slice(0, 10)
//   const encoded0 = abiCoder.encode(
//     ['address', 'address', 'uint160', 'uint48'],
//     [message.details.token, message.spender, message.details.amount, message.details.expiration]
//   )

//   const to = getPermit2Address()
//   const enData = sig0 + encoded0.slice(2)

//   const gasLimit = await estimateGas(contract, 'executeTransaction', [to, enData, 0])
//   const response = await contract.executeTransaction(to, enData, 0, {
//     gasLimit
//   })

//   const { transactionHash } = await response.wait()

//   const result = formatJsonRpcResult(id, transactionHash)

//   signClient.respond({
//     topic,
//     response: result
//   })
// }

export const onSign = async (
  payload: SignClientTypes.EventArguments['session_request'],
  fundAddress: string,
  signer: any
) => {
  const { id, topic, params } = payload
  // const data = getSignTypedDataParamsData(params)
  const data = getSignTypedDataParamsData(params.request.params)
  const { domain, types, message } = data
  const { registerPermitSingle } = UniV3ACL
  console.log('domain', domain, message, JSON.stringify(message))

  const encodeData = [
    [
      message.details.token,
      message.details.amount,
      message.details.expiration,
      message.details.nonce
    ],
    message.spender,
    message.sigDeadline
  ]
  const res = await registerPermitSingle(fundAddress, encodeData, signer)
  console.log('registerPermitSingle', res)
  console.log('encode', encodeData)
  delete types.EIP712Domain

  const signature = await signer._signTypedData(domain, types, message)
  console.log('signature', id, signature)
  const result = formatJsonRpcResult(id, signature)
  await signClient.respond({
    topic,
    response: result
  })
}

function getSignTypedDataParamsData(params: string[]) {
  const data = params.filter((p) => !utils.isAddress(p))[0]

  if (typeof data === 'string') {
    return JSON.parse(data)
  }

  return data
}
