import { Signer } from 'ethers'
import bep20Abi from '@/config/abi/erc20.json'
import tokens from '@/config/tokens'

import {
  getUSDCAddress,
  getacUSDCAddress,
  getsALLTOKENAddress,
  getALLTOKENAddress
} from '@/utils/addressHelpers'
import { getJsonRpcProvider } from '@/utils/contractHelpers'
import multicall from '@/utils/multicall'
import { safeInterceptionValues } from '@/utils/tools'

const jsonRpc = getJsonRpcProvider()

class Tokens {
  getTokensBalance = async (signer: Signer): Promise<BalanceProps> => {
    const account = await signer?.getAddress()
    const balances = { ...defaultBalance }
    const tokensList: { address: string; symbol: string; decimals: number; precision: number }[] = [
      {
        address: getUSDCAddress(),
        symbol: 'USDC',
        decimals: tokens.USDC.decimals,
        precision: tokens.USDC.precision
      },
      {
        address: getacUSDCAddress(),
        symbol: 'acUSDC',
        decimals: tokens.acUSDC.decimals,
        precision: tokens.acUSDC.precision
      },
      {
        address: getsALLTOKENAddress(),
        symbol: 'sALL',
        decimals: tokens.sALLTOKEN.decimals,
        precision: tokens.sALLTOKEN.precision
      },
      {
        address: getALLTOKENAddress(),
        symbol: 'ALL',
        decimals: tokens.ALLTOKEN.decimals,
        precision: tokens.ALLTOKEN.precision
      },
      {
        address: tokens.acETH.tokenAddress,
        symbol: tokens.acETH.symbol,
        decimals: tokens.acETH.decimals,
        precision: tokens.acETH.precision
      }
    ]
    try {
      if (account) {
        const calls = tokensList.map(({ address }) => ({
          address,
          name: 'balanceOf',
          params: [account]
        }))
        const res = await multicall({ abi: bep20Abi, calls })
        res.forEach((data, index) => {
          // @ts-ignore
          balances[tokensList[index].symbol] = safeInterceptionValues(
            String(data),
            tokensList[index].precision,
            tokensList[index].decimals
          )
        })
        const eth = await jsonRpc.getBalance(account)
        const ethBalance = safeInterceptionValues(eth, 4, 18)
        balances.ETH = ethBalance
        return balances
      }
      return balances
    } catch (e) {
      console.info(e)
      return balances
    }
  }
}
export default new Tokens()

export interface BalanceProps {
  USDC: string
  acUSDC: string
  ETH: string
  acETH: string
  sALL: string
  ALL: string
}
export const defaultBalance: BalanceProps = {
  USDC: '0',
  acUSDC: '0',
  ETH: '0',
  acETH: '0',
  sALL: '0',
  ALL: '0'
}
