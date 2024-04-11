import { FC, ImgHTMLAttributes, useMemo } from 'react'

import classNames from 'classnames'

import { STATIC_RESOURCES_URL } from '@/config'
import { isOuterLink } from '@/utils/tools'

interface ImageProps extends Partial<ImgHTMLAttributes<HTMLElement>> {
  cover?: boolean
}

export const Image: FC<ImageProps> = ({ cover, src, className, ...props }) => {
  const memoSrc = useMemo(() => (isOuterLink(src) ? src : `${STATIC_RESOURCES_URL}${src}`), [src])

  if (cover) {
    return (
      <div
        className={classNames('c-image', className)}
        style={{ backgroundImage: `url(${memoSrc})` }}
      ></div>
    )
  }
  return <img className={className} src={memoSrc} {...props} alt="" />
}

export default Image

interface IconProps extends ImageProps {
  size?: 'large' | 'default' | 'small' | 'mini' | 'tiny' | 'super'
  name?: string
  online?: boolean
}

enum IconConfig {
  eth = 'symbol/eth.svg',
  bnb = 'symbol/bnb.svg',
  usdc = 'symbol/usdc.svg',
  usdt = 'symbol/usdt.svg',
  wbtc = 'symbol/wbtc.svg',
  salltoken = 'symbol/sall.svg',
  alltoken = 'symbol/all.svg',
  acusdc = 'symbol/acusdc.svg',
  unknown = 'symbol/unknown.svg'
}

export const Icon: FC<IconProps> = (props) => {
  const { size, online } = props

  const src = useMemo(() => {
    const name = props.name?.toLocaleLowerCase()
    return name && !props.src && name in IconConfig
      ? IconConfig[name as keyof typeof IconConfig]
      : props.src
  }, [props.name])

  return (
    <Image
      {...props}
      src={src}
      className={classNames('c-icon', `c-icon-size-${size ?? 'default'}`, {
        online
      })}
    />
  )
}
