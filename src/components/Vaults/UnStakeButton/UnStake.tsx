import { FC, useMemo, useState } from 'react'

import { useBoolean } from 'ahooks'
import BN from 'bignumber.js'
import { floor, isNaN } from 'lodash'

import { useUnstake } from '@/hooks/Contracts/useVault'
import { useProfile } from '@/hooks/useProfile'

import { VaultDetailProps, VaultUserDetailProps } from '@/types/vault'

import { DropdownSelect, DropdownSelectItemProps } from '@/components/core/Dropdown'
import Button from '@@/common/Button'
import InfoDialog from '@@/common/Dialog/Info'
import { Input, Slider } from '@@/common/Form'
import Tip from '@@/common/Tip'

interface Props {
  userData: VaultUserDetailProps
  data: VaultDetailProps
  onClose: () => void
  getData: () => void
  currentToken: DropdownSelectItemProps
  setCurrentToken: (val: DropdownSelectItemProps) => void
  underlyingTokenOptions: DropdownSelectItemProps[]
}

const Unstake: FC<Props> = ({
  data,
  userData,
  getData,
  currentToken,
  setCurrentToken,
  underlyingTokenOptions
}) => {
  const { account } = useProfile()
  const { onUnstake } = useUnstake(data.address)

  const [submiting, { toggle: toggleSubmiting }] = useBoolean(false)
  const [value, setValue] = useState<number | string>('')
  const [sliderValue, setSliderValue] = useState(0)
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  // const underlyingToken = useMemo(() => data.underlyingToken, [data.underlyingToken])
  // console.log(data)
  const isInUnstake = useMemo(() => data.status === 0, [data.status])
  const maxValue = useMemo(() => {
    // to do 保留4位向下取整
    return floor(BN(userData.shares).minus(userData.unstakingShare).toNumber(), 4)
  }, [userData.shares, userData.unstakingShare])

  const onSliderChange = (val: number) => {
    if (maxValue > 0) {
      const currValue = BN(maxValue).div(100).multipliedBy(val).toNumber()
      setValue(currValue)
      setSliderValue(val)
    }
    if (val === 0) {
      setValue('')
    }
  }

  const onInputChange = (val: number | string) => {
    val = Number(val)
    if (isNaN(val)) val = 0
    // if (val > maxValue) val = maxValue
    if (val < 0) val = 0
    if (maxValue > 0) {
      const currSliderValue = BN(Number(val))
        .div(maxValue)
        .multipliedBy(100)
        .integerValue()
        .toNumber()
      setValue(Number(val) || '')
      setSliderValue(currSliderValue)
    }
  }

  const goUnstake = async () => {
    if (account) {
      toggleSubmiting()
      await onUnstake(data.underlyingToken, Number(value), account, (isError) => {
        getData()
        setValue('')
        setSliderValue(0)
        // onClose()
        toggleSubmiting()
        if (!isError) {
          setInfoStatus(true)
        }
      })
    }
  }

  return (
    <>
      {/* <div className="c-vault-stake-tip">
        <p>
          Please enter the quantity of Shares you wish to unstake as {underlyingToken.name} in the
          input box below. Please note that the final amount of {underlyingToken.name} you receive
          depends on the Share price at the time of settlement.
        </p>
      </div> */}
      {data.address}
      <div className="c-vault-stake-input">
        <DropdownSelect
          value={currentToken}
          onChange={setCurrentToken}
          options={underlyingTokenOptions}
        />
        <Input
          value={value}
          onChange={(val) => onInputChange(val)}
          maxNumber={maxValue}
          suffix="Shares"
          right
          placeholder="0"
          type="number"
          error={value !== '' && Number(value) === 0}
          // disabled={!isInRedeem}
        >
          {value !== '' && Number(value) < 0.0001 && (
            <p className="fall">Minimum unstake amount 0.0001 Shares</p>
          )}
          <p>Available Shares: {maxValue}</p>
          {/* <p>Shares in wallet: {share.balance}</p>
            <p>Shares in fund: {share.reserve}</p>
            <p>Shares in redeeming: {userData.redeemingShares}</p> */}
        </Input>
      </div>
      <div className="c-vault-stake-slider">
        <Slider value={sliderValue} onChange={(val) => onSliderChange(val)} />
      </div>
      <div className="c-vault-stake-action">
        <footer>
          <Button
            onClick={goUnstake}
            disabled={Number(value) <= 0 || !isInUnstake || submiting || data.status > 0}
          >
            confirm
          </Button>
          {!isInUnstake && <Tip>Unauthorized operation</Tip>}
        </footer>
      </div>
      <hr />
      <InfoDialog
        show={infoStatus}
        onConfirm={() => setInfoStatus(false)}
        onClose={() => setInfoStatus(false)}
        title="Unstake Successful"
        msg="Unstaking will take effect after this epoch of settlement."
        type="succ"
        hideCancelButton
      />
    </>
  )
}

export default Unstake
