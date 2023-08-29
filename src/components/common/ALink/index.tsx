import { FC, ReactNode, useMemo } from 'react'

import { Link } from 'react-router-dom'

interface Props {
  to: string
  className?: string
  title?: string
  children: ReactNode
  disabled?: boolean
}

const ALink: FC<Props> = ({ to, className, children, title, disabled }) => {
  const isBlank = useMemo(() => /^https?:\/\//.test(to ?? '') || /^mailto:/.test(to ?? ''), [to])

  if (disabled) {
    return <a className={className}>{children}</a>
  }
  if (isBlank) {
    return (
      <a href={to} className={className} target="_blank" title={title}>
        {children}
      </a>
    )
  }
  return (
    <Link className={className} to={to} title={title}>
      {children}
    </Link>
  )
}

export default ALink
