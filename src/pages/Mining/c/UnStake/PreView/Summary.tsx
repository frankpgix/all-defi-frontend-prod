import React, { FC, useMemo } from 'react'
import { useRequest } from 'ahooks'
import classNames from 'classnames'
import BN from 'bignumber.js'

import Reward from '@/class/Reward'
import { sum, formatNumber } from '@/utils/tools'
import { useProfile } from '@/hooks/useProfile'

import { StakeArrayItemProps } from '../types'

interface Props {
  show: boolean
  funds: StakeArrayItemProps[]
  stakeSharesValue: number
}

const Summary: FC<Props> = ({ show, funds, stakeSharesValue }) => {
  const { userSALLAmount } = Reward
  const { signer, account: address } = useProfile()
  const { data: oldSALLAmount = 0 } = useRequest(() => userSALLAmount(address ?? '', signer), {
    refreshDeps: [address, signer]
  })
  // stakeSharesValue
  const sumValues = useMemo(() => {
    const sumVal = sum(funds.map((data) => BN(data.amount).times(data.aumPerShare).toNumber()))
    return BN(stakeSharesValue).minus(sumVal).toNumber()
  }, [funds, stakeSharesValue])

  return (
    <div className={classNames('web-mining-preview-summary', 'unstake', { show })}>
      <dl>
        <dt>Total Value of Consumption Shares:</dt>
        <dd>
          <span>{formatNumber(stakeSharesValue, 2, '$0,0.00')}</span>
          <i />
          <span>{formatNumber(sumValues, 2, '$0,0.00')}</span>
        </dd>
      </dl>
      <dl>
        <dt>Amount of staked sALL:</dt>
        <dd>
          <span>{formatNumber(oldSALLAmount, 2, '0,0.00')}</span>
          <i />
          <span>{formatNumber(oldSALLAmount, 2, '0,0.00')}</span>
        </dd>
      </dl>
    </div>
  )
}

export default Summary
