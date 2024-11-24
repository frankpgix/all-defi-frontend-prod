import { FC, useMemo } from 'react'

import classNames from 'classnames'

interface Props {
  name: string
  size?: 'default' | 'mini' | 'medium' | 'large' | 'big'
  round?: boolean
}
export const VaultIcon: FC<Props> = ({ name, size = 'default', round }) => {
  const letter = useMemo(() => (name ? name.charAt(0) : 'A'), [name])
  const allLetter = 'abcdefghijklmnopqrstuvwxyz01234567890'.split('')
  const letterIndex = allLetter.findIndex((item) => letter.toLocaleLowerCase() === item)
  const number = ((letterIndex === -1 ? 0 : letterIndex) % 9) + 1
  return (
    <div
      className={classNames('c-vault-icon', `c-vault-icon-size-${size}`, `style-${number}`, {
        round
      })}
    >
      {letter}
    </div>
  )
}

export default VaultIcon
interface VaultNameProps extends Props {
  managerName?: string
  status?: number
}
export const VaultName: FC<VaultNameProps> = ({ name, size, round, managerName, status }) => {
  const Stage = ['Open', 'SemiOpen', 'PreSettlement', 'Settlement']
  const statusText = useMemo(() => {
    const s = status || 0
    return Stage[s > 3 ? 3 : s]
  }, [status])
  return (
    <div className="c-vault-name" title={name}>
      <VaultIcon name={name} size={size} round={round} />
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
