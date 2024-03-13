import { writeContract, signTypedData } from '@wagmi/core'
import { config } from '@/config/wagmi'
import { useVaultContract, useUniV3ACLContract } from '@/hooks/useContract'
import { AddressType } from '@/types/base'
import { getUnitAmount } from '@/utils/tools'

// import UniV3ACL from '@/class/UniV3ACL'
// import { getFundPoolContract } from '@/utils/contractHelpers'

// import { estimateGas } from '@/utils/practicalMethod'

import { fixGmxTrade } from './fixGmxTrade'

export const onTransaction = async (
  txs: any,
  vaultAddress: AddressType,
  account: AddressType,
  createNotify: any
) => {
  try {
    const VaultContract = useVaultContract(vaultAddress)
    const transaction = txs[0]
    const { data, value } = fixGmxTrade(transaction.data, transaction?.value)
    // const data = transaction.data
    // const value = transaction?.value

    const transactionHash = await writeContract(config, {
      ...VaultContract,
      functionName: 'executeTransaction',
      args: [transaction.to, data, value || 0],
      // value: getUnitAmount(value || 0, 18),
      account
    })

    return transactionHash

    // const transaction = txs[0]
    // const contract = getFundPoolContract(fundAddress, signer)
    // const { data, value } = fixGmxTrade(transaction.data, transaction?.value)

    // const gasLimit = await estimateGas(contract, 'executeTransaction', [
    //   transaction.to,
    //   data,
    //   value || 0
    // ])
    // const response = await contract.executeTransaction(transaction.to, data, value || 0, {
    //   gasLimit
    // })

    // const { transactionHash } = await response.wait()

    // return transactionHash
  } catch (error: any) {
    createNotify({ content: error?.shortMessage || error?.reason, type: 'error' })
    return null
  }
}

export const onSign = async (data: any, vaultAddress: AddressType, account: AddressType) => {
  const UniV3ACLContract = useUniV3ACLContract()
  const { domain, types, message, primaryType } = data
  console.log('domain', domain, message, JSON.stringify(message), data)
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

  console.log('encodeData', encodeData)
  const transactionHash = await writeContract(config, {
    ...UniV3ACLContract,
    functionName: 'registerPermitSingle',
    args: [vaultAddress, encodeData],
    // value: getUnitAmount(value || 0, 18),
    account
  })

  console.log(transactionHash)
  delete types.EIP712Domain
  const signature = await signTypedData(config, { account, domain, types, message, primaryType })
  console.log('signature', signature)
  return signature
  // return transactionHash
  // const { domain, types, message } = data
  // const { registerPermitSingle } = UniV3ACL
  // console.log('domain', domain, message, JSON.stringify(message))
  // const encodeData = [
  //   [
  //     message.details.token,
  //     message.details.amount,
  //     message.details.expiration,
  //     message.details.nonce
  //   ],
  //   message.spender,
  //   message.sigDeadline
  // ]
  // const res = await registerPermitSingle(fundAddress, encodeData, signer)
  // console.log('registerPermitSingle', res)
  // console.log('encode', encodeData)
  // delete types.EIP712Domain
  // const signature = await signer._signTypedData(domain, types, message)
  // console.log('signature', signature)
  // return signature
}
