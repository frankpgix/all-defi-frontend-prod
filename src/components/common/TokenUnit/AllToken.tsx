import React, { FC, ReactNode } from 'react'
import Image from '@@/common/Image'

interface Props {
  children?: ReactNode
  value?: number | string
  sall?: boolean
}

const AllToken: FC<Props> = ({ children, value, sall }) => {
  const icon = sall ? 'icon/sall-token.png' : 'icon/alltoken.png'

  return (
    <div className="web-c-token-unit">
      <Image src={icon} />
      {value != null && <em>{value}</em>}
      {children ? children : 'ALL'}
    </div>
  )
}

export default AllToken
