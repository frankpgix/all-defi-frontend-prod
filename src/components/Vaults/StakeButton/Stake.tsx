import { FC, useMemo, useState } from 'react'

import { useBoolean } from 'ahooks'
import BN from 'bignumber.js'
import { isNaN } from 'lodash'

import { useStake } from '@/hooks/Contracts/useVault'
import { useProfile } from '@/hooks/useProfile'
import { useUserBalances } from '@/hooks/useToken'

import { VaultDetailProps } from '@/types/vault'

// import { formatNumber } from '@/utils/tools'
import Button from '@@/common/Button'
import InfoDialog from '@@/common/Dialog/Info'
import { Input, Slider } from '@@/common/Form'
import CheckBox from '@@/common/Form/CheckBox'
import Tip from '@@/common/Tip'
import { DropdownSelect, DropdownSelectItemProps } from '@@/core/Dropdown'

interface Props {
  onClose: () => void
  data: VaultDetailProps[]
}

const Stake: FC<Props> = ({ data: list }) => {
  // const { getTokenByName } = useToken()
  const { account } = useProfile()
  const underlyingTokenOptions = useMemo(() => {
    return list.map(({ underlyingToken: { name, address, icon } }) => ({
      label: name,
      value: address,
      icon
    }))
  }, [list])

  const [currentToken, setCurrentToken] = useState<DropdownSelectItemProps>(
    underlyingTokenOptions[0]
  )
  const data = useMemo(
    () => list.find((item) => item.underlyingToken.address === currentToken.value) ?? list[0],
    [list, currentToken.value]
  )
  const TokenPrecision = useMemo(() => data.underlyingToken.precision, [data.underlyingToken])
  const { balances, refetch: reBalances } = useUserBalances()
  const { onStake } = useStake(data.address)
  const [accredit, { toggle }] = useBoolean(false)
  const [submiting, { toggle: toggleSubmiting }] = useBoolean(false)
  const [infoStatus, setInfoStatus] = useState<boolean>(false)

  const acToken = useMemo(() => data.underlyingToken, [data.underlyingToken])

  const acTokenBalance = useMemo(() => balances[acToken.name], [balances, acToken.name])
  const [value, setValue] = useState<number | string>('')
  const [inputValue, setInputValue] = useState<number | string>('')
  const [sliderValue, setSliderValue] = useState(0)

  const maxValue = useMemo(() => Math.min(acTokenBalance), [acTokenBalance])
  const minimumStake = useMemo(() => BN(10).pow(-TokenPrecision).toNumber(), [TokenPrecision])
  // const minimumStake = 0.02
  console.log(minimumStake, 'data')
  const isInAllocate = useMemo(() => [0, 1].includes(data.status), [data.status])

  const onSliderChange = (val: number) => {
    // console.log()
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
    setInputValue(val || '')
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

  const goAllocate = async () => {
    if (account) {
      toggleSubmiting()
      await onStake(data.underlyingToken, Number(value), account, (isError) => {
        reBalances()
        setValue('')
        setSliderValue(0)
        toggleSubmiting()
        if (!isError) {
          setInfoStatus(true)
        }
        // onClose()
      })
    }
  }

  const minAmountError = useMemo(
    () => inputValue !== '' && Number(inputValue) < minimumStake,
    [inputValue]
  )
  const maxAmountError = useMemo(
    () => inputValue !== '' && Number(inputValue) > maxValue,
    [inputValue]
  )
  return (
    <>
      <section className="c-vault-stake">
        <div className="c-vault-stake-input">
          <Input
            value={value}
            onChange={(val) => onInputChange(val)}
            maxNumber={maxValue}
            suffix={
              <DropdownSelect
                value={currentToken}
                onChange={setCurrentToken}
                options={underlyingTokenOptions}
                disabled={list.length <= 1}
              />
            }
            right
            placeholder="0"
            type="number"
            error={(value !== '' && Number(value) === 0) || minAmountError || maxAmountError}
          >
            {minAmountError && (
              <p className="fall">
                Minimum stake amount {minimumStake} {acToken.name}
              </p>
            )}

            <p>
              {acToken.name} Balance: {acTokenBalance}
            </p>
          </Input>
        </div>
        <div className="c-vault-stake-slider">
          <Slider value={sliderValue} onChange={(val) => onSliderChange(val)} />
        </div>
        <div className="c-vault-stake-tip">
          <p>
            Please be aware before staking that each vault has a corresponding lock-up period
            (usually 30 days). You can cancel your stake application at any time before the vault is
            settled in this epoch.
          </p>
          <CheckBox value={accredit} onChange={toggle} />
        </div>
        <div className="c-vault-stake-action">
          <footer>
            <Button
              onClick={goAllocate}
              disabled={Number(value) <= 0 || !accredit || submiting || data.status > 1}
            >
              confirm
            </Button>
            {!isInAllocate && <Tip>Unauthorized operation</Tip>}
          </footer>
        </div>
      </section>
      <InfoDialog
        show={infoStatus}
        onConfirm={() => setInfoStatus(false)}
        onClose={() => setInfoStatus(false)}
        title="Stake Successful"
        msg="Staking will take effect after this epoch of settlement."
        type="succ"
        hideCancelButton
      />
    </>
  )
}

export default Stake
