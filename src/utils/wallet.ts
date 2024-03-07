import { getConnectorClient } from '@wagmi/core'

import { watchAsset } from 'viem/actions'
import { config } from '@/config/wagmi'
import { AddressType } from '@/types/base'

export const addTokenToWallet = async (
  address: AddressType,
  decimals: number,
  symbol: string,
  image?: string
) => {
  const walletClient = await getConnectorClient(config)
  console.log(walletClient)

  const success = await watchAsset(walletClient, {
    type: 'ERC20',
    options: {
      address,
      decimals,
      symbol,
      image
    }
  })
  return success
}
