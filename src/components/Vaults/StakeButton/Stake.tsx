import { FC, useMemo, useState } from 'react'

import { useBoolean } from 'ahooks'
import BN from 'bignumber.js'
import { isNaN } from 'lodash'

import { useStake } from '@/hooks/Contracts/useVault'
import { useProfile } from '@/hooks/useProfile'
import { useUnderlyingTokens, useUserBalances } from '@/hooks/useToken'

import { VaultBaseInfoProps, VaultDetailProps } from '@/types/vault'

// import { formatNumber } from '@/utils/tools'
import Button from '@@/common/Button'
import InfoDialog from '@@/common/Dialog/Info'
import { Input, Slider } from '@@/common/Form'
import CheckBox from '@@/common/Form/CheckBox'
import Tip from '@@/common/Tip'
import { AcUSDCUnit } from '@@/common/TokenUnit'
import { DropdownSelect, DropdownSelectItemProps } from '@@/core/Dropdown'

interface Props {
  getData: () => void
  onClose: () => void
  data: VaultDetailProps
  base: VaultBaseInfoProps
}

const Stake: FC<Props> = ({ getData, data, base, onClose }) => {
  // const { getTokenByName } = useToken()
  const { account } = useProfile()
  const { balances, refetch: reBalances } = useUserBalances()
  const { onStake } = useStake(data.address)
  const [accredit, { toggle }] = useBoolean(false)
  const [submiting, { toggle: toggleSubmiting }] = useBoolean(false)
  const [infoStatus, setInfoStatus] = useState<boolean>(false)
  const underlyingTokens = useUnderlyingTokens()
  const underlyingTokenOptions = useMemo(() => {
    return underlyingTokens.map(({ name, address, icon }) => ({
      label: name,
      value: address,
      icon
    }))
  }, [underlyingTokens])
  // console.log(underlyingTokenOptions)
  const [currentToken, setCurrentToken] = useState<DropdownSelectItemProps>(
    underlyingTokenOptions[0]
  )
  const acToken = useMemo(() => data.underlyingToken, [data.underlyingToken])

  const acTokenBalance = useMemo(() => balances[acToken.name], [balances, acToken.name])
  const [value, setValue] = useState<number | string>('')
  const [inputValue, setInputValue] = useState<number | string>('')
  const [sliderValue, setSliderValue] = useState(0)

  // const maxAum = useMemo(
  //   () =>
  //     Number(
  //       formatNumber(
  //         Math.max(BN(data.aum).minus(data.beginningAUM).minus(data.stakingACToken).toNumber(), 0),
  //         4,
  //         '0.0000'
  //       )
  //     ),
  //   [data.aum, data.beginningAUM, data.stakingACToken]
  // )
  // const maxBalance = useMemo(() => BN(acTokenBalance).toNumber(), [acTokenBalance])
  const maxValue = useMemo(() => Math.min(acTokenBalance), [acTokenBalance])
  // console.log(maxValue, maxAum, acTokenBalance)
  // const maxValue = useMemo(() => 10000, [maxAum, maxBalance])

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
      await onStake(acToken, Number(value), account, (isError) => {
        reBalances()
        getData()
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
    () => inputValue !== '' && Number(inputValue) < base.minimumStake,
    [inputValue]
  )
  const maxAmountError = useMemo(
    () => inputValue !== '' && Number(inputValue) > maxValue,
    [inputValue]
  )
  return (
    <>
      <section className="c-vault-stake">
        {/* <div className="c-vault-stake-tip">
          <p>
            The Denomination Assets of this vault is {acToken.name}. Please enter the amount you
            wish to stake in the input box below.
          </p>
        </div> */}
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
              />
            }
            right
            placeholder="0"
            type="number"
            error={(value !== '' && Number(value) === 0) || minAmountError || maxAmountError}
            // disabled={!isInSubscribe}
          >
            {minAmountError && (
              <p className="fall">
                Minimum stake amount {base.minimumStake} {acToken.name}
              </p>
            )}
            {/* {maxAmountError && (
              <p className="fall">
                Maxmum stake amount {maxValue} {acToken.name}
              </p>
            )} */}
            <p>
              {acToken.name} Balance: {acTokenBalance}
            </p>
            {/* <p>Capacity Available: {maxAum}</p> */}
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
