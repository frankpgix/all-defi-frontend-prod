import { FC } from 'react'
import classNames from 'classnames'

import FundIcon from '@@/common/FundIcon'
import NoData from '@@/common/NoData'

import { PoolStakeArrayItemTypes } from '@/types/rewardTracker'

import { StakeSAllPre } from '../C'

interface Props {
  vaults: PoolStakeArrayItemTypes[]
  onDelete: (index: number) => void
  sAllAmount: number
}

const PreStake: FC<Props> = ({ vaults, onDelete, sAllAmount }) => {
  return (
    <>
      <div className={classNames('web-mining-preview-stake')}>
        <section>
          <NoData
            show={vaults.length === 0 && sAllAmount === 0}
            mini
            tip="No Data Currently Available"
          />
          {vaults.map((item, index) => (
            <div className="web-mining-preview-stake-fund" key={index}>
              <FundIcon name={item.symbol} size="mini" />
              <strong>{item.symbol}</strong>
              <em>{item.amount}</em>
              <u>Shares</u>
              <del onClick={() => onDelete(index)} />
            </div>
          ))}
          {sAllAmount !== 0 && <StakeSAllPre value={sAllAmount} onDelete={() => onDelete(-1)} />}
        </section>
      </div>
    </>
  )
}

export default PreStake
