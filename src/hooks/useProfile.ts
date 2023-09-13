import { useStoreProfile } from '@/stores/useStoreProfile'
import type { Signer } from '@ethersproject/abstract-signer'

interface profileProps {
  account: string
  signer: null | Signer
  isManager: boolean
  loading: boolean
  maxFundLimit: number
  update: (
    account: string,
    isManager: boolean,
    maxFundLimit: number,
    signer: null | Signer,
    loading: boolean
  ) => void
}

export const useProfile = (): profileProps => {
  const { account, signer, isManager, loading, update, maxFundLimit } = useStoreProfile(
    (state: any) => ({
      account: state.address,
      signer: state.signer,
      isManager: state.isManager,
      loading: state.loading,
      maxFundLimit: state.maxFundLimit,
      update: state.update
    })
  )

  // console.log(account, signer, isManager, update)
  return {
    account,
    signer,
    isManager,
    loading,
    maxFundLimit,
    update
  }
}
