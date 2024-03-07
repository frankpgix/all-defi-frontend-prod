import { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import { pullAt } from 'lodash'

import Button from '@@/common/Button'
import Blank from '@@/common/Blank'

import { PoolItemTypes, PoolStakeTypes, PoolStakeArrayItemTypes } from '@/types/rewardTracker'

import PreView from './PreView'
import { StakeHeader, StakeFundInput } from '@/pages/Mining/c/Stake/C'

const Stake: FC<PoolStakeTypes> = ({ list, getData }) => {
  const [vault, setVault] = useState<PoolItemTypes | null>(null)
  const [vaultArray, setVaultArray] = useState<PoolStakeArrayItemTypes[]>([])
  const [amount, setAmount] = useState('')
  console.log(vault, list)
  const onAddFunc = () => {
    if (!vault) return
    const oldIndex = vaultArray.findIndex((item) => item.shareToken === vault.shareToken)
    if (oldIndex !== -1) {
      const arr = [...vaultArray]
      arr[oldIndex].amount = Math.min(
        arr[oldIndex].stakedShare,
        BN(Number(amount)).plus(arr[oldIndex].amount).toNumber()
      )
      setVaultArray(arr)
    } else {
      const o = { ...vault, amount: Number(amount) }
      setVaultArray([...vaultArray, o])
    }
    setAmount('')
  }

  const onDelFunc = (index: number) => {
    const arr = [...vaultArray]
    pullAt(arr, index)
    setVaultArray(arr)
  }

  const onGetData = async () => {
    await getData()
    // setVault(null)
    setVaultArray([])
  }

  const stakeList = useMemo(() => list?.filter((item) => item.stakedShare !== 0), [list])
  const maxNumber = useMemo(() => {
    const currShare = stakeList.find((item) => item.shareToken === vault?.shareToken)
    return currShare?.stakedShare ?? 0
  }, [vault, stakeList])

  return (
    <div className="web-mining-stake-layout">
      <div className="web-mining-stake unstake">
        <main>
          <StakeHeader title="Select Shares" />
          <StakeFundInput
            list={stakeList}
            onSelect={setVault}
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
      <PreView vaults={vaultArray} onDelete={onDelFunc} getData={onGetData} />
    </div>
  )
}

export default Stake
