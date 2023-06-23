import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import Image from '@/components/common/Image'

export interface ButtonProps {
  className?: string
  size?: 'default' | 'mini' | 'medium' | 'icon'
  to?: string
  loading?: boolean
  outline?: boolean
  text?: boolean
  white?: boolean
  icon?: string
  gradient?: boolean
  disabled?: boolean
  full?: boolean
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
  gradient,
  className,
  onClick,
  full,
  icon
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
        text
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
