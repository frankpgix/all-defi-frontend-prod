import { FC, useMemo } from 'react'

// import { useVaultHashList } from '@/hooks/Contracts/useVaultReader'
import { useGetManageVaultList, useManageVaultListHook } from '@/hooks/useVaultList'

import CreateVaultButton from '@@/Vaults/CreateVaultButton'

import Main from './Main'
// import { useManageVaultList } from '@/hooks/useVaultReader'
import NoInvest from './NoInvest'

const Manager: FC = () => {
  useGetManageVaultList()
  const { loading, manageVaultList } = useManageVaultListHook()
  // const { data: manageFundList, isLoading: loading } = useManageVaultList()
  // const a = useVaultHashList()
  // console.log(a)
  const isInvest = useMemo(
    () => manageVaultList?.length === 0 && !loading,
    [manageVaultList, loading]
  )

  return (
    <div className="web-manage">
      <h2>
        <span>Strategy Management</span>
        {!isInvest && <CreateVaultButton />}
      </h2>
      {isInvest ? <NoInvest /> : <Main />}
    </div>
  )
}

export default Manager
