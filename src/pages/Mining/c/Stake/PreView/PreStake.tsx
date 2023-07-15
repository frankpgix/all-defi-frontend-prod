import React, { FC } from 'react'
import classNames from 'classnames'

import FundIcon from '@@/common/FundIcon'
import NoData from '@@/common/NoData'

import { StakeArrayItemProps } from '../types'

import { StakeSAllPre } from '../C'
interface Props {
  funds: StakeArrayItemProps[]
  onDelete: (index: number) => void
  sAllAmount: number
}

const PreStake: FC<Props> = ({ funds, onDelete, sAllAmount }) => {
  return (
    <>
      <div className={classNames('web-mining-preview-stake')}>
        <section>
          <NoData show={funds.length === 0 && sAllAmount === 0} mini tip="No Data Currently Available" />
          {funds.map((item, index) => (
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
