import React, { FC } from 'react'
import Reward from '@/class/Reward'
import Button from '@@/common/Button'

// import { notify } from '@@/common/Toast'
import { useProfile } from '@/hooks/useProfile'
import { useNotify } from '@/hooks/useNotify'

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
  const { createNotify, updateNotifyItem } = useNotify()

  const goStake = async () => {
    if (signer) {
      const notifyId = await createNotify({ type: 'loading', content: 'Unstake Shares' })
      // 执行购买和质押
      const { status, msg, hash } = await unstake(
        funds.map((item) => item.shareToken),
        funds.map((item) => item.amount),
        signer
      )

      if (status) {
        await getData()
        updateNotifyItem(notifyId, { type: 'success', hash })
      } else {
        updateNotifyItem(notifyId, { type: 'error', title: 'Unstake Shares', content: msg, hash })
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
