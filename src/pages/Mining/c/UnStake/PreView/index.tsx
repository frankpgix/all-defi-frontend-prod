import { FC } from 'react'
import Button from '@@/common/Button'

import { useProfile } from '@/hooks/useProfile'
import { useUnStake } from '@/hooks/Contracts/useRewardTracker'

import { PoolStakeArrayItemTypes } from '@/types/rewardTracker'

import PreStake from './PreStake'

interface Props {
  vaults: PoolStakeArrayItemTypes[]
  onDelete: (index: number) => void
  // stakeSharesValue: number
  getData: () => void
}
const PreView: FC<Props> = ({ vaults, onDelete, getData }) => {
  const { onUnStake } = useUnStake()
  // const { unstake } = Reward
  const { account } = useProfile()
  // const { createNotify, updateNotifyItem } = useNotify()

  const goStake = async () => {
    if (account) {
      onUnStake(
        vaults.map((item) => item.shareToken),
        vaults.map((item) => item.amount),
        account,
        getData
      )
    }
  }

  return (
    <>
      <div className="web-mining-preview">
        <header>Preview</header>
        <PreStake vaults={vaults} onDelete={onDelete} />
        <footer>
          <Button disabled={vaults.length === 0} onClick={goStake}>
            Confirm
          </Button>
        </footer>
      </div>
    </>
  )
}

export default PreView
