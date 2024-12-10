import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react'

import { useClickAway } from 'ahooks'
import classNames from 'classnames'

// import styled from 'styled-components'
import { css } from '@emotion/css'

import { useMobile } from '@/hooks/useMobile'

import { calcCssNumber, px2rem } from '@/utils/tools'
import ALink from '@@/core/ALink'
import { FlexBox } from '@@/core/Box'
import Image from '@@/core/Image'

interface DropdownItemProps {
  to?: string
  className?: string
  classNamePre?: string
  children: ReactNode | string
  onClick?: () => void
  icon?: string
  disabled?: boolean
  linkArrow?: boolean
}

export const DropdownItem: FC<DropdownItemProps> = ({
  to,
  className,
  classNamePre = 'c-dropdown',
  children,
  onClick,
  icon,
  disabled,
  linkArrow
}) => {
  const memoIcon = useMemo(
    () =>
      icon ? (
        <Image
          style={{ borderRadius: '100%' }}
          className={`${classNamePre}-menu-item-icon`}
          src={icon}
        />
      ) : null,
    [icon]
  )
  const memoLinkIcon = useMemo(
    () =>
      linkArrow ? (
        <Image className={`${classNamePre}-menu-item-link-arrow`} src="icon/link-arrow.svg" />
      ) : null,
    [linkArrow]
  )
  const itemClass = classNames(`${classNamePre}-menu-item`, className, {
    disabled
  })
  const onItemClick = (e: any) => {
    if (!disabled) onClick?.()
    else e.stopPropagation()
  }
  if (to && !disabled) {
    return (
      <ALink onClick={() => onClick?.()} className={itemClass} to={to}>
        {memoIcon}
        {children}
        {memoLinkIcon}
      </ALink>
    )
  }
  return (
    <div className={itemClass} onClick={onItemClick}>
      {memoIcon}
      {children}
      {memoLinkIcon}
    </div>
  )
}

export const DropdownLine: FC = () => <div className="c-dropdown-line" />

interface DropdownProps {
  type?: 'button' | 'text'
  label?: string
  placeholder?: string
  icon?: string
  size?: 'default' | 'small'
  className?: string
  classNamePre?: string
  children?: ReactNode | string
  menuWidth?: number | string
  width?: number | string
  direction?: 'left' | 'right'
  input?: boolean
  disabled?: boolean
  extra?: any
}

