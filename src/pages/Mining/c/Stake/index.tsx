import { FC, useState, useMemo } from 'react'
import BN from 'bignumber.js'
import { pullAt } from 'lodash'
// import { useTokensData } from '@/store/tokens/hooks'
import { useUserBalances } from '@/hooks/useProfile'
import { PoolItemTypes, PoolStakeTypes, PoolStakeArrayItemTypes } from '@/types/rewardTracker'

import Button from '@@/common/Button'
// import Tip from '@@/common/Tip'

import PreView from './PreView'
import { StakeHeader, StakeFundInput, StakeSAllInput } from './C'

const Stake: FC<PoolStakeTypes> = ({ list, getData }) => {
  const { balances } = useUserBalances()

  const [vault, setVault] = useState<PoolItemTypes | null>(null)
  const [vaultArray, setVaultArray] = useState<PoolStakeArrayItemTypes[]>([])
  const [amount, setAmount] = useState('')
  const [sAllAmount, setSAllAmount] = useState('')
  const [sAllPreAmount, setSAllPreAmountAmount] = useState(0)
  const maxSAll = useMemo(() => Number(balances.sALLTOKEN), [balances.sALLTOKEN])

  const onAddSallFunc = () => {
    if (!sAllAmount) return
    setSAllPreAmountAmount(Math.min(BN(sAllAmount).plus(sAllPreAmount).toNumber(), maxSAll))
    setSAllAmount('')
  }

  const onAddShareFunc = () => {
    if (!vault) return
    const oldIndex = vaultArray.findIndex((item) => item.shareToken === vault.shareToken)
    if (oldIndex !== -1) {
      const arr = [...vaultArray]
      arr[oldIndex].amount = Math.min(
        arr[oldIndex].shareBalance,
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
    if (index === -1) {
      setSAllAmount('')
      setSAllPreAmountAmount(0)
    } else {
      const arr = [...vaultArray]
      pullAt(arr, index)
      setVaultArray(arr)
    }
  }

  const onGetData = async () => {
    await getData()
    setVaultArray([])
    // setVault(null)
    setSAllPreAmountAmount(0)
  }

  const maxNumber = useMemo(() => {
    const currShare = list.find((item) => item.shareToken === vault?.shareToken)
    return currShare?.shareBalance ?? 0
  }, [vault, list])

  return (
    <div className="web-mining-stake-layout">
      <div className="web-mining-stake">
        <main>
          <StakeHeader title="Select Shares" />
          <StakeFundInput
            list={list}
            onSelect={setVault}
            value={amount}
            onChange={setAmount}
            maxNumber={maxNumber}
          />
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

      <PreView
        vaults={vaultArray}
        onDelete={onDelFunc}
        sAllAmount={sAllPreAmount}
        getData={onGetData}
      />
    </div>
  )
}

export default Stake
