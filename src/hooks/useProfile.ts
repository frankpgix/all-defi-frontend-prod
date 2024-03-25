import { profileProps } from '@/types/profile'

import { useStoreProfile } from '@/stores/useStoreProfile'

export const useProfile = (): profileProps => {
  const { account, isManager, loading, update, maxFundLimit } = useStoreProfile((state: any) => ({
    account: state.address,
    isManager: state.isManager,
    loading: state.loading,
    maxFundLimit: state.maxFundLimit,
    update: state.update
  }))

  // console.log(account, signer, isManager, update)
  return {
    account,
    isManager,
    loading,
    maxFundLimit,
    update
  }
}
