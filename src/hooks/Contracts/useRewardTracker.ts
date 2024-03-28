import { useReadContract, useReadContracts, useWriteContract } from 'wagmi'

import { useERC20Contract, useRewardTrackerContract } from '@/hooks/Contracts/useContract'
import { useAllowance } from '@/hooks/Contracts/useTools'
import { useNotify } from '@/hooks/useNotify'
import { useToken } from '@/hooks/useToken'

import { AddressType } from '@/types/base'
import { PoolItemTypes } from '@/types/rewardTracker'

import { calcPoolItemData } from '@/compute/rewardTracker'
import { RewardDashboardDataDefault } from '@/data/rewardTracker'
import { getUnitAmount, safeInterceptionValues, sleep } from '@/utils/tools'

export const usePoolList = (account?: AddressType) => {
  const RewardTrackerContract = useRewardTrackerContract()
  const { data, isLoading, isSuccess, refetch } = useReadContract({
    ...RewardTrackerContract,
    functionName: 'poolList',
    args: [0, 999],
    account
  }) as { data: any; isSuccess: boolean; isLoading: boolean; refetch: () => void }

  if (!isLoading && isSuccess) {
    console.log(data)
    return { data: calcPoolItemData(data), isLoading, isSuccess, refetch }
  }
  return { data: [] as PoolItemTypes[], isLoading, isSuccess, refetch }
}

export const useRewardsALLBalance = () => {
  const RewardTrackerContract = useRewardTrackerContract()
  const { getTokenByName } = useToken()
  const ALLTOKEN = getTokenByName('ALLTOKEN')
  const ERC20Contract = useERC20Contract(ALLTOKEN.address)
  const { data, isLoading, isSuccess, refetch } = useReadContract({
    ...ERC20Contract,
    functionName: 'balanceOf',
    args: [RewardTrackerContract.address]
  })
  if (!isLoading && isSuccess) {
    return { data: Number(safeInterceptionValues(data)), isLoading, isSuccess, refetch }
  }
  return { data: 0, isLoading, isSuccess, refetch }
}

export const useHarvestAll = () => {
  const RewardTrackerContract = useRewardTrackerContract()
  const { writeContractAsync } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const onHarvestAll = async (account: AddressType) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Claim ALL Token' })

      await writeContractAsync({
        ...RewardTrackerContract,
        functionName: 'harvestAll',
        args: [],
        account
      })
        .then((hash: string) => {
          console.log(hash)
          updateNotifyItem(notifyId, { title: 'Claim ALL Token', type: 'success', hash })
        })
        .catch((error: any) => {
          updateNotifyItem(notifyId, {
            title: 'Claim ALL Token',
            type: 'error',
            content: error.shortMessage
          })
        })
    }
  }
  return { onHarvestAll }
}

export const useUserRewardDashboard = (account?: AddressType) => {
  const RewardTrackerContract = useRewardTrackerContract()
  // useReadContracts
  const { data, isLoading, isSuccess, refetch } = useReadContracts({
    contracts: [
      {
        ...RewardTrackerContract,
        functionName: 'pendingRewardOf',
        args: [account ?? '0x']
      },
      {
        ...RewardTrackerContract,
        functionName: 'userSALLAmount',
        args: [account ?? '0x']
      },
      {
        ...RewardTrackerContract,
        functionName: 'userAccClaimedReward',
        args: [account ?? '0x']
      }
    ]
  })

  if (account && !isLoading && isSuccess) {
    return {
      data: {
        pendingReward: Number(safeInterceptionValues(data[0].result as bigint)),
        sALL: Number(safeInterceptionValues(data[1].result as bigint)),
        claimedReward: Number(safeInterceptionValues(data[2].result as bigint))
      },
      isLoading,
      isSuccess,
      refetch
    }
  }
  return { data: RewardDashboardDataDefault, isLoading, isSuccess, refetch }
}

export const useUserAccClaimedReward = (account?: AddressType) => {
  const RewardTrackerContract = useRewardTrackerContract()
  const { data, isLoading, isSuccess, refetch } = useReadContract({
    ...RewardTrackerContract,
    functionName: 'userAccClaimedReward',
    args: [account ?? '0x']
  }) as { data: any; isSuccess: boolean; isLoading: boolean; refetch: () => void }

  if (!isLoading && isSuccess) {
    return {
      data: Number(safeInterceptionValues(data)),
      isLoading,
      isSuccess,
      refetch
    }
  }
  return { data: 0, isLoading, isSuccess, refetch }
}
export const useUserSALLAmount = (account?: AddressType) => {
  const RewardTrackerContract = useRewardTrackerContract()
  const { data, isLoading, isSuccess, refetch } = useReadContract({
    ...RewardTrackerContract,
    functionName: 'userSALLAmount',
    args: [account ?? '0x']
  }) as { data: any; isSuccess: boolean; isLoading: boolean; refetch: () => void }

  if (!isLoading && isSuccess) {
    return {
      data: Number(safeInterceptionValues(data)),
      isLoading,
      isSuccess,
      refetch
    }
  }
  return { data: 0, isLoading, isSuccess, refetch }
}

// stake
export const useStake = () => {
  const RewardTrackerContract = useRewardTrackerContract()
  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()
  const { onAllowance } = useAllowance()
  const { getTokenByName } = useToken()
  const sALLTOKEN = getTokenByName('sALLTOKEN')
  const onStake = async (
    poolKeys: AddressType[],
    amounts: number[],
    sAllAmount: number,
    account: AddressType,
    callback?: () => void
  ) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Stake Shares' })

      const allowance = await onAllowance(
        sALLTOKEN.address,
        RewardTrackerContract.address,
        getUnitAmount(sAllAmount, sALLTOKEN.decimals),
        notifyId
      )
      if (!allowance) return

      writeContract(
        {
          ...RewardTrackerContract,
          functionName: 'stake',
          args: [poolKeys, amounts, sAllAmount],
          account
        },
        {
          onSuccess: async (hash: string) => {
            await sleep(5000)
            updateNotifyItem(notifyId, { title: 'Stake Shares', type: 'success', hash })
            callback?.()
          },
          onError: (error: any) => {
            updateNotifyItem(notifyId, {
              title: 'Stake Shares',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onStake }
}
// stake
export const useUnStake = () => {
  const RewardTrackerContract = useRewardTrackerContract()
  const { writeContract } = useWriteContract()
  const { createNotify, updateNotifyItem } = useNotify()

  const onUnStake = async (
    poolKeys: AddressType[],
    amounts: number[],
    account: AddressType,
    callback?: () => void
  ) => {
    if (account) {
      const notifyId = await createNotify({ type: 'loading', content: 'Unstake Shares' })

      writeContract(
        {
          ...RewardTrackerContract,
          functionName: 'unstake',
          args: [poolKeys, amounts],
          account
        },
        {
          onSuccess: async (hash: string) => {
            await sleep(5000)
            updateNotifyItem(notifyId, { title: 'Unstake Shares', type: 'success', hash })
            callback?.()
          },
          onError: (error: any) => {
            updateNotifyItem(notifyId, {
              title: 'Unstake Shares',
              type: 'error',
              content: error.shortMessage
            })
          }
        }
      )
    }
  }
  return { onUnStake }
}
