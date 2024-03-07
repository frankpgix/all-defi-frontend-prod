import { FC, useMemo } from 'react'
import classNames from 'classnames'
interface Props {
  size?: 'mini' | 'medium' | 'default' | 'large'
  height?: number | string
}
const Blank: FC<Props> = ({ size, height }) => {
  const className = useMemo(
    () => classNames('web-c-blank', size ? `web-c-blank-${size}` : ''),
    [size]
  )
  const style = height ? { height: `${height}px` } : {}
  return <div className={className} style={style} />
}

export default Blank
