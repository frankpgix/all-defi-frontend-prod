import React, { FC } from 'react'
import classNames from 'classnames'

import FundIcon from '@@/common/FundIcon'
import NoData from '@@/common/NoData'

import { StakeArrayItemProps } from '../types'

interface Props {
  funds: StakeArrayItemProps[]
  onDelete: (index: number) => void
}

const PreStake: FC<Props> = ({ funds, onDelete }) => {
  return (
    <>
      <div className={classNames('web-mining-preview-stake unstake')}>
        <section>
          <NoData show={funds.length === 0} mini tip="No Data Currently Available" />
          {funds.map((item, index) => (
            <div className="web-mining-preview-stake-fund" key={index}>
              <FundIcon name={item.symbol} size="mini" />
              <strong>{item.symbol}</strong>
              <em>{item.amount}</em>
              <u>Shares</u>
              <del onClick={() => onDelete(index)} />
            </div>
          ))}
        </section>
      </div>
    </>
  )
}

export default PreStake
