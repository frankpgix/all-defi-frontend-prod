import React, { FC } from 'react'
import ContentLoader from 'react-content-loader'
import Image from '@@/common/Image'
// import Loading from '@@/common/Loading'

export const TableLoading: FC = () => {
  return (
    <div className="web">
      <ContentLoader
        width={1200}
        height={302}
        viewBox="0 0 1200 302"
        backgroundColor="#eaeced"
        foregroundColor="#ffffff"
      >
        <rect x="0" y="0" rx="3" ry="3" width="1200" height="10" />
        <rect x="0" y="0" rx="3" ry="3" width="100" height="40" />
        <rect x="275" y="0" rx="3" ry="3" width="100" height="40" />
        <rect x="550" y="0" rx="3" ry="3" width="100" height="40" />
        <rect x="825" y="0" rx="3" ry="3" width="100" height="40" />
        <rect x="1100" y="0" rx="3" ry="3" width="100" height="40" />
        <rect x="0" y="40" rx="3" ry="3" width="1200" height="10" />
        <rect x="0" y="0" rx="3" ry="3" width="2" height="302" />
        <rect x="1198" y="0" rx="3" ry="3" width="2" height="302" />

        <rect x="80" y="65" rx="3" ry="3" width="220" height="20" />
        <rect x="350" y="65" rx="3" ry="3" width="220" height="20" />
        <rect x="630" y="65" rx="3" ry="3" width="220" height="20" />
        <rect x="900" y="65" rx="3" ry="3" width="220" height="20" />
        <rect x="0" y="100" rx="3" ry="3" width="1200" height="2" />

        <rect x="80" y="115" rx="3" ry="3" width="220" height="20" />
        <rect x="350" y="115" rx="3" ry="3" width="220" height="20" />
        <rect x="630" y="115" rx="3" ry="3" width="220" height="20" />
        <rect x="900" y="115" rx="3" ry="3" width="220" height="20" />
        <rect x="0" y="150" rx="3" ry="3" width="1200" height="2" />

        <rect x="80" y="165" rx="3" ry="3" width="220" height="20" />
        <rect x="350" y="165" rx="3" ry="3" width="220" height="20" />
        <rect x="630" y="165" rx="3" ry="3" width="220" height="20" />
        <rect x="900" y="165" rx="3" ry="3" width="220" height="20" />
        <rect x="0" y="200" rx="3" ry="3" width="1200" height="2" />

        <rect x="80" y="215" rx="3" ry="3" width="220" height="20" />
        <rect x="350" y="215" rx="3" ry="3" width="220" height="20" />
        <rect x="630" y="215" rx="3" ry="3" width="220" height="20" />
        <rect x="900" y="215" rx="3" ry="3" width="220" height="20" />
        <rect x="0" y="250" rx="3" ry="3" width="1200" height="2" />

        <rect x="80" y="265" rx="3" ry="3" width="220" height="20" />
        <rect x="350" y="265" rx="3" ry="3" width="220" height="20" />
        <rect x="630" y="265" rx="3" ry="3" width="220" height="20" />
        <rect x="900" y="265" rx="3" ry="3" width="220" height="20" />
        <rect x="0" y="300" rx="3" ry="3" width="1200" height="2" />
      </ContentLoader>
    </div>
    // <div className="c-table-empty">
    //   <Loading show type="section" />
    //   <p>Loading</p>
    // </div>
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
