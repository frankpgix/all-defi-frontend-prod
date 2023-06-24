import { useContractRead } from 'wagmi'
import contracts from '@/config/contracts'
import { calcFundBaseInfo } from './help'

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
  const data = calcFundBaseInfo(sData)
  return { data, isLoading, refetch }
}
