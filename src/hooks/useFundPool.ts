import { useContractRead, useContractWrite } from 'wagmi'
// import { parseEther } from 'viem'
import { FundPoolContract } from '@/config/contracts'
import Token from '@/class/Token'
import { getUnitAmount } from '@/utils/tools'

import { calcFundBaseInfo } from './help'
import { FundBaseInfoProps, FundBaseInfoDefault, AddressType } from './help'

export const useFundBaseInfo = (fundAddress: string) => {
  const FundPool = FundPoolContract(fundAddress)
  const {
    data: sData,
    isLoading,
    refetch
  } = useContractRead({
    ...FundPool,
    functionName: 'baseInfo'
  })
  const data: FundBaseInfoProps = sData ? calcFundBaseInfo(sData) : FundBaseInfoDefault
  return { data, isLoading, refetch }
}

export const useFundSubscribe = (
  fundAddress: string,
  account: AddressType,
  onSettled: (data: any, error: any) => void
) => {
  const FundPool = FundPoolContract(fundAddress)
  const { writeAsync } = useContractWrite({
    ...FundPool,
    functionName: 'subscribe',
    account,
    onSettled
  })
  const onSubscribe = async (amount: number, acToken: Token) => {
    const _amount = getUnitAmount(String(amount), acToken.decimals)
    await writeAsync({
      args: [_amount]
    })
  }
  return { onSubscribe }
}

export const useFundRedeem = (
  fundAddress: string,
  account: AddressType,
  onSettled: (data: any, error: any) => void
) => {
  const FundPool = FundPoolContract(fundAddress)
  const { writeAsync } = useContractWrite({
    ...FundPool,
    functionName: 'redeem',
    account,
    onSettled
  })
  const onRedeem = async (amount: number, baseToken: any) => {
    const _amount = getUnitAmount(String(amount), baseToken.decimals)
    console.log(11, _amount, amount, baseToken.decimals)
    await writeAsync({
      args: [_amount]
    })
  }
  return { onRedeem }
}

export const useFundClaim = (
  fundAddress: string,
  account: AddressType,
  onSettled: (data: any, error: any) => void
) => {
  const FundPool = FundPoolContract(fundAddress)
  const { writeAsync: onClaim } = useContractWrite({
    ...FundPool,
    functionName: 'claim',
    account,
    onSettled
  })

  return { onClaim }
}

export const useFundCancelRedeem = (
  fundAddress: string,
  account: AddressType,
  onSettled: (data: any, error: any) => void,
  onMutate: () => void
) => {
  const FundPool = FundPoolContract(fundAddress)
  const { writeAsync: onCancelRedeem } = useContractWrite({
    ...FundPool,
    functionName: 'cancelRedeem',
    account,
    onSettled,
    onMutate
  })

  return { onCancelRedeem }
}

export const useFundCancelSubscribe = (
  fundAddress: string,
  account: AddressType,
  onSettled: (data: any, error: any) => void,
  onMutate: () => void
) => {
  const FundPool = FundPoolContract(fundAddress)
  const { writeAsync: onCancelSubscribe } = useContractWrite({
    ...FundPool,
    functionName: 'cancelSubscribe',
    account,
    onSettled,
    onMutate
  })

  return { onCancelSubscribe }
}

export const useFundClaimCompensation = (
  fundAddress: string,
  account: AddressType,
  onSettled: (data: any, error: any) => void,
  onMutate: () => void
) => {
  const FundPool = FundPoolContract(fundAddress)
  const { writeAsync: onClaimCompensation } = useContractWrite({
    ...FundPool,
    functionName: 'claimCompensation',
    account,
    onSettled,
    onMutate
  })

  return { onClaimCompensation }
}
