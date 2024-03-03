import React, { FC, useMemo } from 'react'

import { useGetUserFundList, useUserFundList } from '@/hooks/useFund'

import NoInvest from './NoInvest'
import Main from './Main'

const Investment: FC = () => {
  useGetUserFundList()
  const { loading, fundList, getData } = useUserFundList()
  // console.log(loading)
  const isInvest = useMemo(() => fundList.length === 0 && !loading, [fundList, loading])

  return (
    <div className="web-manage">
      <h2>Allocation Management</h2>
      {isInvest ? <NoInvest /> : <Main loading={loading} getData={getData} data={fundList} />}
    </div>
  )
}

export default Investment
