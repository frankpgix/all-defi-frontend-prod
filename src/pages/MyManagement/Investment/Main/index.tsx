import React, { FC } from 'react'
import ContentLoader from 'react-content-loader'

import { FundUserListDataProps } from '@/class/help'

// import Loading from '@@/common/Loading'

// import Dashboard from './c/Dashboard'
import Count from './c/Count'
import FundDetails from './c/FundDetails'
// import ContributionManagement from '@/pages/Buy/c/ContributionManagement'

interface Props {
  loading: boolean
  getData: (update: boolean) => void
  data: FundUserListDataProps[]
}

const Main: FC<Props> = ({ loading, getData, data }) => {
  if (loading) return <CountLoading />
  // console.log(data, 2222)
  return (
    <div className="web-manage">
      <Count data={data} loading={loading} />
      <FundDetails data={data} callback={getData} />
    </div>
  )
}

export default Main
// <Dashboard data={data} />

const CountLoading = () => {
  return (
    <div className="web">
      <ContentLoader
        width={1200}
        height={800}
        viewBox="0 0 1200 800"
        backgroundColor="#eaeced"
        foregroundColor="#ffffff"
      >
        <rect x="0" y="0" rx="4" ry="4" width="600" height="430" />
        <rect x="640" y="0" rx="4" ry="4" width="200" height="50" />
        <rect x="640" y="80" rx="4" ry="4" width="520" height="2" />
        <rect x="640" y="100" rx="4" ry="4" width="200" height="40" />
        <rect x="640" y="180" rx="4" ry="4" width="260" height="110" />
        <rect x="640" y="320" rx="4" ry="4" width="260" height="110" />
        <rect x="940" y="180" rx="4" ry="4" width="260" height="110" />
        <rect x="940" y="320" rx="4" ry="4" width="260" height="110" />
        <rect x="0" y="480" rx="4" ry="4" width="260" height="40" />
        <rect x="0" y="540" rx="4" ry="4" width="1200" height="40" />
        <rect x="0" y="600" rx="4" ry="4" width="1200" height="40" />
        <rect x="0" y="660" rx="4" ry="4" width="1200" height="40" />
      </ContentLoader>
    </div>
  )
}
