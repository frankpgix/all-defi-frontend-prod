import React, { FC, ReactNode } from 'react'

import Image from '@@/common/Image'
interface Props {
  children?: ReactNode
  text?: string
}

const Tip: FC<Props> = ({ children, text }) => {
  return (
    <div className="c-tip">
      <Image src="icon/warn.svg" />
      <p>{children || text}</p>
    </div>
  )
}

export default Tip
