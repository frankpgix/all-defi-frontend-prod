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
  // stakeSharesValue: number
  getData: () => void
}
const PreView: FC<Props> = ({ funds, onDelete, getData }) => {
  const { unstake } = Reward
  const { signer } = useProfile()

  const goStake = async () => {
    if (signer) {
      const notifyId = notify.loading()
      // 执行购买和质押
      const { status, msg } = await unstake(
        funds.map((item) => item.shareToken),
        funds.map((item) => item.amount),
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
        <PreStake funds={funds} onDelete={onDelete} />
        <footer>
          <Button disabled={funds.length === 0} onClick={goStake}>
            Confirm
          </Button>
        </footer>
      </div>
    </>
  )
}

export default PreView
