import React, { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'
// import { useAccount } from 'wagmi'
// import { useRequest } from 'ahooks'
//
// import FundPool from '@/class/FundPool'
// import FundReader from '@/class/FundReader'

import { useFundBaseInfo } from '@/hooks/useFundPool'
import { useFundDetail, useFundUserDetail, useShareComposition } from '@/hooks/useFundReader'
// import { useDerivativeList } from '@/hooks/useAllProtocol'

import { useStoreDerivativeList } from '@/store/useFunds'
import { useStoreProfile } from '@/store/useProfile'

import {
  FundBaseInfoProps,
  FundBaseInfoDefault,
  FundDetailProps,
  FundDetailDefault,
  FundUserDataProps,
  FundUserDataDefault,
  ShareCompositionProps,
  ShareCompositionDefault
} from '@/hooks/help'
//
import Dashboard from './c/Dashboard'
import FundStatus from './c/FundStatus'
import Portfolio from './c/Portfolio'
import Bench from './c/Bench'

const Detail: FC = () => {
  // const { data: signer } = useSigner()
  const address = useStoreProfile((state) => state.address)
  const allDerivatives = useStoreDerivativeList((state) => state.derivativeList)
  const { fundAddress = '' } = useParams()
  const { data: fundBase, isLoading: fundBaseLoading } = useFundBaseInfo(fundAddress)
  const {
    data: fundDetail,
    isLoading: fundDetailLoading,
    refetch: reGetFundDetail
  } = useFundDetail(fundAddress)
  const {
    data: fundUserDetail,
    isLoading: fundUserDetailLoading,
    refetch: reGetFundUserDetail
  } = useFundUserDetail(fundAddress, address)
  const {
    data: shareData,
    isLoading: shareDataLoading,
    refetch: reGetshareData
  } = useShareComposition(fundAddress, address)

  const loading = useMemo(
    () => fundBaseLoading || fundDetailLoading || fundUserDetailLoading || shareDataLoading,
    [fundBaseLoading, fundDetailLoading, fundUserDetailLoading, shareDataLoading]
  )
  //
  const base: FundBaseInfoProps = useMemo(() => fundBase ?? FundBaseInfoDefault, [fundBase])
  const data: FundDetailProps = useMemo(() => fundDetail ?? FundDetailDefault, [fundDetail])
  const userData: FundUserDataProps = useMemo(
    () => fundUserDetail ?? FundUserDataDefault,
    [fundUserDetail]
  )
  const share: ShareCompositionProps = useMemo(
    () => shareData ?? ShareCompositionDefault,
    [shareData]
  )

  const getData = async () => {
    await reGetFundDetail()
    await reGetFundUserDetail()
    await reGetshareData()
  }
  // console.log(base)

  const derivatives = useMemo(() => {
    return base.derivatives.map((item: string) => {
      const derivative = allDerivatives.find(({ value }) => item === value)
      return derivative ? derivative.name : ''
    })
  }, [allDerivatives, base.derivatives])
  //

  // console.log(base, 'base')
  return (
    <>
      <Dashboard
        base={base}
        fundAddress={fundAddress}
        data={data}
        loading={loading}
        derivatives={derivatives ? derivatives : []}
      />
      <FundStatus base={base} data={data} loading={loading} />
      <Portfolio base={base} fundAddress={fundAddress} />
      <Bench userData={userData} data={data} share={share} loading={loading} getData={getData} />
    </>
  )
}

export default Detail
