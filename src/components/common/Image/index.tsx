import { FC, useMemo, ImgHTMLAttributes } from 'react'
import classNames from 'classnames'
import { STATIC_RESOURCES_URL } from '@/config'

interface ImageProps extends Partial<ImgHTMLAttributes<HTMLElement>> {
  cover?: boolean
}

const Image: FC<ImageProps> = ({ cover, src, className, ...props }) => {
  const memoSrc = useMemo(
    () =>
      /^https?:\/\//.test(src ?? '') || /^data:/.test(src ?? '')
        ? src
        : `${STATIC_RESOURCES_URL}${src}`,
    [src]
  )
  if (cover) {
    return (
      <div
        className={classNames('web-image', className)}
        style={{ backgroundImage: `url(${memoSrc})` }}
      ></div>
    )
  }
  return <img src={memoSrc} className={className} {...props} />
}

export default Image
