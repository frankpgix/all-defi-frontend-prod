import { AbiEvent } from 'abitype'
import { decodeAbiParameters } from 'viem'
import { getBlockNumber, getLogs } from 'viem/actions'

import { getClient } from '@wagmi/core'

import { config } from '@/config/wagmi'

import { AddressType } from '@/types/base'
import { VaultVerifiedItemTypes } from '@/types/vault'

import { getUnitAmount, safeInterceptionValues } from '@/utils/tools'

export const getVaultReviewed = async (
  VaultFactoryContract: any,
  manager: AddressType,
  vType: 0 | 1,
  name?: string
) => {
  const publicClient = getClient(config)
  // @ts-ignore
  const toBlock = await getBlockNumber(publicClient)

  const event: AbiEvent = VaultFactoryContract.abi.find(
    (item: any) => item.name === 'VaultReviewed'
  )
  const fromBlock = getUnitAmount(
    Number(safeInterceptionValues(toBlock, 0, 0)) - 60 * 60 * 24 * 2 * 15,
    0
  )

  // @ts-ignore
  const transferEvents = await getLogs(publicClient, {
    address: VaultFactoryContract.address,
    event,
    // fromBlock: 0n,
    fromBlock,
    toBlock
  })
  // console.log(transferEvents)

  const getName = (enCode: `0x${string}`): string => {
    if (vType === 0) {
      return String(decodeAbiParameters([{ type: 'string', name: 'name' }], enCode)[0])
    }
    return name ?? ''
  }
  const data = transferEvents
    .map((item: any) => ({
      address: String(item.args.vault).toLocaleLowerCase(),
      manager: String(item.args.manager).toLocaleLowerCase(),
      hash: String(item.transactionHash).toLocaleLowerCase(),
      type: Number(item.args.vType),
      result: Boolean(item.args.pass),
      data: getName(item.args.data)
    }))
    .filter((item: any) => item.type === vType && manager.toLocaleLowerCase() === item.manager)
  // console.log(data)
  return data as VaultVerifiedItemTypes[]
}
