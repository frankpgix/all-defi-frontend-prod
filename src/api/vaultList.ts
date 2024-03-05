import { readContract, getClient } from '@wagmi/core'
import { getLogs, getBlockNumber } from 'viem/actions'
import { decodeAbiParameters } from 'viem'

import { AbiEvent } from 'abitype'
import { config } from '@/config/wagmi'
import { useVaultReaderContract, useVaultFactoryContract } from '@/hooks/useContract'
import { calcVaultBaseInfo, calcVaultDetail, calcVaultUserDetail } from '@/compute/vault'

import { VaultProps, VaultDetailProps, VaultUserListDataProps } from '@/types/vault'
import { VaultVerifiedItemTypes } from '@/types/vault'
import { AddressType } from '@/types/base'
import { safeInterceptionValues, getUnitAmount } from '@/utils/tools'

const VaultReaderContract = useVaultReaderContract()
const VaultFactoryContract = useVaultFactoryContract()

export const getVaultList = async (): Promise<VaultDetailProps[]> => {
  const result = (await readContract(config, {
    ...VaultReaderContract,
    functionName: 'vaultDetailList',
    args: [0, 999, false]
  })) as any[]
  return result.map((item) => calcVaultDetail(item))
}

export const getManageVaultList = async (account?: AddressType): Promise<VaultDetailProps[]> => {
  if (!account) return []
  const result = await getVaultList()
  return result.filter((item) => item.manager.toLowerCase() === account.toLowerCase())
}

export const getUserVaultList = async (
  account?: AddressType
): Promise<VaultUserListDataProps[]> => {
  if (!account) return []

  const [fundList, detailList] = (await readContract(config, {
    ...VaultReaderContract,
    functionName: 'userDetailList',
    args: [0, 999, false]
  })) as any[]

  const data: VaultUserListDataProps[] = fundList
    .map((item: any, index: number) => {
      const fund: VaultProps = calcVaultBaseInfo(item)
      fund.data = calcVaultUserDetail(detailList[index])
      fund.address = fund.data.address
      return fund
    })
    .filter(
      (item: VaultUserListDataProps) =>
        item.data.subscribingACToken + item.data.unclaimedACToken + item.data.shares !== 0
    )

  return data
}

export const getVaultReviewed = async (manager: AddressType, vType: 0 | 1, name?: string) => {
  const publicClient = getClient(config)
  const toBlock = await getBlockNumber(publicClient)

  const event: AbiEvent = VaultFactoryContract.abi.find(
    (item: any) => item.name === 'VaultReviewed'
  )
  const fromBlock = getUnitAmount(
    Number(safeInterceptionValues(toBlock, 0, 0)) - 60 * 60 * 24 * 2 * 15,
    0
  )

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
