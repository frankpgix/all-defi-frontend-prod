import React, { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import { pullAt } from 'lodash'
import { useTokensData } from '@/store/tokens/hooks'

import Button from '@@/common/Button'
// import Tip from '@@/common/Tip'

import { StakeProps, PoolProps, StakeArrayItemProps } from './types'
import PreView from './PreView'
import { StakeHeader, StakeFundInput, StakeSAllInput } from './C'

const Stake: FC<StakeProps> = ({ list, getData }) => {
  const { balance } = useTokensData()

  const [fund, setFund] = useState<PoolProps | null>(null)
  const [fundArray, setFundArray] = useState<StakeArrayItemProps[]>([])
  const [amount, setAmount] = useState('')
  const [sAllAmount, setSAllAmount] = useState('')
  const [sAllPreAmount, setSAllPreAmountAmount] = useState(0)
  const maxSAll = useMemo(() => Number(balance.sALL), [balance.sALL])

  const onAddSallFunc = () => {
    if (!sAllAmount) return
    setSAllPreAmountAmount(Math.min(BN(sAllAmount).plus(sAllPreAmount).toNumber(), maxSAll))
    setSAllAmount('')
  }

  const onAddShareFunc = () => {
    if (!fund) return
    const oldIndex = fundArray.findIndex((item) => item.shareToken === fund.shareToken)
    if (oldIndex !== -1) {
      const arr = [...fundArray]
      arr[oldIndex].amount = Math.min(
        arr[oldIndex].shareBalance,
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
    if (index === -1) {
      setSAllAmount('')
      setSAllPreAmountAmount(0)
    } else {
      const arr = [...fundArray]
      pullAt(arr, index)
      setFundArray(arr)
    }
  }

  const onGetData = async () => {
    await getData()
    setFundArray([])
    // setFund(null)
    setSAllPreAmountAmount(0)
  }

  const maxNumber = useMemo(() => {
    const currShare = list.find((item) => item.shareToken === fund?.shareToken)
    return currShare?.shareBalance ?? 0
  }, [fund, list])

  return (
    <div className="web-mining-stake-layout">
      <div className="web-mining-stake">
        <main>
          <StakeHeader title="Select Shares" />
          <StakeFundInput list={list} onSelect={setFund} value={amount} onChange={setAmount} maxNumber={maxNumber} />
          <footer className="web-mining-stake-footer">
            <Button onClick={onAddShareFunc} disabled={!amount}>
              Add
            </Button>
          </footer>
        </main>
        <main>
          <StakeHeader title="Stake sALL" />
          <StakeSAllInput value={sAllAmount} onChange={setSAllAmount} maxNumber={maxSAll} />
          <footer className="web-mining-stake-footer">
            <Button onClick={onAddSallFunc} disabled={!sAllAmount}>
              Add
            </Button>
          </footer>
        </main>
      </div>

      <PreView funds={fundArray} onDelete={onDelFunc} sAllAmount={sAllPreAmount} getData={onGetData} />
    </div>
  )
}

export default Stake
