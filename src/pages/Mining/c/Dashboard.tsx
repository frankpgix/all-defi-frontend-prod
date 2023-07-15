import React, { FC, useState } from 'react'
import { useRequest } from 'ahooks'

import tokens from '@/config/tokens'
import Reward from '@/class/Reward'
import { useProfile } from '@/hooks/useProfile'

import { formatNumber } from '@/utils/tools'
import { addToken2Wallet } from '@/utils/practicalMethod'
import { getALLTOKENAddress } from '@/utils/addressHelpers'

import Button from '@@/common/Button'
import DataItem from '@@/common/DataItem'
import InfoDialog from '@@/common/Dialog/Info'

import { notify } from '@@/common/Toast'

interface Props {
  stakeSharesValue: number
}
const Dashboard: FC<Props> = ({ stakeSharesValue }) => {
  const { userRewardDashboard, harvestAll } = Reward
  const { signer, account: address } = useProfile()

  const [status, setStatus] = useState<boolean>(false)
  const [infoStatus, setInfoStatus] = useState<boolean>(false)

  const { data: sourceRewardDashboard } = useRequest(() => userRewardDashboard(address, signer), {
    refreshDeps: [signer, status]
  })

  const rewardDashboard = sourceRewardDashboard || { sALL: 0, claimedReward: 0, pendingReward: 0 }
  const pendingReward = rewardDashboard.pendingReward < 0.0001 ? 0 : rewardDashboard.pendingReward
  const addAllTokenToWallet = () => {
    const { symbol, decimals } = tokens.ALLTOKEN
    addToken2Wallet(getALLTOKENAddress(), symbol ?? '', decimals ?? 18, '')
  }

  // console.log(BN(rewardDashboard.pendingReward).toString(), rewardDashboard.pendingReward)

  const onHarvestAll = async () => {
    if (signer) {
      setStatus(false)
      const notifyId = notify.loading()
      // 执行购买和质押
      const { status, msg } = await harvestAll(signer)
      if (status) {
        notify.update(notifyId, 'success')
        setStatus(true)
      } else {
        notify.update(notifyId, 'error', msg)
        setStatus(false)
      }
    }
  }
  return (
    <>
      <section className="web-mining-dashboard">
        <main>
          <DataItem label="You Staked Value">{formatNumber(stakeSharesValue, 2, '$0,0.00')}</DataItem>
          <DataItem label="You Staked sALL" normalFont>
            {formatNumber(rewardDashboard.sALL, 2, '0,0.00')}
          </DataItem>
          <DataItem label="Claimable ALL Profit">
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
        msg={`${formatNumber(rewardDashboard.pendingReward, 8, '0,0.00000000')} ALL will be claimed`}
      />
    </>
  )
}

export default Dashboard
