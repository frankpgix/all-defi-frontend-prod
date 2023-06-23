import React, { useEffect } from 'react'
import { useAccount, useBalance, useContractRead } from 'wagmi'
// import contracts from '@/config/contracts'
// import { getAllProtocolContracts } from '@/utils/contractHelpers'
// import { useIsManager } from '@/hooks/useAllProtocol'

export const useProfile = () => {
  const { address } = useAccount()
  // const isManager = useIsManager(address)
  // console.log('isAuthorizedManager', isManager)
  return { address }
}
