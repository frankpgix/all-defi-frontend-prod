import { useContractRead } from 'wagmi'

import contracts from '@/config/contracts'
import tokens from '@/config/tokens'
import { bigInt2Number } from '@/utils/tools'
// import { getAllProtocolContracts } from '@/utils/contractHelpers'

const AllProtocol = contracts.AllProtocol

export const useIsManager = (address = '') => {
  const { data, isLoading, refetch } = useContractRead({
    ...AllProtocol,
    functionName: 'isManagerAuthorized',
    args: [address]
  })
  // console.log({ ...contracts.AllProtocol })
  return { isManager: Boolean(data), isLoading, refetch }
}

export const useAllTokenPrice = (baseTokenAddress = '') => {
  let address = baseTokenAddress || tokens.USDC.address
  if (address === tokens.ETH.address) address = tokens.WETH.address
  const { data, isLoading, refetch } = useContractRead({
    ...AllProtocol,
    functionName: 'allTokenPrice',
    args: [address]
  })
  return { data: bigInt2Number(data ?? 1, 18, 4), isLoading, refetch }
}
