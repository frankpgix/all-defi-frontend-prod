import { useReadContract } from 'wagmi'
import { tokens, ZERO_ADDRESS } from '@/config/tokens'
import { useAllProtocolContract } from '@/hooks/useContract'
import { useAssetPrice } from '@/hooks/useVaultFactory'
import { AddressType } from '@/types/base'

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
const AllProtocolContract = useAllProtocolContract()

export const useAllTokenPrice = (baseToken: AddressType) => {
  // const res = useReadContract({ ...AllProtocolContract , })
  if (baseToken === ZERO_ADDRESS) {
    baseToken = tokens.WETH.address
  }
  return useAssetPrice(tokens.ALLTOKEN.address, baseToken)
}
