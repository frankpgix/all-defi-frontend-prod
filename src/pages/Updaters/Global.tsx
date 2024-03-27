import { useEffect } from 'react'

import { useAccount } from 'wagmi'

import { useVaultCountLimit } from '@/hooks/Contracts/useAllProtocol'
import { useProfile } from '@/hooks/useProfile'
import { useGetVaultList } from '@/hooks/useVaultList'

export default function Global(): null {
  const { address } = useAccount()

  const { update: updateProfile } = useProfile()
  const { data: maxFundLimit, isLoading } = useVaultCountLimit(address ?? '')
  console.log(maxFundLimit)
  useEffect(() => {
    updateProfile(address, Boolean(maxFundLimit), maxFundLimit, isLoading)
  }, [address, maxFundLimit, isLoading])

  useGetVaultList()

  return null
}
