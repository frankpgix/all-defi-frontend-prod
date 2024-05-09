import { FC, useMemo } from 'react'

// import { useGetUserFundList, useUserFundList } from '@/hooks/useFund'
import { useUserVaultList } from '@/hooks/Contracts/useVaultReader'

import Main from './Main'
import NoInvest from './NoInvest'

const Investment: FC = () => {
  // useGetUserFundList()
  // const { loading, fundList, getData } = useUserFundList()
  // // console.log(loading)
  const { data: fundList, isLoading, refetch } = useUserVaultList()
  const isInvest = useMemo(() => fundList.length === 0 && !isLoading, [fundList, isLoading])
  return (
    <div className="web-manage">
      <h2>Staking Management</h2>
      {isInvest ? <NoInvest /> : <Main loading={isLoading} getData={refetch} data={fundList} />}
    </div>
  )
}

export default Investment
