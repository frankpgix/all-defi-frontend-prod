import { FC, ReactNode } from 'react'
import Image from '@@/common/Image'
import tokenss from '@/config/tokens'
import classNames from 'classnames'

interface Props {
  children?: ReactNode
  size?: string
  name?: string
}

const Icon: FC<Props> = ({ size, name }) => {
  return (
    <Image
      className={classNames('c-token-icon', `c-token-icon-${size}`)}
      src={`${name ? (tokenss[name] ? tokenss[name].icon : 'icon/sac-usdc.png') : 'icon/sac-usdc.png'}`}
      alt={name}
      title={name}
    />
  )
}

export default Icon
