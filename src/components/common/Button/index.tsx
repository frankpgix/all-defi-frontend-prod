import { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import classNames from 'classnames'

import Image from '@/components/common/Image'

export interface ButtonProps {
  className?: string
  size?: 'default' | 'mini' | 'medium' | 'icon' | 'tiny'
  to?: string
  loading?: boolean
  outline?: boolean
  text?: boolean
  white?: boolean
  orange?: boolean
  icon?: string
  gradient?: boolean
  disabled?: boolean
  round?: boolean
  full?: boolean
  nohand?: boolean
  onClick?: (e: any) => void
  children?: ReactNode
}

const Button: FC<ButtonProps> = ({
  to,
  children,
  size,
  disabled,
  outline,
  loading,
  text,
  white,
  orange,
  gradient,
  className,
  onClick,
  full,
  icon,
  round,
  nohand
}) => {
  const navigate = useNavigate()

  const handleClick = (e: any): void => {
    if (!disabled && !loading) {
      if (to) {
        ;/^https?:\/\//.test(to ?? '') ? window.open(to) : navigate(to)
      } else {
        onClick?.(e)
      }
    }
  }
  return (
    <button
      className={classNames(className, 'web-button', `web-button-size-${size}`, {
        gradient,
        disabled,
        loading,
        white,
        outline,
        full,
        text,
        round,
        orange,
        nohand
      })}
      disabled={disabled}
      onClick={handleClick}
    >
      {icon ? <Image src={icon} /> : children}
    </button>
  )
}

Button.defaultProps = {
  loading: false,
  size: 'default',
  disabled: false
}

export default Button
