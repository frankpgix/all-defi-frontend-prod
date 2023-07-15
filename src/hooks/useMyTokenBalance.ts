import { useState } from 'react'
import { useWatchBlockNumber } from '@/hooks/walletHooks'
import { useProfile } from '@/hooks/useProfile'

import TokensClass, { defaultBalance, BalanceProps } from '@/class/Tokens'

export const useMyTokenBalance = (): BalanceProps => {
  const { signer } = useProfile()
  const { getTokensBalance } = TokensClass
  const [balance, setBalance] = useState(defaultBalance)

  useWatchBlockNumber(
    async () => {
      if (signer) {
        const data = await getTokensBalance(signer)
        setBalance(data)
      }
    },
    [],
    10
  )
  return balance
}
