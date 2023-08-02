import React, { FC, useMemo, useState, useCallback, useEffect } from 'react'

import FundReader from '@/class/FundReader'
import { FundUserListDataProps } from '@/class/help'
import { useProfile } from '@/hooks/useProfile'

// import Button from '@@/common/Button'
// import Loading from '@@/common/Loading'
import NoInvest from './NoInvest'
import Main from './Main'

const Investment: FC = () => {
  const { signer } = useProfile()
  const { getUserFundList } = FundReader

  const [userFundList, setUserFundList] = useState<FundUserListDataProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [isInit, setIsInit] = useState<boolean>(true)
  const getData = useCallback(
    async (update: boolean) => {
      if (signer && (isInit || update)) {
        setLoading(true)
        const res = await getUserFundList(signer)
        // console.log(res, 22233)
        if (res) setUserFundList(res)
        setLoading(false)
        setIsInit(false)
      }
    },
    [signer, isInit] // eslint-disable-line
  )

  useEffect(() => void getData(false), [getData])

  const isInvest = useMemo(() => userFundList.length > 0 || loading, [userFundList, loading])
  return (
    <div className="web-manage">
      <h2>Investment Management</h2>
      {!isInvest ? <NoInvest /> : <Main loading={loading} getData={getData} data={userFundList} />}
    </div>
  )
}

export default Investment
