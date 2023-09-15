import React, { FC, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

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
import FundDialog from './c/FundDialog'

const FundDetail: FC = () => {
  const { fundAddress = '' } = useParams()

  const { signer } = useProfile()

  const { getFundBase } = FundPool
  const { getFundDetail, getFundBreachDetail } = FundReader
  const { getFundStake } = AllProtocol

  const [loading, setLoading] = useState(true)

  const [base, setBase] = useState<FundBaseProps>(FundBaseDefault)
  const [data, setData] = useState<FundDetailProps>(FundDetailDefault)
  const [stake, setStake] = useState<FundStakeProps>(FundStakeDefault)
  const [breach, setBreach] = useState<FundBreachDetailProps>(FundBreachDetailDefault)

  const getData = useCallback(async () => {
    if (fundAddress && signer) {
      setLoading(true)
      const base = await getFundBase(fundAddress)
      if (base) setBase(base)

      const data = await getFundDetail(fundAddress)
      if (data) setData(data)
      const stake = await getFundStake(fundAddress, signer)
      if (stake) setStake(stake)

      const breach = await getFundBreachDetail(fundAddress)
      if (breach) setBreach(breach)
      setLoading(false)
      // console.log(breach, 3333)
    }
  }, [fundAddress, signer]) // eslint-disable-line

  useEffect(() => void getData(), [getData])

  // if (loading) {
  //   return <FundDetailLoading />
  // }
  return (
    <div className="web-manage">
      <h2>
        {loading ? (
          <ContentLoader
            width={200}
            height={32}
            viewBox="0 0 200 32"
            backgroundColor="#eaeced"
            foregroundColor="#ffffff"
          >
            <rect x="0" y="0" rx="4" ry="4" width="200" height="30" />
          </ContentLoader>
        ) : (
          base.name
        )}
      </h2>
      <Dashboard fundAddress={fundAddress} loading={loading} data={data} base={base} />
      <Blank />
      <ManageDetail
        loading={loading}
        fundAddress={fundAddress}
        base={base}
        data={data}
        stake={stake}
        breach={breach}
        getData={getData}
      />
      <DataTab fundAddress={fundAddress} />
      <FundDialog fundAddress={fundAddress} name={base.name} />
    </div>
  )
}

export default FundDetail
