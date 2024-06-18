import { FC, useMemo } from 'react'
import ContentLoader from 'react-content-loader'

import { useVaultHashList } from '@/hooks/Contracts/useVaultReader'
import { useProfile } from '@/hooks/useProfile'
import { useGetManageVaultList, useManageVaultListHook } from '@/hooks/useVaultList'

import Cache from '@/utils/cache'
import Button from '@@/common/Button'
import Popper from '@@/common/Popper'

import Main from './Main'
// import { useManageVaultList } from '@/hooks/useVaultReader'
import NoInvest from './NoInvest'

const Manager: FC = () => {
  useGetManageVaultList()
  const { loading, manageVaultList } = useManageVaultListHook()
  const { maxFundLimit } = useProfile()
  // const { data: manageFundList, isLoading: loading } = useManageVaultList()
  const a = useVaultHashList()
  console.log(a)
  const isInvest = useMemo(
    () => manageVaultList?.length === 0 && !loading,
    [manageVaultList, loading]
  )
  // console.log(loading, manageVaultList)
  const isCacheCreate =
    Cache.get('CreateFundStep1Temp') ||
    Cache.get('CreateFundStep2Temp') ||
    Cache.get('CreateFundStep3Temp')

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
        ) : maxFundLimit === manageVaultList?.length ? (
          <Button to="/manage/manager/create" size="mini" disabled>
            <Popper content="The number of vaults you have created has reached the maximum limit">
              CREATE VAULTS
            </Popper>
          </Button>
        ) : (
          <Button to="/manage/manager/create" size="mini">
            {isCacheCreate ? 'UNFINISHED EDITS' : 'CREATE VAULTS'}
          </Button>
        )}
      </h2>
      {isInvest ? <NoInvest /> : <Main />}
    </div>
  )
}

export default Manager
