import { FC, useEffect, useMemo, useState } from 'react'

import BN from 'bignumber.js'

import { useAllTokenPriceInUSD } from '@/hooks/Contracts/useAllProtocol'
import { useHarvestAll, useUserRewardDashboard } from '@/hooks/Contracts/useRewardTracker'
import { useProfile } from '@/hooks/useProfile'
import { useToken } from '@/hooks/useToken'

import { STATIC_RESOURCES_URL } from '@/config'
import Cache from '@/utils/cache'
import { formatNumber } from '@/utils/tools'
import { addTokenToWallet } from '@/utils/wallet'
import Button from '@@/common/Button'
import DataItem from '@@/common/DataItem'
import Dialog from '@@/common/Dialog'
import InfoDialog from '@@/common/Dialog/Info'
import Image from '@@/common/Image'

interface Props {
  stakeSharesValue: number
  loading: boolean
}

const Dashboard: FC<Props> = ({ stakeSharesValue, loading }) => {
  const { getTokenByName } = useToken()
  const { account } = useProfile()
  const { onHarvestAll } = useHarvestAll()
  const { data: rewardDashboard, isLoading: sAllLoading } = useUserRewardDashboard(account)
  const { data: allPrice, isLoading: allPriceLoading } = useAllTokenPriceInUSD()

  const [infoStatus, setInfoStatus] = useState<boolean>(false)

  const pendingReward = useMemo(
    () => (rewardDashboard.pendingReward < 0.0001 ? 0 : rewardDashboard.pendingReward),
    [rewardDashboard.pendingReward]
  )

  const stakedSALL = useMemo(
    () => BN(rewardDashboard.sALL).minus(rewardDashboard.pendingReward).toNumber(),
    [rewardDashboard.sALL, rewardDashboard.pendingReward]
  )

  const allOutput = useMemo(
    () => BN(stakeSharesValue).times(0.2).div(allPrice).div(365).toNumber(),
    [stakeSharesValue, allPrice]
  )

  const isShowALLOutDialog = useMemo(() => {
    if (loading || allPriceLoading || sAllLoading) return false
    if (allOutput <= 0.0001) return false
    return allOutput > stakedSALL
  }, [allOutput, stakedSALL, loading, allPriceLoading, sAllLoading])

  const goHarvestAll = async () => {
    if (account) {
      onHarvestAll(account)
    }
  }

  const addAllTokenToWallet = () => {
    const { address, decimals, symbol, icon } = getTokenByName('ALLTOKEN')
    addTokenToWallet(address, decimals, symbol, STATIC_RESOURCES_URL + icon)
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
        onConfirm={goHarvestAll}
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
        <h4>Your staked sAll is not enough！</h4>
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
