import { useEffect, useCallback } from 'react'
import { useAccount } from 'wagmi'
import type { Signer } from '@ethersproject/abstract-signer'
import { providers } from 'ethers'
// import { useIsManager, useDerivativeList } from '@/hooks/useAllProtocol'
// import { useBalances } from '@/hooks/useTokens'
// import { useStoreProfile, useStoreBalances } from '@/stores/useStoreProfile'
// import { useStoreDerivativeList } from '@/stores/useStoreFunds'
import AllProtocol from '@/class/AllProtocol'
import FundFactry from '@/class/FundFactory'
// import { getJsonRpcProvider } from '@/utils/contractHelpers'
import { useProfile } from '@/hooks/useProfile'
import { useGetFundList } from '@/hooks/useFund'
import { useUpdateTokenPriceInUSD } from '@/hooks/useTokenPrice'
export default function Global(): null {
  const { fundNumLimit } = AllProtocol
  const { getBaseTokenPriceInUSD } = FundFactry
  // update profile info
  const { address } = useAccount()
  const { update: updateProfile } = useProfile()
  const getProfileData = useCallback(async () => {
    if (address) {
      updateProfile(address, false, 0, null, true)
      const maxFundLimit = await fundNumLimit(address)
      // const provider = getJsonRpcProvider()
      const provider = new providers.Web3Provider(window.ethereum)
      const signer: Signer = provider.getSigner(address)
      updateProfile(address, Boolean(maxFundLimit), maxFundLimit, signer, false)
      // console.log(maxFundLimit)
    } else {
      updateProfile('', false, 0, null, false)
    }
  }, [address, fundNumLimit, updateProfile])

  useEffect(() => {
    void getProfileData()
    void getBaseTokenPriceInUSD()
  }, [getProfileData, getBaseTokenPriceInUSD])

  useGetFundList()
  useUpdateTokenPriceInUSD()
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
