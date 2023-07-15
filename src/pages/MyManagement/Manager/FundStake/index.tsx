import React, { FC, useState, useCallback, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

// import FundManager, { FundStakeProps } from '@/class/FundManager'
import AllProtocol from '@/class/AllProtocol'
import FundReader from '@/class/FundReader'

import { FundDetailProps, FundDetailDefault, FundStakeProps, FundStakeDefault } from '@/class/help'
import { getTokenByAddress } from '@/config/tokens'
import { useProfile } from '@/hooks/useProfile'

import Blank from '@@/common/Blank'
import Loading from '@@/common/Loading'
import Feature from './c/Feature'
import Stake from './c/Stake'
import Record from './c/Record'

const FundStake: FC = () => {
  const { calcAUMLimit, getFundStake } = AllProtocol
  const { getFundDetail } = FundReader
  const navigate = useNavigate()

  const { fundAddress = '', direction = 'increase' } = useParams()
  const { signer } = useProfile()

  const [stakeData, setStakeData] = useState<FundStakeProps>(FundStakeDefault)
  const [fundData, setFundData] = useState<FundDetailProps>(FundDetailDefault)
  const [multiple, setMultiple] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const getData = useCallback(async () => {
    if (fundAddress && signer) {
      setLoading(true)
      const stakeData = await getFundStake(fundAddress ?? '', signer)
      setStakeData(stakeData)
      // console.log(stakeData, 22222)
      const fundData = await getFundDetail(fundAddress)
      // console.log(1111, fundData)
      if (fundData) {
        setFundData(fundData)
        const multiple = await calcAUMLimit(fundData.baseToken)
        setMultiple(multiple)
      }
      setLoading(false)
    }
  }, [fundAddress, signer]) // eslint-disable-line

  const baseToken = useMemo(() => getTokenByAddress(fundData.baseToken), [fundData.baseToken])

  useEffect(() => void getData(), [getData])
  useEffect(() => {
    if (!['increase', 'reduce'].includes(direction)) {
      navigate(`/manage/manager/fund/${fundAddress}`)
    }
  }, [direction, fundAddress]) // eslint-disable-line

  return (
    <div className="web-manage">
      <h2>{direction} Fund Max AUM Limit</h2>
      <Feature direction={direction} />
      <Stake
        direction={direction}
        fundData={fundData}
        stakeData={stakeData}
        fundAddress={fundAddress}
        multiple={multiple}
        getData={getData}
      />
      <Blank />
      <Record data={stakeData} fundData={fundData} baseToken={baseToken} loading={loading} multiple={multiple} />
      <Loading type="float" show={loading} />
    </div>
  )
}

export default FundStake
