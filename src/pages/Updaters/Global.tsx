import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useIsManager } from '@/hooks/useAllProtocol'
import { useBalances } from '@/hooks/useTokens'
import { useStoreProfile, useStoreBalances } from '@/store/useProfile'

export default function Global(): null {
  const { address } = useAccount()
  const { isManager } = useIsManager(address)
  const balances = useBalances()
  const updateProfile = useStoreProfile((state) => state.update)

  const updateBalances = useStoreBalances((state) => state.update)

  useEffect(() => {
    updateProfile(address, isManager)
  }, [address, isManager, updateProfile])

  useEffect(() => {
    updateBalances(balances)
  }, [address, balances, updateBalances])
  return null
}
