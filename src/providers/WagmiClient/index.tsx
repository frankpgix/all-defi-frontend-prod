import { WagmiConfig } from 'wagmi'
import React from 'react'
import { config } from './wagmi'

const WagmiClient = (props: React.PropsWithChildren) => (
  <WagmiConfig config={config}>{props.children}</WagmiConfig>
)

export default WagmiClient
