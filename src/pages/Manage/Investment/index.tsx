import React, { FC, useMemo } from 'react'

import { useUserDetailList } from '@/hooks/useFundReader'
import { useStoreProfile } from '@/store/useProfile'

// import Button from '@@/common/Button'
import Loading from '@@/common/Loading'
import NoInvest from './NoInvest'
import Main from './Main'

const Investment: FC = () => {
  const { address } = useStoreProfile()
  const { data: userFundList, isLoading: loading, refetch: getData } = useUserDetailList(address)

  const isInvest = useMemo(() => userFundList.length > 0, [userFundList])
  return (
    <div className="web-manage">
      <h2>Investment Management</h2>
      <Loading type="section" show={loading} height="400px" />
      {!loading &&
        (!isInvest ? (
          <NoInvest />
        ) : (
          <Main loading={loading} getData={getData} data={userFundList} />
        ))}
    </div>
  )
}

export default Investment
