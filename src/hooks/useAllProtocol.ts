import { useContractRead } from 'wagmi'
import { hexToString } from 'viem'

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

export const useDerivativeList = () => {
  const {
    data: sData,
    isLoading,
    refetch
  } = useContractRead({
    ...AllProtocol,
    functionName: 'derivativeList'
  })
  const data = sData.map((item: string) => ({ name: hexToString(item, { size: 32 }), value: item }))
  return { data, isLoading, refetch }
}
