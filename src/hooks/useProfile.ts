import { useStoreProfile } from '@/stores/useStoreProfile'
import type { Signer } from '@ethersproject/abstract-signer'

interface profileProps {
  account: string
  signer: null | Signer
  isManager: boolean
  loading: boolean
  update: (account: string, isManager: boolean, signer: null | Signer, loading: boolean) => void
}

export const useProfile = (): profileProps => {
  const { account, signer, isManager, loading, update } = useStoreProfile((state: any) => ({
    account: state.address,
    signer: state.signer,
    isManager: state.isManager,
    loading: state.loading,
    update: state.update
  }))

  // console.log(account, signer, isManager, update)
  return {
    account,
    signer,
    isManager,
    loading,
    update
  }
}
