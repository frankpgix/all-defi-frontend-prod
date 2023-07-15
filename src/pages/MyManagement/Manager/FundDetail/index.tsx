import React, { FC, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'

import FundPool from '@/class/FundPool'
import FundReader from '@/class/FundReader'
import AllProtocol from '@/class/AllProtocol'
import {
  FundBaseProps,
  FundBaseDefault,
  FundDetailProps,
  FundDetailDefault,
  FundStakeProps,
  FundStakeDefault,
  FundBreachDetailProps,
  FundBreachDetailDefault
} from '@/class/help'

import { useProfile } from '@/hooks/useProfile'
import Blank from '@@/common/Blank'

import ManageDetail from './c/ManageDetail'
import DataTab from './c/DataTab'
import Dashboard from './c/Dashboard'

const FundDetail: FC = () => {
  const { fundAddress = '' } = useParams()

  const { signer } = useProfile()

  const { getFundBase } = FundPool
  const { getFundDetail, getFundBreachDetail } = FundReader
  const { getFundStake } = AllProtocol

  const [base, setBase] = useState<FundBaseProps>(FundBaseDefault)
  const [data, setData] = useState<FundDetailProps>(FundDetailDefault)
  const [stake, setStake] = useState<FundStakeProps>(FundStakeDefault)
  const [breach, setBreach] = useState<FundBreachDetailProps>(FundBreachDetailDefault)

  const getData = useCallback(async () => {
    if (fundAddress && signer) {
      const base = await getFundBase(fundAddress)
      if (base) setBase(base)

      const data = await getFundDetail(fundAddress)
      if (data) setData(data)
      const stake = await getFundStake(fundAddress, signer)
      if (stake) setStake(stake)

      const breach = await getFundBreachDetail(fundAddress)
      if (breach) setBreach(breach)
      // console.log(breach, 3333)
    }
  }, [fundAddress, signer]) // eslint-disable-line

  useEffect(() => void getData(), [getData])

  return (
    <div className="web-manage">
      <h2>{base.name}</h2>
      <Dashboard fundAddress={fundAddress} data={data} base={base} />
      <Blank />
      <ManageDetail fundAddress={fundAddress} base={base} data={data} stake={stake} breach={breach} getData={getData} />

      <DataTab fundAddress={fundAddress} />
    </div>
  )
}

export default FundDetail
