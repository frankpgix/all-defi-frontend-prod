import { FC, ReactNode } from 'react'

import classNames from 'classnames'

import { useToken } from '@/hooks/useToken'

import { TokenKeys } from '@/types/base'

import Image from '@@/common/Image'

interface Props {
  children?: ReactNode
  size?: string
  name?: string
}

const Icon: FC<Props> = ({ size, name }) => {
  const { getTokenByName } = useToken()
  const token = getTokenByName(name ?? '')
  return (
    <Image
      className={classNames('c-token-icon', `c-token-icon-${size}`)}
      src={`${name ? token.icon : 'icon/sac-usdc.png'}`}
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
