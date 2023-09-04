import React, { FC, useMemo } from 'react'

import { useManageFundList, useGetManageFundList } from '@/hooks/useFund'

import NoInvest from './NoInvest'
import Main from './Main'
import Button from '@@/common/Button'

const Manager: FC = () => {
  useGetManageFundList()
  const { loading, manageFundList } = useManageFundList()

  const isInvest = useMemo(
    () => manageFundList?.length === 0 && !loading,
    [manageFundList, loading]
  )
  return (
    <div className="web-manage">
      <h2>
        <span>Strategy Management</span>
        {!loading && (
          <Button to="/manage/manager/create" size="mini">
            CREATE FUND
          </Button>
        )}
      </h2>
      {isInvest ? <NoInvest /> : <Main />}
    </div>
  )
}

export default Manager
