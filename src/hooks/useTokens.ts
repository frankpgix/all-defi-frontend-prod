import { useContractReads, useBalance } from 'wagmi'
import { useAccount } from 'wagmi'

import tokens from '@/config/tokens'
import bep20Abi from '@/config/abi/erc20.json'
import { bigInt2Number } from '@/utils/tools'

export const useBalances = () => {
  const { address } = useAccount()
  const tokensArray = Object.keys(tokens)
    .map((key) => tokens[key])
    .filter((item) => item.address !== '0x0000000000000000000000000000000000000000')

  const tokensContractArray = tokensArray.map((token) => ({
    address: token.address,
    abi: bep20Abi,
    functionName: 'balanceOf',
    args: [address]
  }))

  const { data: sData } = useContractReads({
    // @ts-ignore
    contracts: tokensContractArray,
    watch: true
  })

  const { data: ethBalance } = useBalance({
    address,
    watch: true
  })
  // console.log(ethBalance)
  const data: { name: string; value: number }[] = (sData ?? []).map(({ result, status }, index) => {
    const token = tokensArray[index]
    if (status === 'success') {
      return { name: token.name, value: bigInt2Number(result, token.decimals, token.precision) }
    }
    return { name: token.name, value: 0 }
  })

  const res: Record<string, number> = {
    ETH: ethBalance ? bigInt2Number(ethBalance.value, ethBalance.decimals, 4) : 0
  }
  for (const { name, value } of data) {
    res[name] = value
  }
  // console.log(res)
  return res
}
