import { useEffect } from 'react'

import { useAccount } from 'wagmi'

import { useVaultCountLimit } from '@/hooks/Contracts/useVaultFactory'
import { useProfile } from '@/hooks/useProfile'
import { useGetVaultHashList, useGetVaultList } from '@/hooks/useVaultList'

export default function Global(): null {
  const { address } = useAccount()

  const { update: updateProfile } = useProfile()
  const { data: maxFundLimit, isLoading } = useVaultCountLimit(address ?? '')
  useEffect(() => {
    updateProfile(address, Boolean(maxFundLimit), maxFundLimit, isLoading)
  }, [address, maxFundLimit, isLoading, updateProfile])

  useGetVaultList()
  useGetVaultHashList()

  return null
}
