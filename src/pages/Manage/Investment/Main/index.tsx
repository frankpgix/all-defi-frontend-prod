import React, { FC } from 'react'

import { FundUserListDataProps } from '@/hooks/help'

import Loading from '@@/common/Loading'

// import Dashboard from './c/Dashboard'
import Count from './c/Count'
import FundDetails from './c/FundDetails'
// import ContributionManagement from '@/pages/Buy/c/ContributionManagement'

interface Props {
  loading: boolean
  getData: () => void
  data: FundUserListDataProps[]
}

const Main: FC<Props> = ({ loading, getData, data }) => {
  // console.log(data, 2222)
  return (
    <div className="web-manage">
      <Loading show={loading} type={'fixed'} />
      <Count data={data} />
      <FundDetails data={data} callback={getData} />
    </div>
  )
}

export default Main
// <Dashboard data={data} />
