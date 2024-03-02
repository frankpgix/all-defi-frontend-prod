import { useAccount, useReadContracts, useBalance } from 'wagmi'

import { tokens, ZERO_ADDRESS } from '@/config/tokens'

import { useERC20Contract } from '@/hooks/useContract'
import { safeInterceptionValues } from '@/utils/tools'

export const userProfile = () => {
  const account = useAccount()
  console.log(account)
}

export const useETHBalance = () => {
  const { address } = useAccount()
  if (!address) return 0
  const { data } = useBalance({ address })
  if (!data) return 0

  return Number(safeInterceptionValues(data?.value ?? '', 6, 18))
}

export const useUserBalances = () => {
  const { address } = useAccount()

  const balances: Record<string, number> = {}
  const ethBalances = useETHBalance()

  const tokenList = Object.keys(tokens)
    .map((token) => {
      balances[tokens[token].name] = 0
      return tokens[token]
    })
    .filter((token) => token.address !== ZERO_ADDRESS)

  if (!address) return balances

  const contracts = tokenList.map((token) => {
    return {
      ...useERC20Contract(token.address),
      functionName: 'balanceOf',
      args: [address]
    }
  })

  const { data } = useReadContracts({ contracts })

  tokenList.forEach((token, index) => {
    const balance = data?.[index]
      ? Number(safeInterceptionValues(data[index].result, token.precision, token.decimals))
      : 0
    balances[token.name] = balance
  })
  balances.ETH = ethBalances
  return balances
}
