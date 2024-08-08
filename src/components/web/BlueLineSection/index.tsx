import { FC, ReactNode } from 'react'

import classNames from 'classnames'

interface HeaderProps {
  title?: string
  headerRight?: ReactNode
  first?: boolean
}

export const BlueLineSectionHeader: FC<HeaderProps> = ({ title, headerRight, first }) => {
  if (!title) return null
  return (
    <header className={classNames('web-c-blue-line-section-header', { first })}>
      <h2>{title}</h2>
      {headerRight && headerRight}
    </header>
  )
}

interface Props {
  title?: string
  className?: string
  children: ReactNode
  headerRight?: ReactNode
  hide?: boolean
  web?: boolean
}

const BlueLineSection: FC<Props> = ({
  title,
  className,
  children,
  headerRight,
  hide,
  web = true
}) => {
  return (
    <section className={classNames('web-c-blue-line-section', { hide, web })}>
      <BlueLineSectionHeader title={title} headerRight={headerRight} first />
      <main className={classNames('web-c-blue-line-section-main', className)}>{children}</main>
    </section>
  )
}

export default BlueLineSection
