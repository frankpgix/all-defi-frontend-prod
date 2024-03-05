import { useReadContracts, useBalance, useAccount } from 'wagmi'

import { tokens, ZERO_ADDRESS } from '@/config/tokens'

import { useERC20Contract } from '@/hooks/useContract'
import { safeInterceptionValues } from '@/utils/tools'
import { profileProps } from '@/types/profile'
// import { useVaultCountLimit } from '@/hooks/useAllProtocol'

import { useStoreProfile } from '@/stores/useStoreProfile'

// export const useProfile = (): profileProps => {
//   const { address: account } = useAccount()
//   const {
//     data: maxFundLimit,
//     isLoading: loading,
//     isSuccess,
//     refetch: update
//   } = useVaultCountLimit(account)
//   console.log(Boolean(maxFundLimit), maxFundLimit)
//   if (!loading && isSuccess) {
//     return {
//       account,
//       isManager: Boolean(maxFundLimit),
//       loading,
//       maxFundLimit,
//       update
//     }
//   }
//   return {
//     account,
//     isManager: false,
//     loading: false,
//     maxFundLimit: 0,
//     update: () => {}
//   }
// }

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

export const useETHBalance = () => {
  const { account } = useProfile()
  const { data } = useBalance({ address: account || undefined })
  if (!account || !data) return 0

  return Number(safeInterceptionValues(data?.value ?? '', 6, 18))
}

export const useUserBalances = () => {
  const { account: address } = useProfile()

  const balances: Record<string, number> = {}
  const ethBalances = useETHBalance()

  const tokenList = Object.keys(tokens)
    .map((token) => {
      balances[tokens[token].name] = 0
      return tokens[token]
    })
    .filter((token) => token.address !== ZERO_ADDRESS)

  if (!address) return { balances, refetch: () => {} }

  const contracts = tokenList.map((token) => {
    return {
      ...useERC20Contract(token.address),
      functionName: 'balanceOf',
      args: [address]
    }
  })

  const { data, refetch } = useReadContracts({ contracts })

  tokenList.forEach((token, index) => {
    const balance = data?.[index]
      ? Number(safeInterceptionValues(data[index].result, token.precision, token.decimals))
      : 0
    balances[token.name] = balance
  })
  balances.ETH = ethBalances
  return { balances, refetch }
}
