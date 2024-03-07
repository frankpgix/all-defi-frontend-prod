import { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useRequest } from 'ahooks'

import { useProfile } from '@/hooks/useProfile'

import FundPool from '@/class/FundPool'
import FundReader from '@/class/FundReader'

import {
  FundBaseProps,
  FundBaseDefault,
  FundDetailProps,
  FundDetailDefault,
  FundUserDataProps,
  FundUserDataDefault,
  ShareCompositionProps,
  ShareCompositionDefault
} from '@/class/help'

import Alert from '@@/common/Alert'
import Blank from '@@/common/Blank'

import Dashboard from './c/Dashboard'
import FundStatus from './c/FundStatus'
import Portfolio from './c/Portfolio'
import Bench from './c/Bench'
import RoeHistory from './c/RoeHistory'

const Detail: FC = () => {
  const { signer, account: address } = useProfile()
  const { fundAddress = '' } = useParams()

  const { getFundBase, getSupportedDerivatives } = FundPool
  const { getFundDetail, getFundUserDetail, getShareComposition } = FundReader

  const { data: fundBase, loading: fundBaseLoading } = useRequest(() => getFundBase(fundAddress), {
    refreshDeps: [fundAddress]
  })

  const { data: derivatives } = useRequest(() => getSupportedDerivatives(fundAddress), {
    refreshDeps: [fundAddress]
  })
  // console.log('fundBase', fundBase)
  const {
    data: fundDetail,
    loading: fundDetailLoading,
    run: reGetFundDetail
  } = useRequest(() => getFundDetail(fundAddress), { refreshDeps: [fundAddress] })

  const {
    data: fundUserDetail,
    loading: fundUserDetailLoading,
    run: reGetFundUserDetail
  } = useRequest(() => getFundUserDetail(fundAddress, address, signer), {
    refreshDeps: [fundAddress, address, signer]
  })

  const {
    data: shareData,
    loading: shareDataLoading,
    run: reGetshareData
  } = useRequest(() => getShareComposition(fundAddress, address, signer), {
    refreshDeps: [fundAddress, address, signer]
  })

  const getData = async () => {
    await reGetFundDetail()
    await reGetFundUserDetail()
    await reGetshareData()
  }

  const loading = useMemo(
    () => fundBaseLoading || fundDetailLoading || fundUserDetailLoading || shareDataLoading,
    [fundBaseLoading, fundDetailLoading, fundUserDetailLoading, shareDataLoading]
  )

  const base: FundBaseProps = useMemo(() => fundBase ?? FundBaseDefault, [fundBase])
  const data: FundDetailProps = useMemo(() => fundDetail ?? FundDetailDefault, [fundDetail])
  const userData: FundUserDataProps = useMemo(
    () => fundUserDetail ?? FundUserDataDefault,
    [fundUserDetail]
  )
  const share: ShareCompositionProps = useMemo(
    () => shareData ?? ShareCompositionDefault,
    [shareData]
  )
  // console.log(base, 'base')
  return (
    <>
      {!loading && data.status === 6 && (
        <div className="web">
          <Alert show type="error">
            {base.name} has submitted an exit application to the platform. If approved, the vault
            will cease operations at any time.
          </Alert>
          <Blank />
        </div>
      )}
      <Dashboard
        base={base}
        fundAddress={fundAddress}
        data={data}
        loading={loading}
        derivatives={derivatives ? derivatives : []}
      />
      <RoeHistory fundAddress={fundAddress} />
      <FundStatus base={base} data={data} loading={loading} />
      <Portfolio base={base} fundAddress={fundAddress} />
      <Bench userData={userData} data={data} share={share} loading={loading} getData={getData} />
    </>
  )
}

export default Detail
