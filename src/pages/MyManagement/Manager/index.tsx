import React, { FC, useEffect, useCallback, useState } from 'react'

// import { useTokensData } from '@/store/tokens/hooks'
import FundReader from '@/class/FundReader'
import { useProfile } from '@/hooks/useProfile'
// import { FundDetailProps } from '@/class/tool'
import Loading from '@@/common/Loading'
import NoInvest from './NoInvest'
import Main from './Main'
import Button from '@@/common/Button'

const Investment: FC = () => {
  const { getManagerFundList } = FundReader
  const { account: address } = useProfile()

  const [loading, setLoading] = useState<boolean>(false)
  const [isInvest, setIsInvest] = useState<boolean>(false)

  const getData = useCallback(async () => {
    if (address) {
      setLoading(true)
      const res = await getManagerFundList(address)
      // console.log(res, 222)
      if (res && res.length) setIsInvest(true)
      setLoading(false)
    }
  }, [address]) // eslint-disable-line

  useEffect(() => void getData(), [getData])

  return (
    <div className="web-manage">
      <h2>
        <span>Strategy Management</span>
        {!loading && (
          <Button to="/manage/manager/create" size="mini">
            create fund
          </Button>
        )}
      </h2>
      <Loading type="section" show={loading} height="400px" />
      {!loading && (!isInvest ? <NoInvest /> : <Main />)}
    </div>
  )
}

export default Investment
