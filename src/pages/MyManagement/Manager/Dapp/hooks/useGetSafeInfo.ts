import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useProfile } from '@/hooks/useProfile'
export const useGetSafeInfo = () => {
  const { fundAddress = '' } = useParams()
  const { account } = useProfile()
  // console.log(111, 'dapp', dapp)
  const info = useMemo(
    () => () => ({
      chainId: 42161,
      isReadOnly: false,
      network: 'Arbitrum',
      owners: [account],
      safeAddress: fundAddress,
      threshold: 1
    }),
    [fundAddress, account]
  )
  return info
}
