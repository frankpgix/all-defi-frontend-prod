import { FC } from 'react'
import classNames from 'classnames'
import { ETH_SCAN_URL } from '@/config'
import ALink from '@@/common/ALink'
import { calcShortHash } from '@/utils/tools'

interface Props {
  address: string
  className?: string
  prefixLength?: number
  suffixLength?: number
}

const HashLink: FC<Props> = ({ address, className, prefixLength = 8, suffixLength = 8 }) => {
  const type = address.length === 66 ? 'tx' : 'address'
  return (
    <ALink
      className={classNames('outlink', className)}
      to={`${ETH_SCAN_URL}/${type}/${address}`}
      title={address}
    >
      {calcShortHash(address, prefixLength, suffixLength)}
    </ALink>
  )
}

export default HashLink
