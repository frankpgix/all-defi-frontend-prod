import { useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import type { Signer } from '@ethersproject/abstract-signer'
import { providers } from 'ethers'
// import { useIsManager, useDerivativeList } from '@/hooks/useAllProtocol'
// import { useBalances } from '@/hooks/useTokens'
// import { useStoreProfile, useStoreBalances } from '@/stores/useStoreProfile'
// import { useStoreDerivativeList } from '@/stores/useStoreFunds'
import AllProtocol from '@/class/AllProtocol'
// import { getJsonRpcProvider } from '@/utils/contractHelpers'
import { useProfile } from '@/hooks/useProfile'
export default function Global(): null {
  const { checkAuthorizedManager } = AllProtocol
  // update profile info
  const { address } = useAccount()
  const { update: updateProfile } = useProfile()
  const getProfileData = useCallback(async () => {
    if (address) {
      updateProfile(address, false, null, true)
      const isManager = await checkAuthorizedManager(address)
      // const provider = getJsonRpcProvider()
      const provider = new providers.Web3Provider(window.ethereum)
      const signer: Signer = provider.getSigner(address)
      updateProfile(address, isManager, signer, false)
      // console.log(isManager)
    } else {
      updateProfile('', false, null, false)
    }
  }, [address, checkAuthorizedManager, updateProfile])

  useEffect(() => {
    void getProfileData()
  }, [getProfileData])

  // update balance info
  // const balances = useBalances()
  // const updateBalances = useStoreBalances((state: any) => state.update)

  // useEffect(() => {
  //   updateBalances(balances)
  // }, [address, balances, updateBalances])

  // // update derivativeList
  // const { data: derivativeList } = useDerivativeList()
  // const updateDerivativeList = useStoreDerivativeList((state: any) => state.update)

  // useEffect(() => {
  //   updateDerivativeList(derivativeList)
  // }, [derivativeList, updateDerivativeList])

  return null
}
