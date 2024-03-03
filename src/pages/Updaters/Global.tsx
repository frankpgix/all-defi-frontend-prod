import { useEffect, useCallback } from 'react'
// import { useAccount } from 'wagmi'
import { getAccount } from '@wagmi/core'
import { config } from '@/config/wagmi'
// // import { useIsManager, useDerivativeList } from '@/hooks/useAllProtocol'
// // import { useBalances } from '@/hooks/useTokens'
// // import { useStoreProfile, useStoreBalances } from '@/stores/useStoreProfile'
// // import { useStoreDerivativeList } from '@/stores/useStoreFunds'
// // import { getJsonRpcProvider } from '@/utils/contractHelpers'
import { useProfile } from '@/hooks/useProfile'
import { useVaultCountLimit } from '@/hooks/useAllProtocol'
// import { useGetFundList } from '@/hooks/useFund'
// import { useUpdateTokenPriceInUSD } from '@/hooks/useTokenPrice'
export default function Global(): null {
  const { address } = getAccount(config)
  // console.log(address)

  const { update: updateProfile } = useProfile()
  const { data: maxFundLimit, isLoading } = useVaultCountLimit(address ?? '')
  // console.log(o)
  const getProfileData = useCallback(async () => {
    if (address) {
      updateProfile(address, Boolean(maxFundLimit), maxFundLimit, isLoading)
    } else {
      updateProfile('', false, 0, isLoading)
    }
  }, [address, isLoading])

  useEffect(() => {
    void getProfileData()
    // void getBaseTokenPriceInUSD()
  }, [address, maxFundLimit, isLoading])

  // useGetFundList()
  // useUpdateTokenPriceInUSD()
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
