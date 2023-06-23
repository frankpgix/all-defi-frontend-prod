import { useContractRead } from 'wagmi'

import contracts from '@/config/contracts'
// import { getAllProtocolContracts } from '@/utils/contractHelpers'

export const useIsManager = (address = '') => {
  const { data, isLoading, refetch } = useContractRead({
    ...contracts.AllProtocol,
    functionName: 'isManagerAuthorized',
    args: [address]
  })
  return { isManager: Boolean(data), isLoading, refetch }
}
