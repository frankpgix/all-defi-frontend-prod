import { FC, ReactNode } from 'react'

import classNames from 'classnames'

import Image from '@/components/common/Image'

interface HeaderProps {
  title?: string
  titleIcon?: string
  headerRight?: ReactNode
  first?: boolean
}

export const BlueLineSectionHeader: FC<HeaderProps> = ({
  title,
  titleIcon,
  headerRight,
  first
}) => {
  if (!title) return null
  return (
    <header className={classNames('web-c-blue-line-section-header', { first })}>
      <h2>
        {titleIcon && <Image src={titleIcon} />}
        {title}
      </h2>
      {headerRight && headerRight}
    </header>
  )
}

interface Props {
  title?: string
  titleIcon?: string
  className?: string
  children: ReactNode
  headerRight?: ReactNode
  hide?: boolean
  web?: boolean
}

const BlueLineSection: FC<Props> = ({
  title,
  titleIcon,
  className,
  children,
  headerRight,
  hide,
  web = true
}) => {
  return (
    <section className={classNames('web-c-blue-line-section', { hide, web })}>
      <BlueLineSectionHeader title={title} titleIcon={titleIcon} headerRight={headerRight} first />
      <main className={classNames('web-c-blue-line-section-main', className)}>{children}</main>
    </section>
  )
}

export default BlueLineSection
