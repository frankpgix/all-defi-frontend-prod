import { FC } from 'react'

import classNames from 'classnames'
import { useAccount } from 'wagmi'

import { calcShortHash } from '@/utils/tools'
import ALink from '@@/common/ALink'

interface Props {
  address: string
  className?: string
  prefixLength?: number
  suffixLength?: number
}

const HashLink: FC<Props> = ({ address, className, prefixLength = 8, suffixLength = 8 }) => {
  const { chain } = useAccount()
  const type = address.length === 66 ? 'tx' : 'address'
  return (
    <ALink
      className={classNames('outlink', className)}
      to={`${chain?.blockExplorers?.default.url}/${type}/${address}`}
      title={address}
    >
      {calcShortHash(address, prefixLength, suffixLength)}
    </ALink>
  )
}

export default HashLink
