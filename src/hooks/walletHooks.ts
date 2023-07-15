import { useCallback, useEffect, useState, useMemo } from 'react'
import { useBlockNumber } from 'wagmi'
import { getAddress } from '@ethersproject/address'
import { AddressZero } from '@ethersproject/constants'
import { Contract, ContractInterface } from '@ethersproject/contracts'

import { getBep20Contract } from '@/utils/contractHelpers'
import { simpleRpcProvider } from '@/utils/simpleRpcProvider'
import { safeInterceptionValues } from '@/utils/tools'
import { useProfile } from '@/hooks/useProfile'

/**
 * Check whether the address meets the specification
 * @param value
 */

export const isWalletAddress = (value: any): boolean => {
  try {
    return Boolean(getAddress(value))
  } catch {
    return false
  }
}

/**
 * Get bep20 token wallet balance
 * @param tokenAddress
 * @param decimal
 * @param precision
 */

export interface TokenBalanceProps {
  balance: string
  loading: boolean
}

export const useTokenBalance = (tokenAddress?: string, decimal = 8, precision = 18): TokenBalanceProps => {
  const { signer, account } = useProfile()
  const [balance, setBalance] = useState<string>('0')
  const [loading, setLoading] = useState<boolean>(true)

  useWatchBlockNumber(
    async () => {
      setLoading(true)

      if (signer && account) {
        // const account = await signer.getAddress()

        if (tokenAddress) {
          const contract = getBep20Contract(tokenAddress, signer)
          const balance = await contract.balanceOf(account)
          setBalance(safeInterceptionValues(balance, decimal, precision))
        } else {
          const balance = await simpleRpcProvider.getBalance(account)
          setBalance(safeInterceptionValues(balance, decimal, precision))
        }
      }

      setLoading(false)
    },
    [tokenAddress, signer],
    1
  )
  return { balance, loading }
}

/**
 * Watch block number and do function
 * @param action function
 * @param dep
 * @param diffNumber number, default 0
 */

export const useWatchBlockNumber = (action: () => void, dep: any[], diffNumber?: number) => {
  const diff = diffNumber ?? 0
  const { data: blockNumber } = useBlockNumber({ watch: true })
  const [currBlockNumber, setCurrBlockNumber] = useState(0)

  const func = useCallback(async () => {
    await action()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, ...dep])

  useEffect(() => {
    const number = blockNumber ?? 0
    if (blockNumber && number - currBlockNumber > diff) {
      void func()
      setCurrBlockNumber(number)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber, diff])
}
