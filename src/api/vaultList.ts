import { readContract } from '@wagmi/core'
import { config } from '@/config/wagmi'
import { useVaultReaderContract } from '@/hooks/useContract'
import { calcVaultBaseInfo, calcVaultDetail, calcVaultUserDetail } from '@/compute/vault'

import { VaultProps, VaultDetailProps, VaultUserListDataProps } from '@/types/vault'
import { AddressType } from '@/types/base'

const VaultReaderContract = useVaultReaderContract()

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
