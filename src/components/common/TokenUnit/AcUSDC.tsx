import React, { FC, ReactNode } from 'react'
import Image from '@@/common/Image'
import tokenss from '@/config/tokens'

interface Props {
  children?: ReactNode
  value?: number | string
  name?: string
}

const AcUSDC: FC<Props> = ({ children, value, name }) => {
  return (
    <div className="web-c-token-unit">
      <Image src={`${name ? (tokenss[name] ? tokenss[name].icon : 'icon/sac-usdc.png') : 'icon/sac-usdc.png'}`} />
      {value != null && <em>{value}</em>}
      {name ? name : children ? children : 'acUSDC'}
    </div>
  )
}

export default AcUSDC
