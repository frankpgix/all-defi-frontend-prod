import { FC } from 'react'
import Button from '@@/common/Button'

import { useProfile } from '@/hooks/useProfile'
import { useStake } from '@/hooks/useRewardTracker'

import { PoolStakeArrayItemTypes } from '@/types/rewardTracker'
import PreStake from './PreStake'

interface Props {
  vaults: PoolStakeArrayItemTypes[]
  onDelete: (index: number) => void
  sAllAmount: number
  getData: () => void
}
const PreView: FC<Props> = ({ vaults, onDelete, sAllAmount, getData }) => {
  const { onStake } = useStake()
  const { account } = useProfile()

  const goStake = async () => {
    if (account) {
      await onStake(
        vaults.map((item) => item.shareToken),
        vaults.map((item) => item.amount),
        sAllAmount,
        account,
        getData
      )
    }
  }

  return (
    <>
      <div className="web-mining-preview">
        <header>Preview</header>
        <PreStake vaults={vaults} onDelete={onDelete} sAllAmount={sAllAmount} />

        <footer>
          <Button disabled={vaults.length === 0 && sAllAmount === 0} onClick={goStake}>
            Confirm
          </Button>
        </footer>
      </div>
    </>
  )
}

export default PreView
