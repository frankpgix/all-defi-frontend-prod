import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useIsManager } from '@/hooks/useAllProtocol'
import { useBalances } from '@/hooks/useTokens'
import { useStoreProfile, useStoreBalances } from '@/store/useProfile'

export default function Global(): null {
  // update profile info
  const { address } = useAccount()
  const { isManager } = useIsManager(address)
  const updateProfile = useStoreProfile((state) => state.update)

  useEffect(() => {
    updateProfile(address, isManager)
  }, [address, isManager, updateProfile])

  // update balance info
  const balances = useBalances()
  const updateBalances = useStoreBalances((state) => state.update)

  useEffect(() => {
    updateBalances(balances)
  }, [address, balances, updateBalances])

  return null
}
