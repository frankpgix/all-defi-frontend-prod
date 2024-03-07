import { FC, ReactNode } from 'react'
// import { useToggle, useClickAway } from 'ahooks'

import classNames from 'classnames'

import Image from '@@/common/Image'

interface Props {
  children?: ReactNode
  content?: ReactNode | string
  className?: string
  size?: 'default' | 'mini' | 'small'
  white?: boolean
  blue?: boolean
  width?: string
}

const Popper: FC<Props> = ({ children, content, className, size = 'default', white, width }) => {
  // const [show, { setLeft: clsePopper, setRight: openPopper }] = useToggle(false)
  //
  // const ref = useRef<HTMLDivElement>(null)
  // useClickAway(clsePopper, ref)

  return (
    <div
      className={classNames('c-popper', `c-popper-size-${size}`, className, {
        white,
        'has-children': Boolean(children)
      })}
    >
      {children ? (
        children
      ) : (
        <Image src={`icon/popper${white ? '-white' : ''}.svg`} className="c-popper-icon" />
      )}
      {content && (
        <div className="c-popper-content" style={{ minWidth: width || 'auto' }}>
          <p>{content}</p>
        </div>
      )}
    </div>
  )
}

export default Popper
// <Image src={`icon/mark-round${white ? '-white' : ''}${blue ? '-blue' : ''}.svg`} className="c-popper-icon" />
