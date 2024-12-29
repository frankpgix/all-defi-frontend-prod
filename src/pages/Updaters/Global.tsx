import { useEffect } from 'react'

import { useAccount, useChainId } from 'wagmi'

import { useVaultCountLimit } from '@/hooks/Contracts/useVaultFactory'
import { useProfile } from '@/hooks/useProfile'
import { useGetVaultHashList, useGetVaultList } from '@/hooks/useVaultList'

import { useStoreVaultBaseList } from '@/stores/useStoreVaultList'

export default function Global(): null {
  const { address } = useAccount()
  const chainId = useChainId()

  const { update: updateProfile } = useProfile()
  const { data: maxFundLimit, isLoading } = useVaultCountLimit(address ?? '')
  const { updateVaultBaseList } = useStoreVaultBaseList()
  useEffect(() => {
    updateProfile(address, Boolean(maxFundLimit), maxFundLimit, isLoading)
  }, [address, maxFundLimit, isLoading, updateProfile])

  useEffect(() => {
    updateVaultBaseList()
  }, [chainId])
  useGetVaultList()
  useGetVaultHashList()

  return null
}
