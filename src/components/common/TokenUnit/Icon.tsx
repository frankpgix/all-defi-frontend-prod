import { FC, ReactNode } from 'react'
import Image from '@@/common/Image'
import tokenss from '@/config/tokens'
import classNames from 'classnames'
import { TokenKeys } from '@/types/base'

interface Props {
  children?: ReactNode
  size?: string
  name?: string
}

const Icon: FC<Props> = ({ size, name }) => {
  return (
    <Image
      className={classNames('c-token-icon', `c-token-icon-${size}`)}
      src={`${name ? (tokenss[name as TokenKeys] ? tokenss[name as TokenKeys].icon : 'icon/sac-usdc.png') : 'icon/sac-usdc.png'}`}
      alt={name}
      title={name}
    />
  )
}

export default Icon
