import { FC, useMemo } from 'react'

import classNames from 'classnames'

import { useChainToken } from '@/hooks/useToken'

import { Image } from '../Image'
import Tag from '../Tag'

interface Props {
  name: string
  size?: 'default' | 'mini' | 'medium' | 'large' | 'big'
  round?: boolean
  icon?: string
  chain?: boolean
}
export const VaultIcon: FC<Props> = ({ name, size = 'default', round, icon, chain }) => {
  const { chainToken } = useChainToken()
  const letter = useMemo(() => (name ? name.charAt(0) : 'A'), [name])
  const allLetter = 'abcdefghijklmnopqrstuvwxyz01234567890'.split('')
  const letterIndex = allLetter.findIndex((item) => letter.toLocaleLowerCase() === item)
  const number = ((letterIndex === -1 ? 0 : letterIndex) % 9) + 1
  return (
    <div
      className={classNames('c-vault-icon', `c-vault-icon-size-${size}`, `style-${number}`, {
        round,
        icon
      })}
    >
      {icon ? <Image src={icon} /> : letter}
      {chain ? <Image className="chain-icon" src={chainToken.icon} /> : null}
    </div>
  )
}

export default VaultIcon
interface VaultNameProps extends Props {
  managerName?: string
  status?: number
  icon?: string
  chain?: boolean
  showFee?: boolean
}
export const VaultName: FC<VaultNameProps> = ({
  name,
  size,
  round,
  managerName,
  status,
  icon,
  chain,
  showFee
}) => {
  const Stage = ['Open', 'SemiOpen', 'PreSettlement', 'Settlement']
  const statusText = useMemo(() => {
    const s = status || 0
    return Stage[s > 3 ? 3 : s]
  }, [status])
  return (
    <div className="c-vault-name" title={name}>
      <VaultIcon icon={icon} name={name} chain={chain} size={size} round={round} />
      <p>
        <strong>
          <span>{name}</span>
          {status != null && <Tag dot name={statusText}></Tag>}
        </strong>
        {managerName && (
          <em>
            {managerName}
            {showFee && ' | Manager Fee: 20%'}
          </em>
        )}
      </p>
    </div>
  )
}
