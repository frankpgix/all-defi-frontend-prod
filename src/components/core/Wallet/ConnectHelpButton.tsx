import { FC, ReactNode } from 'react'

import { useAccount } from 'wagmi'

import ConnectButton from './ConnectButton'

interface Props {
  children?: ReactNode
  size?: 'default' | 'mini' | 'medium' | 'icon' | 'tiny'
}

export const ConnectHelpButton: FC<Props> = ({ children, size }) => {
  const { address } = useAccount()
  if (!address) return <ConnectButton simple size={size} />
  return children
}

export default ConnectHelpButton
