import { FC, ReactNode } from 'react'

import classNames from 'classnames'

import { css } from '@emotion/css'

import { useMobile } from '@/hooks/useMobile'
import { px2rem, toType } from '@/utils/tools'

// 自定义盒子 Tag
export const CustomBox = (props: any) => {
  const { tag: Box = 'div', ...otherProps } = props
  return <Box {...otherProps} />
}

interface GridBoxProps {
  id?: string
  tag?: string
  col?: number | string
  gap?: number | string
  webSection?: boolean // 引用 .web
  webFullSection?: boolean // 引用 .web_
  full?: boolean // 设置宽度为 100%
  children?: ReactNode
  className?: string
  center?: string
  onClick?: () => void
}

export const GridBox: FC<GridBoxProps> = ({
  id,
  tag,
  col,
  gap,
  children,
  center,
  className,
  webSection,
  webFullSection,
  full,
  onClick
}) => {
  const { mobile } = useMobile()
  col = col ?? 1
  const style = css({
    display: 'grid',
    alignItems: center ? 'center' : 'start',
    gridTemplateColumns: toType(col) === 'string' ? col : `repeat(${col ?? 1}, 1fr)`,
    gap: toType(gap) === 'string' ? gap : mobile ? px2rem(gap ?? 0) : `${gap ?? 0}px`,
    flex: full ? '1' : 'inherit'
  })

  return (
    <CustomBox
      id={id}
      tag={tag}
      className={classNames('c-grid-box', style, { web: webSection, web_: webFullSection, full }, className)}
      onClick={onClick}
    >
      {children}
    </CustomBox>
  )
}

interface FlexBoxProps {
  id?: string
  tag?: string
  disperses?: boolean // 横向分散展示 justify-content: space-between;
  center?: boolean // 纵向居中 align-items: center;
  right?: boolean // 纵向居中 justify-content: flex-end;
  vertical?: boolean // 是否竖向 flex-flow: column;
  verticalCenter?: boolean // 竖向时，视觉纵向居中 justify-content: center;
  webSection?: boolean // 引用 .web
  webFullSection?: boolean // 引用 .web_
  gap?: number
  children?: ReactNode
  className?: string
  onClick?: () => void
}

export const FlexBox: FC<FlexBoxProps> = ({
  id,
  tag,
  disperses,
  center,
  right,
  vertical,
  verticalCenter,
  webSection,
  webFullSection,
  gap,
  children,
  className,
  onClick
}) => {
  const { mobile } = useMobile()
  const style = css`
    display: flex;
    ${disperses || verticalCenter || right
      ? `justify-content: ${disperses ? 'space-between' : right ? 'flex-end' : 'center'};`
      : ''}
    ${center || right ? 'align-items: center;' : ''}
    ${vertical ? 'flex-flow: column;' : ''}
    gap: ${mobile ? px2rem(gap ?? 0) : `${gap ?? 0}px`};
  `

  return (
    <CustomBox
      tag={tag}
      id={id}
      className={classNames('c-flex-box', style, { web: webSection, web_: webFullSection }, className)}
      onClick={onClick}
    >
      {children}
    </CustomBox>
  )
}

interface ColorBoxProps {
  className?: string
  children?: ReactNode
  type?: 'default' | 'ring'
  hideColor?: boolean
}

export const ColorBox: FC<ColorBoxProps> = ({ className, children, type = 'default', hideColor }) => {
  if (hideColor) {
    return <div className={classNames(className)}>{children}</div>
  }
  return (
    <div className={classNames('c-color-box-layout', type)}>
      <div className={classNames('c-color-box', className)}>{children}</div>
    </div>
  )
}

interface ToggleBoxProps {
  show: boolean
  children?: ReactNode
  className?: string
}

export const ToggleBox: FC<ToggleBoxProps> = ({ children, show, className }) => {
  return <div className={classNames('c-toggle-box', className, { show })}>{children}</div>
}
