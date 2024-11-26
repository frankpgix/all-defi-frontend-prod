import { FC, ReactNode } from 'react'

import { useToken } from '@/hooks/useToken'

import { TokenKeys } from '@/types/base'

import Image from '@@/common/Image'

interface Props {
  children?: ReactNode
  value?: number | string
  name?: string
}

const AcUSDC: FC<Props> = ({ children, value, name }) => {
  const { getTokenByName } = useToken()
  const token = getTokenByName((name ?? '') as TokenKeys)
  console.log(token, 'token')
  if (!name) {
    return null
  }
  return (
    <div className="web-c-token-unit">
      <Image src={`${name ? token.icon : 'icon/sac-usdc.png'}`} />
      {value != null && <em>{value}</em>}
      {name ? name : children ? children : 'acUSDC'}
    </div>
  )
}

export default AcUSDC
