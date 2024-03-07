import { FC } from 'react'

import Input from '@@/common/Form/Input'
import Image from '@@/common/Image'
import Popper from '@@/common/Popper'

import { PoolVaultSelectTypes } from '@/types/rewardTracker'

import VaultSelect from './VaultSelect'

export const StakeHeader: FC<{ title: string }> = ({ title }) => {
  return (
    <header>
      <h3>{title}</h3>
    </header>
  )
}

export default StakeHeader

interface StakeSAllInputProps {
  value: string | number
  onChange?: (value: any) => void
  maxNumber: number
}

export const StakeSAllInput: FC<StakeSAllInputProps> = ({ value, onChange, maxNumber }) => {
  return (
    <div className="web-mining-stake-sall">
      <h4>
        <Image src="icon/sall-token.png" />
        <strong>
          <Popper content="sALL token can not be unstaked after staking">sALL</Popper>
        </strong>
      </h4>
      <Input
        value={value}
        onChange={onChange}
        maxNumber={maxNumber}
        type="number"
        right
        placeholder="0 sALL"
        suffix="sALL"
      >
        <p>sALL Balance: {maxNumber}</p>
      </Input>
    </div>
  )
}

export const StakeSAllPre: FC<{ value: number; onDelete: () => void }> = ({ value, onDelete }) => {
  return (
    <div className="web-mining-preview-stake-sall">
      <Image src="icon/sall-token.png" />
      <strong>sALL</strong>
      <em>{value}</em>
      <u>sALL</u>
      <del onClick={onDelete} />
    </div>
  )
}

interface StakeFundInputProps extends PoolVaultSelectTypes, StakeSAllInputProps {
  unStake?: boolean
}

export const StakeFundInput: FC<StakeFundInputProps> = ({
  list,
  onSelect,
  value,
  onChange,
  maxNumber,
  unStake
}) => {
  return (
    <div className="web-mining-stake-fund">
      <VaultSelect list={list} onSelect={onSelect} unStake={unStake} />
      <Input
        value={value}
        onChange={onChange}
        type="number"
        maxNumber={maxNumber}
        right
        placeholder="0 Shares"
        suffix="Shares"
      >
        <p>
          {unStake ? 'Staked Shares' : 'Shares Balance'}: {maxNumber}
        </p>
      </Input>
    </div>
  )
}