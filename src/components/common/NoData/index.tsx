import { FC, useMemo } from 'react'
import classNames from 'classnames'
interface Props {
  show: boolean
  height?: string
  tip?: string
  small?: boolean
  mini?: boolean
  white?: boolean
}

const NoData: FC<Props> = ({ show, height, tip = 'No Data', small, mini, white }) => {
  const NoDataTsx = useMemo(
    () => (
      <div className={classNames('web-nodata', { small, mini, white })} style={{ height }}>
        <i />
        <span>{tip}</span>
      </div>
    ),
    [height, tip, small, mini, white]
  )
  if (!show) return null
  return NoDataTsx
}

NoData.defaultProps = {
  show: false,
  height: `100%`
}

export default NoData
