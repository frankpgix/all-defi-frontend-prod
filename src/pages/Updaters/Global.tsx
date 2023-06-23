import { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useIsManager } from '@/hooks/useAllProtocol'
import { useProfile } from '@/store/useProfile'

export default function Global(): null {
  const { address } = useAccount()
  const { isManager } = useIsManager(address)
  const update = useProfile((state) => state.update)

  useEffect(() => {
    update(address, isManager)
  }, [address, isManager, update])
  return null
}
