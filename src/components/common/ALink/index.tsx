import { FC, ReactNode, useMemo } from 'react'

import { Link } from 'react-router-dom'

interface Props {
  to: string
  className?: string
  title?: string
  children: ReactNode
}

const ALink: FC<Props> = ({ to, className, children, title }) => {
  const isBlank = useMemo(() => /^https?:\/\//.test(to ?? '') || /^mailto:/.test(to ?? ''), [to])
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
