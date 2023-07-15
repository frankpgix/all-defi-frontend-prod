import React, { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import { pullAt } from 'lodash'

import Button from '@@/common/Button'
import Blank from '@@/common/Blank'

import { StakeProps, PoolProps, StakeArrayItemProps } from './types'
import PreView from './PreView'
import { StakeHeader, StakeFundInput } from '@/pages/Mining/c/Stake/C'

const Stake: FC<StakeProps> = ({ list, getData }) => {
  const [fund, setFund] = useState<PoolProps | null>(null)
  const [fundArray, setFundArray] = useState<StakeArrayItemProps[]>([])
  const [amount, setAmount] = useState('')
  console.log(fund, list)
  const onAddFunc = () => {
    if (!fund) return
    const oldIndex = fundArray.findIndex((item) => item.shareToken === fund.shareToken)
    if (oldIndex !== -1) {
      const arr = [...fundArray]
      arr[oldIndex].amount = Math.min(
        arr[oldIndex].stakeAmount,
        BN(Number(amount)).plus(arr[oldIndex].amount).toNumber()
      )
      setFundArray(arr)
    } else {
      const o = { ...fund, amount: Number(amount) }
      setFundArray([...fundArray, o])
    }
    setAmount('')
  }

  const onDelFunc = (index: number) => {
    const arr = [...fundArray]
    pullAt(arr, index)
    setFundArray(arr)
  }

  const onGetData = async () => {
    await getData()
    // setFund(null)
    setFundArray([])
  }

  const stakeList = useMemo(() => list?.filter((item) => item.stakeAmount !== 0), [list])
  const maxNumber = useMemo(() => {
    const currShare = stakeList.find((item) => item.shareToken === fund?.shareToken)
    return currShare?.stakeAmount ?? 0
  }, [fund, stakeList])

  return (
    <div className="web-mining-stake-layout">
      <div className="web-mining-stake unstake">
        <main>
          <StakeHeader title="Select Shares" />
          <StakeFundInput
            list={stakeList}
            onSelect={setFund}
            value={amount}
            onChange={setAmount}
            maxNumber={maxNumber}
            unStake
          />
          <Blank height={86} />
          <footer className="web-mining-stake-footer">
            <Button onClick={onAddFunc} disabled={!amount}>
              Add
            </Button>
          </footer>
        </main>
      </div>
      <PreView funds={fundArray} onDelete={onDelFunc} getData={onGetData} />
    </div>
  )
}

export default Stake
