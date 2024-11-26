import { FC, useMemo } from 'react'

import classNames from 'classnames'

import { Image } from '../Image'

interface Props {
  name: string
  size?: 'default' | 'mini' | 'medium' | 'large' | 'big'
  round?: boolean
  icon?: string
}
export const VaultIcon: FC<Props> = ({ name, size = 'default', round, icon }) => {
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
    </div>
  )
}

export default VaultIcon
interface VaultNameProps extends Props {
  managerName?: string
  status?: number
  icon?: string
}
export const VaultName: FC<VaultNameProps> = ({ name, size, round, managerName, status, icon }) => {
  const Stage = ['Open', 'SemiOpen', 'PreSettlement', 'Settlement']
  const statusText = useMemo(() => {
    const s = status || 0
    return Stage[s > 3 ? 3 : s]
  }, [status])
  return (
    <div className="c-vault-name" title={name}>
      <VaultIcon icon={icon} name={name} size={size} round={round} />
      <p>
        <strong>
          <span>{name}</span>
          {status != null && <span className="status">{statusText}</span>}
        </strong>
        {managerName && <em>{managerName}</em>}
      </p>
    </div>
  )
}
