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
  nolink?: boolean
}

const HashLink: FC<Props> = ({
  address,
  className,
  prefixLength = 8,
  suffixLength = 8,
  nolink
}) => {
  const { chain } = useAccount()
  const type = address.length === 66 ? 'tx' : 'address'
  if (nolink) {
    return (
      <span className={classNames('outlink', className, { nolink })}>
        {calcShortHash(address, prefixLength, suffixLength)}
      </span>
    )
  }
  return (
    <ALink
      className={classNames('outlink', className, { nolink })}
      to={`${chain?.blockExplorers?.default.url}/${type}/${address}`}
      title={address}
    >
      {calcShortHash(address, prefixLength, suffixLength)}
    </ALink>
  )
}

export default HashLink
