import React, { FC } from 'react'
import Reward from '@/class/Reward'
import Button from '@@/common/Button'

import { notify } from '@@/common/Toast'
import { useProfile } from '@/hooks/useProfile'

import { StakeArrayItemProps } from '../types'

import PreStake from './PreStake'

interface Props {
  funds: StakeArrayItemProps[]
  onDelete: (index: number) => void
  sAllAmount: number
  // stakeSharesValue: number
  getData: () => void
}
const PreView: FC<Props> = ({ funds, onDelete, sAllAmount, getData }) => {
  const { stake } = Reward
  const { signer } = useProfile()

  const goStake = async () => {
    if (signer) {
      const notifyId = notify.loading()
      // 执行购买和质押
      const { status, msg } = await stake(
        funds.map((item) => item.shareToken),
        funds.map((item) => item.amount),
        sAllAmount,
        signer
      )
      if (status) {
        await getData()
        notify.update(notifyId, 'success')
      } else {
        notify.update(notifyId, 'error', msg)
      }
    }
  }

  return (
    <>
      <div className="web-mining-preview">
        <header>Preview</header>
        <PreStake funds={funds} onDelete={onDelete} sAllAmount={sAllAmount} />

        <footer>
          <Button disabled={funds.length === 0 && sAllAmount === 0} onClick={goStake}>
            Confirm
          </Button>
        </footer>
      </div>
    </>
  )
}

export default PreView
