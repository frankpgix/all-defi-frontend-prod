import React, { FC, useMemo } from 'react'
import ContentLoader from 'react-content-loader'

import { useManageFundList, useGetManageFundList } from '@/hooks/useFund'
import { useProfile } from '@/hooks/useProfile'

import NoInvest from './NoInvest'
import Main from './Main'
import Button from '@@/common/Button'
import Popper from '@@/common/Popper'

const Manager: FC = () => {
  useGetManageFundList()
  const { loading, manageFundList } = useManageFundList()
  const { maxFundLimit } = useProfile()

  const isInvest = useMemo(
    () => manageFundList?.length === 0 && !loading,
    [manageFundList, loading]
  )

  return (
    <div className="web-manage">
      <h2>
        <span>Strategy Management</span>

        {loading ? (
          <ContentLoader
            width={160}
            height={40}
            viewBox="0 0 160 40"
            backgroundColor="#eaeced"
            foregroundColor="#ffffff"
          >
            <rect x="0" y="0" rx="20" ry="20" width="160" height="40" />
          </ContentLoader>
        ) : maxFundLimit === manageFundList?.length ? (
          <Button to="/manage/manager/create" size="mini" disabled>
            <Popper content="The number of funds you have created has reached the maximum limit">
              CREATE FUND
            </Popper>
          </Button>
        ) : (
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
