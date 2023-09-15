import React, { FC, useState, useMemo, memo } from 'react'
import { useRequest } from 'ahooks'

import { useProfile } from '@/hooks/useProfile'
import { useManageFundList } from '@/hooks/useFund'
import FundFactory from '@/class/FundFactory'

const Chart: FC = () => {
  const { signer } = useProfile()
  const { manageFundList = [] } = useManageFundList()
  const fundAddressList = useMemo(
    () => manageFundList.map((item) => item.address),
    [manageFundList]
  )
  const { FundVerified } = FundFactory

  const a = useRequest(async () => FundVerified(fundAddressList[0] ?? '', 0, signer))
  console.log(a)
  return <section></section>
}

export default memo(Chart)
