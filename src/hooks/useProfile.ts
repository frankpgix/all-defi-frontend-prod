import { useReadContracts, useBalance } from 'wagmi'

import { tokens, ZERO_ADDRESS } from '@/config/tokens'

import { useERC20Contract } from '@/hooks/useContract'
import { safeInterceptionValues } from '@/utils/tools'
import { profileProps } from '@/types/profile'
// import { useVaultCountLimit } from '@/hooks/useAllProtocol'
import { TokenKeys } from '@/types/base'
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
  const { account } = useProfile()

  // const balances: Record<string, number> = {}
  const balances: { [key in TokenKeys]: number } = {
    USDC: 0,
    acUSDC: 0,
    WETH: 0,
    ETH: 0,
    WBTC: 0,
    acETH: 0,
    ALLTOKEN: 0,
    sALLTOKEN: 0
  }
  // | 'USDC' | 'acUSDC' | 'WETH' | 'ETH' | 'WBTC' | 'acETH' | 'ALLTOKEN' | 'sALLTOKEN'
  const ethBalances = useETHBalance()

  const tokenList = Object.keys(tokens)
    .map((token) => {
      return tokens[token as TokenKeys]
    })
    .filter((token) => token.address !== ZERO_ADDRESS)

  const contracts = tokenList.map((token) => {
    return {
      ...useERC20Contract(token.address),
      functionName: 'balanceOf',
      args: [account]
    }
  })

  const { isLoading, isSuccess, data, refetch } = useReadContracts({ contracts })

  if (!isLoading && isSuccess) {
    tokenList.forEach((token, index) => {
      const balance =
        data?.[index] && data[index].status === 'success'
          ? Number(safeInterceptionValues(data[index].result, token.precision, token.decimals))
          : 0
      balances[token.name as TokenKeys] = balance
    })
    balances.ETH = ethBalances
    return { balances, refetch }
  }
  return { balances, refetch }
}
