import { FC } from 'react'

import classNames from 'classnames'

import { Icon } from '@@/core/Image'

interface Props {
  name: string
  dot?: boolean
  icon?: string
  type?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default' | 'dark'
  size?: 'large' | 'default' | 'small' | 'mini' | 'tiny' | 'super'
}

const Tag: FC<Props> = ({ name, icon, type = 'default', size = 'default', dot }) => {
  return (
    <button className={classNames('c-tag', `c-tag-type-${type}`, `c-tag-size-${size}`, { dot })}>
      {icon && <Icon src={icon} size="mini" />}
      {name}
    </button>
  )
}

export default Tag
