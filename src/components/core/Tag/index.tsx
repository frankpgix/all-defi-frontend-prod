import { FC } from 'react'

import classNames from 'classnames'

import { Icon } from '@@/core/Image'

interface Props {
  name: string
  icon?: string
  type?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'default'
  size?: 'large' | 'default' | 'small' | 'mini' | 'tiny' | 'super'
}

const Tag: FC<Props> = ({ name, icon, type, size }) => {
  return (
    <button className={classNames('c-tag', `c-tag-type-${type}`, `c-tag-size-${size}`)}>
      <Icon src={icon} />
      {name}
    </button>
  )
}

export default Tag
