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

export const IconGroup: FC<{ list: TokenKeys[]; size?: string }> = ({ list, size = 'mini' }) => {
  return (
    <div className="c-token-icon-group">
      {list.map((item) => (
        <Icon name={item} size={size} />
      ))}
    </div>
  )
}