export const Dropdown: FC<DropdownProps> = ({
  extra,
  type = 'text',
  label = '',
  icon,
  size = 'default',
  className,
  classNamePre = 'c-dropdown',
  children,
  menuWidth = 'auto',
  width = 'auto',
  direction = 'left',
  input,
  disabled = false
}) => {
  const [menuShow, setMenuShow] = useState(false)
  const [menuHeight, setMenuHeight] = useState(0)
  const ref = useRef(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const { mobile } = useMobile()

  const hideMenu = () => setMenuShow(false)
  useClickAway(hideMenu, ref)

  useEffect(() => {
    const innerHeight = menuRef.current?.offsetHeight ?? 1000
    setMenuHeight(innerHeight > 300 ? 300 : innerHeight)
  }, [menuRef, children])

  const labelCss = css`
    width: ${mobile ? px2rem(width) : calcCssNumber(width)};
  `
  const menuCss = css`
    width: ${mobile ? px2rem(menuWidth) : calcCssNumber(menuWidth)};
    max-height: ${menuShow ? `${menuHeight}px` : '0'};
    ${direction === 'left' ? 'left: 0;' : ''}
    ${direction === 'right' ? 'right: 0;' : ''}
  `
  return (
    <div
      ref={ref}
      className={classNames(
        classNamePre,
        `${classNamePre}-type-${type}`,
        `${classNamePre}-size-${size}`,
        className,
        {
          show: menuShow,
          input,
          disabled
        }
      )}
    >
      <button
        className={classNames(`${classNamePre}-label`, labelCss)}
        onClick={() => {
          if (label && !disabled) setMenuShow(!menuShow)
        }}
      >
        <DropdownLabel icon={icon} label={label} />
        {label && <span className={`${classNamePre}-label-arrow`} />}
        {extra}
      </button>
      <div className={classNames(`${classNamePre}-menu`, menuCss)} onClick={hideMenu}>
        <div ref={menuRef} className={`${classNamePre}-menu-inner`}>
          {children}
        </div>
      </div>
    </div>
  )
}

export interface DropdownSelectItemProps {
  extra?: ReactNode
  label?: string
  placeholder?: string
  value?: any
  disabled?: boolean
  line?: boolean
  icon?: string
}

interface DropdownSelectProps extends DropdownProps {
  options: DropdownSelectItemProps[]
  value?: DropdownSelectItemProps | null
  extra?: any
  disabled?: boolean
  onChange?: (data: DropdownSelectItemProps) => void
}

interface DropdownLabelProps {
  label: string
  icon?: string
}

export const DropdownLabel: FC<DropdownLabelProps> = ({ label, icon }) => {
  return (
    <FlexBox center gap={10}>
      {icon && <Image style={{ borderRadius: '100%' }} src={icon} />}
      {label}
    </FlexBox>
  )
}

export const DropdownSelect: FC<DropdownSelectProps> = ({
  extra,
  label,
  icon,
  size,
  className,
  menuWidth,
  width,
  options,
  onChange,
  direction,
  type,
  value,
  input,
  disabled
}) => {
  const [currValue, setCurrValue] = useState<DropdownSelectItemProps | null>(null)
  const changeFunc = (data: DropdownSelectItemProps) => onChange?.(data)
  useEffect(() => {
    if (value) setCurrValue(value)
  }, [value])

  return (
    <Dropdown
      label={currValue?.label ?? label}
      icon={currValue?.icon ?? icon}
      extra={currValue?.extra ?? extra}
      className={classNames(className)}
      width={width}
      size={size}
      menuWidth={menuWidth}
      type={type}
      direction={direction}
      input={input}
      disabled={disabled}
    >
      {options.map((item, index) => {
        if (item.line) return <DropdownLine key={index} />
        if (item.label && item.value) {
          return (
            <DropdownItem
              icon={item.icon}
              className={classNames({
                active: item.value === currValue?.value
              })}
              onClick={() => changeFunc(item)}
              disabled={item.disabled}
              key={index}
            >
              <label>{item.label}</label>
              {item.extra}
            </DropdownItem>
          )
        }
        return null
      })}
    </Dropdown>
  )
}

interface DropdownMenuItemProps {
  label?: string
  key?: string | number
  disabled?: boolean
  line?: boolean
  icon?: string
}

interface DropdownMenuProps extends DropdownProps {
  options: DropdownMenuItemProps[]
  onClick?: (key?: string | number) => void
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
  label,
  icon,
  size,
  className,
  menuWidth,
  width,
  options,
  direction,
  type,
  onClick
}) => {
  // const onItemClick = (item: DropdownMenuItemProps) => {
  //   if (!item.disabled) onClick?.(item.key)
  // }
  return (
    <Dropdown
      label={label}
      icon={icon}
      className={classNames(className)}
      size={size}
      width={width}
      menuWidth={menuWidth}
      type={type}
      direction={direction}
    >
      {options.map((item, index) => {
        if (item.label && item.key) {
          return (
            <DropdownItem
              icon={item.icon}
              disabled={item.disabled}
              onClick={() => onClick?.(item.key)}
              key={index}
            >
              {item.label}
            </DropdownItem>
          )
        }
        if (item.line) return <DropdownLine key={index} />
        return null
      })}
    </Dropdown>
  )
}

export default Dropdown

export const DropdownMobileSelect: FC<DropdownSelectProps> = ({
  label,
  icon,
  className,
  menuWidth,
  options,
  onChange,
  direction,
  type,
  value,
  input
}) => {
  const [currValue, setCurrValue] = useState<DropdownSelectItemProps | null>(null)
  const changeFunc = (data: DropdownSelectItemProps) => onChange?.(data)
  useEffect(() => {
    if (value) setCurrValue(value)
  }, [value])

  return (
    <Dropdown
      label={currValue?.label ?? label}
      icon={currValue?.icon ?? icon}
      className={className}
      classNamePre="mc-dropdown"
      width="100%"
      menuWidth={menuWidth}
      type={type}
      direction={direction}
      input={input}
    >
      {options.map((item, index) => {
        if (item.line) return <DropdownLine key={index} />
        if (item.label && item.value) {
          return (
            <DropdownItem
              classNamePre="mc-dropdown"
              className={classNames({
                active: item.value === currValue?.value
              })}
              icon={item.icon}
              onClick={() => changeFunc(item)}
              disabled={item.disabled}
              key={index}
            >
              {item.label}
            </DropdownItem>
          )
        }
        return null
      })}
    </Dropdown>
  )
}
