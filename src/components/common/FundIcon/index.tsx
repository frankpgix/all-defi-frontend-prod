import { FC, useState, useMemo } from 'react'
import classNames from 'classnames'
// import { toast } from '@@/common/Toast'
import { sleep, copyText } from '@/utils/tools'

interface Props {
  name: string
  size?: 'default' | 'mini' | 'medium' | 'large' | 'big'
  round?: boolean
}
export const FundIcon: FC<Props> = ({ name, size = 'default', round }) => {
  const letter = useMemo(() => (name ? name.charAt(0) : 'A'), [name])
  const allLetter = 'abcdefghijklmnopqrstuvwxyz01234567890'.split('')
  const letterIndex = allLetter.findIndex((item) => letter.toLocaleLowerCase() === item)
  const number = ((letterIndex === -1 ? 0 : letterIndex) % 9) + 1
  return (
    <div
      className={classNames('c-fund-icon', `c-fund-icon-size-${size}`, `style-${number}`, {
        round
      })}
    >
      {letter}
    </div>
  )
}

export default FundIcon
interface FundNameProps extends Props {
  managerName?: string
  address?: string
}
export const FundName: FC<FundNameProps> = ({ name, size, round, managerName, address }) => {
  const [status, setStatus] = useState<boolean>(false)
  const copy = async (e: any) => {
    e.stopPropagation()
    await copyText(address ?? '')
    setStatus(true)
    await sleep(1500)
    setStatus(false)
    // toast.success('Fund Address Copied')
  }
  return (
    <div className="c-fund-name" title={name}>
      <FundIcon name={name} size={size} round={round} />
      <p>
        <strong>
          <span>{name}</span>
          {address && (
            <i onClick={copy} className={classNames({ show: status })}>
              <u>Copied</u>
            </i>
          )}
        </strong>
        {managerName && <em>{managerName}</em>}
      </p>
    </div>
  )
}
