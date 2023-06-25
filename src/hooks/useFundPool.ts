import { useContractRead, useContractWrite } from 'wagmi'
// import { parseEther } from 'viem'
import contracts from '@/config/contracts'
import Token from '@/class/Token'
import { getUnitAmount } from '@/utils/tools'

import { calcFundBaseInfo } from './help'
import { FundBaseInfoProps, FundBaseInfoDefault } from './help'

export const useFundBaseInfo = (fundAddress: string) => {
  const FundPool = contracts.FundPool(fundAddress)
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

export const useFundSubscribe = (fundAddress: string, account: string, onSettled) => {
  const FundPool = contracts.FundPool(fundAddress)
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

export const useFundRedeem = (fundAddress: string, account: string, onSettled) => {
  const FundPool = contracts.FundPool(fundAddress)
  const { writeAsync } = useContractWrite({
    ...FundPool,
    functionName: 'redeem',
    account,
    onSettled
  })
  const onRedeem = async (amount: number, baseToken: Token) => {
    const _amount = getUnitAmount(String(amount), baseToken.decimals)
    console.log(11, _amount, amount, baseToken.decimals)
    await writeAsync({
      args: [_amount]
    })
  }
  return { onRedeem }
}

export const useFundClaim = (fundAddress: string, account: string, onSettled) => {
  const FundPool = contracts.FundPool(fundAddress)
  const { writeAsync: onClaim } = useContractWrite({
    ...FundPool,
    functionName: 'claim',
    account,
    onSettled
  })

  return { onClaim }
}
