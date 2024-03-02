import { useReadContract } from 'wagmi'
import { AddressType } from '@/types/base'
import { safeInterceptionValues } from '@/utils/tools'

import { useVaultFactoryContract } from '@/hooks/useContract'

// allTokenPrice = async (baseToken: string) => {
//   // console.log(baseToken)
//   // const contract = getAllProtocolContract()
//   const { getAssetPrice } = FundFactory
//   try {
//     if (baseToken === '0x0000000000000000000000000000000000000000') {
//       baseToken = tokens.WETH.tokenAddress
//     }
//     // console.log(baseToken)
//     const res = await getAssetPrice(tokens.ALLTOKEN.tokenAddress, baseToken)
//     // console.log(safeInterceptionValues(res, 6, 18))
//     return res
//   } catch (error) {
//     console.info(error)
//     return 1
//   }
// }
const VaultFactoryContract = useVaultFactoryContract()

export const useAssetPrice = (baseAsset: AddressType, quoteAsset: AddressType) => {
  if (!baseAsset || !quoteAsset) {
    return {
      isLoading: false,
      isSuccess: true,
      data: 0
    }
  }
  const { data, isLoading, isSuccess } = useReadContract({
    ...VaultFactoryContract,
    functionName: 'assetPrice',
    args: [baseAsset, quoteAsset]
  })
  return {
    data: !isLoading && isSuccess ? Number(safeInterceptionValues(data, 6, 18)) : 0,
    isLoading,
    isSuccess
  }
}
