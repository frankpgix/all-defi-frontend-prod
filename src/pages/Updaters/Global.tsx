import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useIsManager, useDerivativeList } from '@/hooks/useAllProtocol'
import { useBalances } from '@/hooks/useTokens'
import { useStoreProfile, useStoreBalances } from '@/store/useProfile'
import { useStoreDerivativeList } from '@/store/useFunds'

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

  // update derivativeList
  const { data: derivativeList } = useDerivativeList()
  const updateDerivativeList = useStoreDerivativeList((state) => state.update)

  useEffect(() => {
    updateDerivativeList(derivativeList)
  }, [derivativeList, updateDerivativeList])

  return null
}
