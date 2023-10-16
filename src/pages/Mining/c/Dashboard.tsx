import React, { FC, useState, useMemo, useEffect } from 'react'
import { useRequest } from 'ahooks'
import BN from 'bignumber.js'

import tokens from '@/config/tokens'
import Reward from '@/class/Reward'
import AllProtocol from '@/class/AllProtocol'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'

import { formatNumber } from '@/utils/tools'
import { addToken2Wallet } from '@/utils/practicalMethod'
import { getALLTOKENAddress } from '@/utils/addressHelpers'
import Cache from '@/utils/cache'

import Button from '@@/common/Button'
import DataItem from '@@/common/DataItem'
import InfoDialog from '@@/common/Dialog/Info'
import Dialog from '@@/common/Dialog'
import Image from '@@/common/Image'

// import { notify } from '@@/common/Toast'

interface Props {
  stakeSharesValue: number
  loading: boolean
}
const Dashboard: FC<Props> = ({ stakeSharesValue, loading }) => {
  const { userRewardDashboard, harvestAll } = Reward
  const { allTokenPriceInUSD } = AllProtocol
  const { signer, account: address } = useProfile()
  const { createNotify, updateNotifyItem } = useNotify()

  const [status, setStatus] = useState<boolean>(false)
  const [infoStatus, setInfoStatus] = useState<boolean>(false)

  const { data: sourceRewardDashboard, loading: sAllLoading } = useRequest(
    () => userRewardDashboard(address, signer),
    {
      refreshDeps: [signer, status]
    }
  )
  const { data: allPrice = 0, loading: allPriceLoading } = useRequest(allTokenPriceInUSD)

  const rewardDashboard = sourceRewardDashboard || { sALL: 0, claimedReward: 0, pendingReward: 0 }
  const pendingReward = rewardDashboard.pendingReward < 0.0001 ? 0 : rewardDashboard.pendingReward

  const stakedSALL = useMemo(
    () => BN(rewardDashboard.sALL).minus(rewardDashboard.pendingReward).toNumber(),
    [rewardDashboard.sALL, rewardDashboard.pendingReward]
  )
  const addAllTokenToWallet = () => {
    const { symbol, decimals } = tokens.ALLTOKEN
    addToken2Wallet(getALLTOKENAddress(), symbol ?? '', decimals ?? 18, '')
  }
  const allOutput = useMemo(
    () => BN(stakeSharesValue).times(0.2).div(allPrice).div(365).toNumber(),
    [stakeSharesValue, allPrice]
  )
  // console.log('allOutput:', allOutput, 'sALL:', rewardDashboard.sALL)
  const isShowALLOutDialog = useMemo(() => {
    // console.log(allOutput > rewardDashboard.sALL, 'allOutput > rewardDashboard.sALL')
    if (loading || allPriceLoading || sAllLoading) return false
    if (allOutput <= 0.0001) return false
    return allOutput > stakedSALL
  }, [allOutput, stakedSALL, loading, allPriceLoading, sAllLoading])
  // console.log(BN(rewardDashboard.pendingReward).toString(), rewardDashboard.pendingReward)

  const onHarvestAll = async () => {
    if (signer) {
      setStatus(false)
      const notifyId = await createNotify({ type: 'loading', content: 'Claim ALL Token' })
      // 执行购买和质押
      const { status, msg, hash } = await harvestAll(signer)
      if (status) {
        updateNotifyItem(notifyId, { type: 'success', hash })
        setStatus(true)
      } else {
        updateNotifyItem(notifyId, { type: 'error', title: 'Claim ALL Token', content: msg, hash })
        setStatus(false)
      }
    }
  }
  return (
    <>
      <section className="web-mining-dashboard">
        <main>
          <DataItem label="You Staked Value" loading={loading}>
            {formatNumber(stakeSharesValue, 2, '$0,0.00')}
          </DataItem>
          <DataItem label="Your Staked sALL" normalFont loading={sAllLoading}>
            {formatNumber(stakedSALL, 4, '0,0.0000')}
          </DataItem>
          <DataItem label="Daily ALL output" loading={allPriceLoading}>
            {formatNumber(allOutput, 4, '0,0.0000')} <br />
          </DataItem>
          <DataItem label="Claimable ALL" loading={loading}>
            <em>{formatNumber(pendingReward, 4, '0,0.0000')}</em>
            <button className="add-token-button" onClick={addAllTokenToWallet}>
              +
            </button>
          </DataItem>
        </main>
        <Button disabled={pendingReward === 0} onClick={() => setInfoStatus(true)}>
          claim
        </Button>
      </section>
      <InfoDialog
        show={infoStatus}
        onConfirm={onHarvestAll}
        onClose={() => setInfoStatus(false)}
        title="Claim ALL Token"
        msg={`${formatNumber(
          rewardDashboard.pendingReward,
          8,
          '0,0.00000000'
        )} ALL will be claimed`}
      />
      <ALLOutputTipDialog status={isShowALLOutDialog} />
    </>
  )
}

export default Dashboard

const ALLOutputTipDialog: FC<{ status: boolean }> = ({ status }) => {
  const CacheKey = 'ALLOutputTipDialogCloseTime'
  const [show, setShow] = useState<boolean>(false)
  useEffect(() => {
    // console.log(111, status)
    if (status) {
      const lastCloseTime = Cache.get(CacheKey)
      if (lastCloseTime == null || Number(lastCloseTime) + 86400000 < +new Date()) {
        setShow(true)
      }
    }
  }, [status])

  const onClose = () => {
    Cache.set(CacheKey, +new Date())
    setShow(false)
  }
  return (
    <Dialog show={show} onClose={() => setShow(false)}>
      <div className="web-status-fail">
        <Image src="asset/modal-fail.png" />
        <p>
          The current daily ALL output is greater than the amount of sALL you staked, please adjust
          your strategy in advance to avoid lower returns
        </p>
        <Button size="medium" onClick={onClose}>
          Do not show again today
        </Button>
      </div>
    </Dialog>
  )
}
