// import { utils as EthUtils } from 'ethers'
// import Web3 from 'web3'

import UniV3ACL from '@/class/UniV3ACL'
import { getFundPoolContract } from '@/utils/contractHelpers'

import { estimateGas } from '@/utils/practicalMethod'
import { notify } from '@@/common/Toast'
import { formatJsonRpcError, formatJsonRpcResult } from '@json-rpc-tools/utils'
import { SignClientTypes } from '@walletconnect/types'
import { utils } from 'ethers'

export const onTransaction = async (txs: any, fundAddress: string, signer: any) => {
  // const { id, topic, params } = data
  try {
    const transaction = txs[0]
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

    console.log('transactionHash', transactionHash)

    return transactionHash

    // const result = formatJsonRpcResult(id, transactionHash)

    // signClient.respond({
    //   topic,
    //   response: result
    // })
  } catch (error: any) {
    // const result = formatJsonRpcError(id, error?.reason)
    // signClient.respond({
    //   topic,
    //   response: result
    // })
    notify.error(error?.reason, false)
  }
}

export const onSign = async (data: any, fundAddress: string, signer: any) => {
  // const { id, topic, params } = payload
  // const data = getSignTypedDataParamsData(params)
  // const data = getSignTypedDataParamsData(params.request.params)
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
  console.log('signature', signature)

  return signature
  // const result = formatJsonRpcResult(id, signature)
  // await signClient.respond({
  //   topic,
  //   response: result
  // })
}

function getSignTypedDataParamsData(params: string[]) {
  const data = params.filter((p) => !utils.isAddress(p))[0]

  if (typeof data === 'string') {
    return JSON.parse(data)
  }

  return data
}
