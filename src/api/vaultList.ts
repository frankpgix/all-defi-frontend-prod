import { AbiEvent } from 'abitype'
import { decodeAbiParameters } from 'viem'
import { getBlockNumber, getLogs } from 'viem/actions'

import { getClient, readContract } from '@wagmi/core'

import { config } from '@/config/wagmi'

import { useVaultFactoryContract, useVaultReaderContract } from '@/hooks/Contracts/useContract'

import { AddressType, GetTokenFuncType } from '@/types/base'
import { VaultDetailProps, VaultProps, VaultUserListDataProps } from '@/types/vault'
import { VaultVerifiedItemTypes } from '@/types/vault'

import { calcVaultBaseInfo, calcVaultDetail, calcVaultUserDetail } from '@/compute/vault'
import { getUnitAmount, safeInterceptionValues } from '@/utils/tools'

const VaultReaderContract = useVaultReaderContract()
const VaultFactoryContract = useVaultFactoryContract()

export const getVaultList = async (
  getTokenByAddress: GetTokenFuncType
): Promise<VaultDetailProps[]> => {
  const result = (await readContract(config, {
    ...VaultReaderContract,
    functionName: 'vaultDetailList',
    args: [0, 999, false]
  })) as any[]
  return result.map((item) => calcVaultDetail(item, getTokenByAddress))
}

export const getManageVaultList = async (
  getTokenByAddress: GetTokenFuncType,
  account?: AddressType
): Promise<VaultDetailProps[]> => {
  if (!account) return []
  const result = await getVaultList(getTokenByAddress)
  return result.filter((item) => item.manager.toLowerCase() === account.toLowerCase())
}

export const getUserVaultList = async (
  getTokenByAddress: GetTokenFuncType,
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
      const fund: VaultProps = calcVaultBaseInfo(item, getTokenByAddress)
      fund.data = calcVaultUserDetail(detailList[index], getTokenByAddress)
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
