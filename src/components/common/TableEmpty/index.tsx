import React, { FC } from 'react'
import Image from '@@/common/Image'
import Loading from '@@/common/Loading'

export const TableLoading: FC = () => {
  return (
    <div className="c-table-empty">
      <Loading show type="section" />
      <p>Loading</p>
    </div>
  )
}

export const TableNoData: FC<{ text?: string }> = ({ text = 'No Data Currently Available' }) => {
  return (
    <div className="c-table-empty">
      <Image src="asset/empty.png" />
      <p>{text}</p>
    </div>
  )
}

export default null
